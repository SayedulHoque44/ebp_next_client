"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
} from "@vidstack/react";
import { defaultLayoutIcons } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  ArrowCounterClockwise,
  ArrowLeft,
  CheckCircle,
  Circle,
  Gauge,
  ListBullets,
  Play,
  Rectangle,
  SkipBack,
  SkipForward,
} from "@phosphor-icons/react/dist/ssr";
import { useStore } from "zustand";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { useSettings } from "@/features/User/store/user.store";
import {
  courseProgress,
  useCourseProgress,
} from "@/features/CourseVideo/store/courseProgress.store";
import { DayPrivateRoute } from "@/utils/utils";
import useAuth from "@/features/Auth/hooks/useAuth";
import { VideoLayout } from "../AdvanceVideoPlayer/VideoLayout";

interface VideoItem {
  _id: string;
  title: string;
  url: string;
}

/** Shown on top of the player when a lesson ends. */
type EndOverlay =
  | { type: "next"; seconds: number | null } // null = no countdown (autoplay off)
  | { type: "finished" }
  | null;

const POSTER_URL = "https://d1vstek0gf8y4r.cloudfront.net/Course-Video/cvc.png";
const PARTS_URL = "/dashboard/courseVideo";
const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const UP_NEXT_SECONDS = 5;
/** While playing, save the watch position every this many seconds. */
const SAVE_EVERY_SECONDS = 3;
/** Resume only if the student got at least this far (otherwise start at 0:00). */
const RESUME_MIN_SECONDS = 2;
/** Stopped this close to the end = basically finished, so start at 0:00. */
const RESUME_END_GUARD_SECONDS = 3;
/** A lesson counts as completed once this much of it has been watched. */
const COMPLETE_AT = 0.95;

const actionBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";
const actionBtnNeutral = `${actionBtn} border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-700`;

