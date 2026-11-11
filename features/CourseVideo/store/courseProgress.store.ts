import { useSyncExternalStore } from "react";

/**
 * Course video watch progress, saved in the browser's localStorage.
 *
 * One localStorage entry PER PART, and inside it one record PER LESSON,
 * stored under the lesson's content id:
 *
 *   key    "ebp-course-progress:<userId>:<partId>"
 *   value  {
 *            v: 1,
 *            lastContentId: "<contentId>",
 *            contents: {
 *              "<contentId>": { position, duration, completed, updatedAt },
 *              ...
 *            }
 *          }
 *
 * - Parts never share an entry and lessons never share a record, so progress
 *   can't get mixed up between parts or lessons (or between two accounts on
 *   the same device).
 * - Every save re-reads the entry first and changes only the one lesson, so two
 *   open tabs don't overwrite each other's progress.
 * - Changes made in another tab are picked up through the `storage` event.
 */

export interface IContentProgress {
  /** Where the student stopped, in seconds (0 once the lesson was finished). */
  position: number;
  /** Lesson length in seconds (0 if not known yet). */
  duration: number;
  completed: boolean;
  /** When this lesson was last saved (ms since epoch). */
  updatedAt: number;
}

export interface IPartProgress {
  /** The lesson the student opened last in this part. */
  lastContentId: string | null;
  /** Progress of each lesson, by content id. */
  contents: Record<string, IContentProgress>;
}

export type IContentProgressPatch = Partial<
  Pick<IContentProgress, "position" | "duration" | "completed">
>;

const STORAGE_PREFIX = "ebp-course-progress";
const STORAGE_VERSION = 1;

const EMPTY_PART: IPartProgress = Object.freeze({
  lastContentId: null,
  contents: Object.freeze({}),
});

const storageKey = (userId: string, partId: string) =>
  `${STORAGE_PREFIX}:${userId}:${partId}`;

/** Parts already read, so React gets the same object until something changes. */
const cache = new Map<string, IPartProgress>();
/** Parts whose last save failed (storage full or blocked): served from memory. */
const memoryOnly = new Set<string>();
const listeners = new Set<() => void>();
let isListeningToStorage = false;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toPositiveNumber = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;

/** Turns stored text into a part's progress, ignoring anything malformed. */
function parsePart(raw: string | null): IPartProgress {
  if (!raw) return EMPTY_PART;
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data) || !isRecord(data.contents)) return EMPTY_PART;

    const contents: Record<string, IContentProgress> = {};
    for (const [contentId, entry] of Object.entries(data.contents)) {
      if (!isRecord(entry)) continue;
      contents[contentId] = {
        position: toPositiveNumber(entry.position),
        duration: toPositiveNumber(entry.duration),
        completed: entry.completed === true,
        updatedAt: toPositiveNumber(entry.updatedAt),
      };
    }
    return {
      lastContentId:
        typeof data.lastContentId === "string" ? data.lastContentId : null,
      contents,
    };
  } catch {
    return EMPTY_PART;
  }
}

function readFromStorage(key: string): IPartProgress {
  if (memoryOnly.has(key)) return cache.get(key) ?? EMPTY_PART;
  try {
    return parsePart(window.localStorage.getItem(key));
  } catch {
    // Storage blocked (e.g. private mode): keep working from memory.
    return cache.get(key) ?? EMPTY_PART;
  }
}

function getPart(key: string): IPartProgress {
  if (typeof window === "undefined") return EMPTY_PART;
  let part = cache.get(key);
  if (!part) {
    part = readFromStorage(key);
    cache.set(key, part);
  }
  return part;
}

/**
 * Changes one part. `recipe` gets what is stored RIGHT NOW (so another tab's
 * saves are kept) and returns the new value, or null when nothing changes.
 */
function updatePart(
  key: string,
  recipe: (current: IPartProgress) => IPartProgress | null,
) {
  if (typeof window === "undefined") return;
  const next = recipe(readFromStorage(key));
  if (!next) return;

  cache.set(key, next);
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ v: STORAGE_VERSION, ...next }),
    );
    memoryOnly.delete(key);
  } catch {
    memoryOnly.add(key);
  }
  listeners.forEach((listener) => listener());
}

/** Another tab saved (or cleared) progress: drop our copy so it is re-read. */
function handleStorageEvent(event: StorageEvent) {
  if (event.key === null) {
    cache.clear();
    memoryOnly.clear();
  } else if (event.key.startsWith(`${STORAGE_PREFIX}:`)) {
    cache.delete(event.key);
    memoryOnly.delete(event.key);
  } else {
    return;
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!isListeningToStorage) {
    window.addEventListener("storage", handleStorageEvent);
    isListeningToStorage = true;
  }
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Live progress of one part. Re-renders whenever it changes – in this tab or
 * in another one.
 */
export function useCourseProgress(
  userId: string,
  partId: string,
): IPartProgress {
  const key = storageKey(userId, partId);
  return useSyncExternalStore(
    subscribe,
    () => getPart(key),
    () => EMPTY_PART,
  );
}

export const courseProgress = {
  /** What is saved for a part right now (does not re-render). */
  getPart: (userId: string, partId: string): IPartProgress =>
    getPart(storageKey(userId, partId)),

  /** Remembers which lesson the student opened last in a part. */
  setLastContent(userId: string, partId: string, contentId: string) {
    updatePart(storageKey(userId, partId), (current) =>
      current.lastContentId === contentId
        ? null
        : { ...current, lastContentId: contentId },
    );
  },

  /**
   * Saves progress of ONE lesson of ONE part. Only the given fields change;
   * every other lesson (and every other part) is left exactly as it is.
   */
  saveContent(
    userId: string,
    partId: string,
    contentId: string,
    patch: IContentProgressPatch,
  ) {
    updatePart(storageKey(userId, partId), (current) => {
      const previous = current.contents[contentId];
      const position =
        patch.position === undefined
          ? (previous?.position ?? 0)
          : toPositiveNumber(patch.position);
      // Whole seconds. A known length is never replaced by "unknown" (0).
      const duration =
        Math.round(toPositiveNumber(patch.duration)) ||
        (previous?.duration ?? 0);
      const completed = patch.completed ?? previous?.completed ?? false;

      if (
        previous &&
        previous.position === position &&
        previous.duration === duration &&
        previous.completed === completed
      ) {
        return null;
      }
      return {
        ...current,
        contents: {
          ...current.contents,
          [contentId]: { position, duration, completed, updatedAt: Date.now() },
        },
      };
    });
  },
};
