import { contentTypeObj } from "@/constants/ui_constent";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================
// Types for Settings Store
// ============================================

interface ISettings {
  autoplay: boolean;
  autonext: boolean;
  autoskip: boolean;
  theater: boolean;
  playbackRate: number;
}

interface ISettingsStore {
  settings: ISettings;
  updateSetting: <K extends keyof ISettings>(
    key: K,
    value: ISettings[K]
  ) => void;
}

// ============================================
// Types for User UX Settings Store
// ============================================

type ContentType = (typeof contentTypeObj)[keyof typeof contentTypeObj];

interface IUserUXSetting {
  uniContentSelect: ContentType;
  pinnedBlogShown: boolean;
}

interface IUserUXSettingStore {
  userSetting: IUserUXSetting;
  updateUserSetting: <K extends keyof IUserUXSetting>(
    key: K,
    value: IUserUXSetting[K]
  ) => void;
}

// ============================================
// Settings Store
// ============================================

// Persisted in localStorage so the player remembers the student's choices
// (autoplay next, theater mode, speed) between visits.
export const useSettings = create<ISettingsStore>()(
  persist(
    (set) => ({
      // Initial settings state
      settings: {
        autoplay: true, // Default value for autoplay
        autonext: true, // Default value for autoplay next
        autoskip: true, // Default value for auto-skip
        theater: false, // Default value for theater mode
        playbackRate: 1, // Default playback speed
      },

      /**
       * Update a specific setting by key and value.
       * @param key - The name of the setting to update.
       * @param value - The new value for the setting.
       */
      updateSetting: <K extends keyof ISettings>(
        key: K,
        value: ISettings[K],
      ) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
    }),
    {
      name: "ebp-player-settings",
      partialize: (state) => ({ settings: state.settings }),
      // Keep defaults for any setting missing from an older saved copy.
      merge: (persisted, current) => ({
        ...current,
        settings: {
          ...current.settings,
          ...((persisted as Partial<ISettingsStore> | undefined)?.settings ??
            {}),
        },
      }),
    },
  ),
);

// ============================================
// User UX Settings Store
// ============================================

export const useUserUXSetting = create<IUserUXSettingStore>((set) => ({
  userSetting: {
    uniContentSelect: contentTypeObj.CourseVideo,
    pinnedBlogShown: false,
  },
  updateUserSetting: <K extends keyof IUserUXSetting>(
    key: K,
    value: IUserUXSetting[K]
  ) =>
    set((state) => ({
      userSetting: {
        ...state.userSetting,
        [key]: value,
      },
    })),
}));