const VideoContainer2: React.FC = () => {
  const params = useParams();
  const partId = params?.partId as string;
  const { user } = useAuth();

  const settings = useStore(useSettings, (state) => state.settings);
  const updateSetting = useStore(useSettings, (state) => state.updateSetting);

  // Lessons of this part
  const { data: CourseVideoss, isLoading: contentLoading } =
    UniContentHooks.useGetSubContents({
      queryKey: [partId],
      params: [
        { name: "limit", value: 100 },
        { name: "page", value: 1 },
        { name: "sort", value: "createdAt" },
        { name: "RefId", value: partId },
      ],
      options: {
        enabled: !!partId,
      },
    });

  // Part details (only used for the heading)
  const { data: partData } = UniContentHooks.useGetUniContent({
    queryKey: [partId],
    params: [
      { name: "sort", value: "createdAt" },
      { name: "_id", value: partId },
    ],
    options: {
      enabled: !!partId,
    },
  });
  const partTitle = (
    partData?.data?.result?.[0] as { title?: string } | undefined
  )?.title;

  const videos = useMemo(
    () => (CourseVideoss?.data?.result ?? []) as VideoItem[],
    [CourseVideoss],
  );

  // ---- Progress ----
  // Saved in localStorage: one entry per part, one record per lesson (by
  // content id). See courseProgress.store.ts.
  const userId = user?._id ?? "guest";
  const progress = useCourseProgress(userId, partId);
  const contents = progress.contents;

  // ---- Current lesson ----
  // Picked by the student, else the one they watched last time, else the first.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // "Watched last time" is read once, when the page opens. It must not follow
  // later saves, or another open tab could switch the lesson playing here.
  const [initialContentId] = useState(
    () => courseProgress.getPart(userId, partId).lastContentId,
  );
  const activeVideo = useMemo<VideoItem | null>(() => {
    if (!videos.length) return null;
    return (
      videos.find((item) => item._id === selectedId) ??
      videos.find((item) => item._id === initialContentId) ??
      videos[0]
    );
  }, [videos, selectedId, initialContentId]);
  const activeId = activeVideo?._id ?? null;
  const activeIndex = activeVideo
    ? videos.findIndex((item) => item._id === activeVideo._id)
    : -1;
  const prevVideo = activeIndex > 0 ? videos[activeIndex - 1] : null;
  const nextVideo =
    activeIndex >= 0 && activeIndex < videos.length - 1
      ? videos[activeIndex + 1]
      : null;

  const doneCount = videos.filter(
    (item) => contents[item._id]?.completed,
  ).length;
  const donePercent = videos.length
    ? Math.round((doneCount / videos.length) * 100)
    : 0;
  const isActiveDone = Boolean(activeId && contents[activeId]?.completed);

  /** How much of a lesson has been watched, 0–100 (for the list). */
  const watchedPercent = (contentId: string) => {
    const entry = contents[contentId];
    if (!entry) return 0;
    if (entry.completed) return 100;
    if (!entry.duration) return 0;
    return Math.min(100, Math.round((entry.position / entry.duration) * 100));
  };

  const [overlay, setOverlay] = useState<EndOverlay>(null);

  const playerRef = useRef<MediaPlayerInstance>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);
  /** Start playing as soon as the newly selected lesson is ready. */
  const playOnReadyRef = useRef(false);
  /**
   * The lesson that is REALLY loaded in the player, and how far it has played.
   * Progress is always saved against this content id – never against the list
   * selection – so switching lessons can't write one lesson's time into another.
   * `ready` is false while a lesson is loading: nothing is saved until its
   * saved position has been restored.
   */
  const loadedRef = useRef({
    contentId: null as string | null,
    ready: false,
    time: 0,
    duration: 0,
    savedTime: 0,
    /** The 95% rule already ticked this lesson during this load. */
    autoCompleted: false,
  });

  /** Writes the loaded lesson's current position to localStorage (if it moved). */
  const savePosition = useCallback(() => {
    const loaded = loadedRef.current;
    if (!loaded.contentId || !loaded.ready) return;
    const position = Math.floor(loaded.time);
    if (position === loaded.savedTime) return;
    loaded.savedTime = position;

    // Tick it as completed once per load, so a student who unticks it by hand
    // near the end doesn't get it ticked again a few seconds later.
    const watchedEnough =
      !loaded.autoCompleted &&
      loaded.duration > 0 &&
      loaded.time / loaded.duration >= COMPLETE_AT;
    if (watchedEnough) loaded.autoCompleted = true;
    courseProgress.saveContent(userId, partId, loaded.contentId, {
      position,
      duration: loaded.duration,
      ...(watchedEnough ? { completed: true } : {}),
    });
  }, [userId, partId]);

  // ---- Navigation ----
  const goTo = useCallback(
    (item: VideoItem, autoplay = true) => {
      setOverlay(null);
      if (item._id === activeId) {
        const player = playerRef.current;
        if (player?.paused) player.play().catch(() => {});
        return;
      }
      // Save where the current lesson stopped, then record nothing more until
      // the new lesson has loaded and been set up.
      savePosition();
      loadedRef.current.ready = false;
      playOnReadyRef.current = autoplay;
      setSelectedId(item._id);
      courseProgress.setLastContent(userId, partId, item._id);
    },
    [activeId, savePosition, userId, partId],
  );

  const goNext = useCallback(() => {
    if (nextVideo) goTo(nextVideo);
  }, [nextVideo, goTo]);

  const goPrev = useCallback(() => {
    if (prevVideo) goTo(prevVideo);
  }, [prevVideo, goTo]);

  /** Picked from the lesson list: also bring the player back into view. */
  const handleSelect = (item: VideoItem) => {
    goTo(item);
    const wrap = videoWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      wrap.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ---- Preferences ----
  const toggleTheater = useCallback(() => {
    const store = useSettings.getState();
    store.updateSetting("theater", !store.settings.theater);
  }, []);

  const toggleAutoNext = () => updateSetting("autonext", !settings.autonext);

  // The saved speed is passed to <MediaPlayer playbackRate>, so updating the
  // setting is enough – the player applies it now and on every later lesson.
  const setSpeed = (rate: number) => updateSetting("playbackRate", rate);

  const toggleDone = () => {
    if (!activeId) return;
    courseProgress.saveContent(userId, partId, activeId, {
      completed: !isActiveDone,
    });
  };

  const replay = () => {
    setOverlay(null);
    const player = playerRef.current;
    if (!player) return;
    player.currentTime = 0;
    player.play().catch(() => {});
  };

  // ---- Player events ----
  /** The player started switching to another source: stop recording. */
  const handleSourceChange = () => {
    loadedRef.current.ready = false;
  };

  const handleCanPlay = () => {
    const player = playerRef.current;
    if (!player || !activeVideo) return;

    // Make sure the media that just became ready really is the selected
    // lesson (during a quick switch the previous one can still report ready).
    const loadedUrl = player.state.source?.src;
    if (typeof loadedUrl === "string" && loadedUrl !== activeVideo.url) return;

    // Run once per lesson (can-play may fire again, e.g. on quality change).
    const loaded = loadedRef.current;
    if (loaded.ready && loaded.contentId === activeVideo._id) return;

    // (Speed needs nothing here: it is passed to <MediaPlayer playbackRate>,
    // which the player re-applies itself every time a lesson loads.)

    // Resume where the student left THIS lesson (looked up by its content id),
    // unless that was right at the start or right at the end.
    const saved = courseProgress.getPart(userId, partId).contents[
      activeVideo._id
    ];
    const position = saved?.position ?? 0;
    const duration = player.duration;
    const hasDuration = Number.isFinite(duration) && duration > 0;
    const resumeAt =
      position >= RESUME_MIN_SECONDS &&
      (!hasDuration || position < duration - RESUME_END_GUARD_SECONDS)
        ? position
        : 0;
    if (resumeAt > 0) player.currentTime = resumeAt;

    loadedRef.current = {
      contentId: activeVideo._id,
      ready: true,
      time: resumeAt,
      duration: hasDuration ? duration : (saved?.duration ?? 0),
      savedTime: resumeAt,
      autoCompleted: false,
    };

    if (playOnReadyRef.current) {
      playOnReadyRef.current = false;
      // May be blocked by the browser's autoplay policy – then the student
      // just presses play.
      player.play().catch(() => {});
    }
  };

  /** True while the loaded lesson is set up AND is the one selected in the list. */
  const canRecord = () => {
    const loaded = loadedRef.current;
    return loaded.ready && !!activeId && loaded.contentId === activeId;
  };

  const handleTimeUpdate = (detail: { currentTime: number }) => {
    // Nothing is recorded while a lesson is loading, so a lesson that starts
    // at 0:00 can't overwrite its saved position before it has been restored.
    // Also ignore the last tick after the end (the lesson was reset to 0:00).
    const player = playerRef.current;
    if (!canRecord() || player?.state.ended) return;

    const loaded = loadedRef.current;
    loaded.time = detail.currentTime;
    const duration = player?.duration ?? 0;
    if (Number.isFinite(duration) && duration > 0) loaded.duration = duration;

    if (Math.abs(loaded.time - loaded.savedTime) >= SAVE_EVERY_SECONDS) {
      savePosition();
    }
  };

  /** Paused: save the exact position straight away. */
  const handlePause = () => {
    if (canRecord()) savePosition();
  };

  /** Jumped to another time (also while paused): save it straight away. */
  const handleSeeked = (time: number) => {
    if (!canRecord() || playerRef.current?.state.ended) return;
    loadedRef.current.time = time;
    savePosition();
  };

  const handleRateChange = (rate: number) => {
    // Remember speed changes made from the player's own settings menu – but
    // not the browser's reset to 1x while a new lesson is loading.
    if (!loadedRef.current.ready) return;
    const store = useSettings.getState();
    if (store.settings.playbackRate !== rate) {
      store.updateSetting("playbackRate", rate);
    }
  };

  const handleEnded = () => {
    if (!activeId) return;
    const loaded = loadedRef.current;
    if (loaded.contentId === activeId) {
      // Finished: mark it completed, and start from 0:00 next time.
      loaded.time = 0;
      loaded.savedTime = 0;
      courseProgress.saveContent(userId, partId, activeId, {
        position: 0,
        duration: loaded.duration,
        completed: true,
      });
    }

    if (!nextVideo) {
      setOverlay({ type: "finished" });
      return;
    }
    setOverlay({
      type: "next",
      seconds: useSettings.getState().settings.autonext
        ? UP_NEXT_SECONDS
        : null,
    });
  };

  // Save the position whenever the student leaves: refresh / close / switch
  // tab or app (pagehide + hidden), and moving to another page inside the app
  // (unmount). So a refresh always comes back to the exact spot.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") savePosition();
    };
    window.addEventListener("pagehide", savePosition);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", savePosition);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      savePosition();
    };
  }, [savePosition]);

  // "Up next" countdown → plays the next lesson when it reaches zero.
  const isCountingDown = overlay?.type === "next" && overlay.seconds !== null;
  useEffect(() => {
    if (!isCountingDown) return;
    let remaining = UP_NEXT_SECONDS;
    const timer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(timer);
        goNext();
      } else {
        setOverlay({ type: "next", seconds: remaining });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isCountingDown, goNext]);

  // Keyboard shortcuts: Shift+N next, Shift+P previous, T theater mode.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return;
      }
      const key = event.key.toLowerCase();
      if (event.shiftKey && key === "n") goNext();
      else if (event.shiftKey && key === "p") goPrev();
      else if (!event.shiftKey && key === "t") toggleTheater();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, toggleTheater]);

  // Keep the current lesson visible inside the lesson list (desktop side
  // panel only – it never scrolls the page itself).
  useEffect(() => {
    const list = listRef.current;
    const item = activeItemRef.current;
    if (!list || !item || list.scrollHeight <= list.clientHeight) return;
    list.scrollTo({
      top: item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  const theater = settings.theater;

  return (
    <div className="py-2 sm:py-4">
      {!contentLoading && user?.role !== "Admin" && (
        <DayPrivateRoute
          loggedUser={user}
          dayCount={[0, 2, 4, 6]}
          redirectUrl={PARTS_URL}
        />
      )}

      {/* Heading */}
      <div className="mb-4 flex items-center gap-3">
        <Link
          href={PARTS_URL}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-primary-300 hover:text-primary-700"
        >
          <ArrowLeft size={16} weight="bold" />
          All parts
        </Link>
        {partTitle && (
          <h1 className="min-w-0 truncate text-base font-bold text-gray-900 sm:text-lg">
            {partTitle}
          </h1>
        )}
      </div>

      {/* Loading */}
      {contentLoading && (
        <div
          className="grid animate-pulse grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_23rem]"
          aria-busy="true"
          aria-label="Loading lessons"
        >
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-2xl bg-gray-200" />
            <div className="h-36 rounded-2xl bg-gray-200" />
          </div>
          <div className="h-72 rounded-2xl bg-gray-200 xl:h-auto" />
        </div>
      )}

      {/* Empty */}
      {!contentLoading && !activeVideo && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-base font-semibold text-gray-900">
            No lessons in this part yet
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Please check back later or choose another part.
          </p>
          <Link href={PARTS_URL} className={`${actionBtnNeutral} mt-4`}>
            <ArrowLeft size={16} weight="bold" />
            Back to all parts
          </Link>
        </div>
      )}

      {activeVideo && (
        <div
          className={`grid grid-cols-1 gap-4 sm:gap-5 ${
            theater
              ? ""
              : "xl:grid-cols-[minmax(0,1fr)_23rem] xl:grid-rows-[auto_1fr]"
          }`}
        >
          {/* ---------- Player ---------- */}
          {/* On phones (portrait) the player stays pinned while the lesson list scrolls.
              The ::before strip covers the dashboard's 1rem top padding (p-4 on <main>)
              so content doesn't show through above the pinned player. */}
          <div
            ref={videoWrapRef}
            className="relative z-20 max-md:portrait:sticky max-md:portrait:top-0 max-md:portrait:bg-gray-50 max-md:portrait:before:absolute max-md:portrait:before:inset-x-0 max-md:portrait:before:-top-4 max-md:portrait:before:h-4 max-md:portrait:before:bg-gray-50 max-md:portrait:before:content-[''] xl:col-start-1"
          >
            <div className="rounded-2xl bg-black shadow-lg ring-1 ring-black/10">
              {/* Never taller than the screen: width is capped from the viewport height. */}
              <div className="mx-auto w-full max-w-[calc((100dvh_-_7rem)_*_16_/_9)]">
                <MediaPlayer
                  ref={playerRef}
                  className="w-full rounded-2xl align-top"
                  autoPlay={false}
                  viewType="video"
                  streamType="on-demand"
                  logLevel="warn"
                  playsInline
                  title={activeVideo.title}
                  src={activeVideo.url}
                  poster={POSTER_URL}
                  playbackRate={settings.playbackRate || 1}
                  onSourceChange={handleSourceChange}
                  onCanPlay={handleCanPlay}
                  onTimeUpdate={handleTimeUpdate}
                  onPause={handlePause}
                  onSeeked={handleSeeked}
                  onRateChange={handleRateChange}
                  onEnded={handleEnded}
                  onPlay={() => setOverlay(null)}
                >
                  <MediaProvider />
                  <Poster
                    className="absolute inset-0 block h-full w-full rounded-2xl opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                    src={POSTER_URL}
                    alt="Course video poster"
                  />
                  <VideoLayout
                    thumbnails={defaultLayoutIcons}
                    onPrev={goPrev}
                    onNext={goNext}
                    hasPrev={!!prevVideo}
                    hasNext={!!nextVideo}
                    theater={theater}
                    onToggleTheater={toggleTheater}
                  />

                  {/* End of lesson: up next / part finished */}
                  {overlay && (
                    <div className="absolute inset-0 z-[60] flex items-center justify-center rounded-2xl bg-gray-950/95 p-3 text-center backdrop-blur-sm sm:p-6">
                      {overlay.type === "next" && nextVideo ? (
                        <div className="w-full max-w-md">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 sm:text-xs">
                            {overlay.seconds !== null
                              ? `Up next in ${overlay.seconds}`
                              : "Up next"}
                          </p>
                          <p className="mt-1.5 line-clamp-2 text-sm font-bold text-white sm:mt-2 sm:text-xl">
                            {nextVideo.title}
                          </p>
                          <div className="mt-3 flex items-center justify-center gap-2 sm:mt-5">
                            <button
                              type="button"
                              onClick={() => setOverlay(null)}
                              className="cursor-pointer rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={goNext}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-P-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                            >
                              <Play size={14} weight="fill" />
                              Play now
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full max-w-md">
                          <CheckCircle
                            weight="fill"
                            className="mx-auto h-8 w-8 text-emerald-400 sm:h-11 sm:w-11"
                          />
                          <p className="mt-1.5 text-sm font-bold text-white sm:mt-2 sm:text-xl">
                            You finished this part
                          </p>
                          <div className="mt-3 flex items-center justify-center gap-2 sm:mt-5">
                            <button
                              type="button"
                              onClick={replay}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                              <ArrowCounterClockwise size={14} weight="bold" />
                              Replay
                            </button>
                            <Link
                              href={PARTS_URL}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-P-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                            >
                              All parts
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </MediaPlayer>
              </div>
            </div>
          </div>

          {/* ---------- Lesson info + controls ---------- */}
          <section className="self-start rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 xl:col-start-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-primary-50 px-2.5 py-1 text-primary-700">
                Lesson {activeIndex + 1} of {videos.length}
              </span>
              {isActiveDone && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                  <CheckCircle size={14} weight="fill" />
                  Completed
                </span>
              )}
            </div>
            <h2 className="mt-2 break-words text-lg font-bold leading-snug text-gray-900 sm:text-xl">
              {activeVideo.title}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={goPrev}
                disabled={!prevVideo}
                className={actionBtnNeutral}
              >
                <SkipBack size={16} weight="fill" />
                Previous
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!nextVideo}
                className={`${actionBtn} border-transparent bg-P-primary text-white hover:bg-primary-700 disabled:hover:bg-P-primary`}
              >
                Next
                <SkipForward size={16} weight="fill" />
              </button>
              <button
                type="button"
                onClick={toggleDone}
                aria-pressed={isActiveDone}
                className={`${actionBtn} col-span-2 sm:ml-auto ${
                  isActiveDone
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {isActiveDone ? (
                  <CheckCircle size={18} weight="fill" />
                ) : (
                  <Circle size={18} />
                )}
                {isActiveDone ? "Completed" : "Mark as completed"}
              </button>
              {/* Theater mode – desktop only (below xl the page is already stacked) */}
              <div className="hidden xl:block">
                <button
                  type="button"
                  onClick={toggleTheater}
                  aria-pressed={theater}
                  title="Theater mode (T)"
                  className={`${actionBtn} ${
                    theater
                      ? "border-primary-200 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-700"
                  }`}
                >
                  <Rectangle size={18} weight={theater ? "fill" : "regular"} />
                  {theater ? "Exit theater" : "Theater mode"}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Autoplay next */}
              <button
                type="button"
                role="switch"
                aria-checked={settings.autonext}
                onClick={toggleAutoNext}
                className="inline-flex cursor-pointer items-center gap-3 text-left"
              >
                <span
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                    settings.autonext ? "bg-P-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      settings.autonext ? "translate-x-5" : ""
                    }`}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">
                    Autoplay next
                  </span>
                  <span className="block text-xs text-gray-500">
                    {settings.autonext
                      ? "The next lesson starts automatically"
                      : "Stops when this lesson ends"}
                  </span>
                </span>
              </button>

              {/* Speed */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
                  <Gauge size={16} />
                  Speed
                </span>
                <div
                  className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-0.5"
                  role="group"
                  aria-label="Playback speed"
                >
                  {SPEEDS.map((rate) => {
                    const isCurrent = settings.playbackRate === rate;
                    return (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setSpeed(rate)}
                        aria-pressed={isCurrent}
                        className={`cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold transition-colors ${
                          isCurrent
                            ? "bg-white text-primary-700 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {rate}x
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Lesson list ---------- */}
          <aside
            className={`flex min-h-0 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm ${
              theater
                ? ""
                : "xl:sticky xl:top-2 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:max-h-[calc(100dvh-7rem)] xl:self-start"
            }`}
          >
            <div className="border-b border-gray-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <ListBullets size={20} weight="bold" />
                  Lessons
                </h3>
                <span className="text-xs font-semibold text-gray-500">
                  {doneCount}/{videos.length} completed
                </span>
              </div>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-label="Part progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={donePercent}
              >
                <div
                  className="h-full rounded-full bg-P-primary transition-[width] duration-500"
                  style={{ width: `${donePercent}%` }}
                />
              </div>
            </div>

            <div
              ref={listRef}
              className={`relative grid content-start gap-1.5 p-2 sm:p-3 ${
                theater
                  ? "xl:grid-cols-2"
                  : "xl:min-h-0 xl:flex-1 xl:overflow-y-auto"
              }`}
            >
              {videos.map((item, index) => {
                const isActive = item._id === activeId;
                const isDone = Boolean(contents[item._id]?.completed);
                const percent = watchedPercent(item._id);
                return (
                  <button
                    key={item._id}
                    ref={isActive ? activeItemRef : undefined}
                    type="button"
                    onClick={() => handleSelect(item)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border p-2 text-left transition-colors ${
                      isActive
                        ? "border-primary-200 bg-primary-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-900 sm:h-16 sm:w-28">
                      <Image
                        width={224}
                        height={128}
                        className="h-full w-full object-cover"
                        src={POSTER_URL}
                        alt=""
                      />
                      {isActive && (
                        <div className="absolute inset-0 grid place-items-center bg-black/45">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-P-primary text-white shadow">
                            <Play size={12} weight="fill" />
                          </span>
                        </div>
                      )}
                      {/* How much of this lesson has been watched */}
                      {percent > 0 && (
                        <div
                          className="absolute inset-x-0 bottom-0 h-1 bg-black/50"
                          aria-hidden="true"
                        >
                          <div
                            className={`h-full ${
                              isDone ? "bg-emerald-500" : "bg-P-primary"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-wide ${
                          isActive ? "text-primary-600" : "text-gray-400"
                        }`}
                      >
                        {isActive ? "Now playing" : `Lesson ${index + 1}`}
                        {percent > 0 && percent < 100 && ` · ${percent}% watched`}
                      </p>
                      <p
                        className={`mt-0.5 line-clamp-2 text-sm font-medium leading-snug ${
                          isActive ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                    {isDone && (
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="shrink-0 text-emerald-500"
                        aria-label="Completed"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default VideoContainer2;
