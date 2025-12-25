import { contentTypeObj } from "@/lib/constants/ui_constent";
import { create } from "zustand";

// ============================================
// Types for Settings Store
// ============================================

interface ISettings {
  autoplay: boolean;
  autonext: boolean;
  autoskip: boolean;
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

export const useSettings = create<ISettingsStore>((set) => ({
  // Initial settings state
  settings: {
    autoplay: true, // Default value for autoplay
    autonext: true, // Default value for autoplay next
    autoskip: true, // Default value for auto-skip
  },

  /**
   * Update a specific setting by key and value.
   * @param key - The name of the setting to update.
   * @param value - The new value for the setting.
   */
  updateSetting: <K extends keyof ISettings>(key: K, value: ISettings[K]) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    })),
}));

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
