"use client";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IAuthStore } from "../interface/auth.interface";
import { IUser } from "@/features/User/interface/user.interface";

const useAuthStore = create<IAuthStore>()(
  devtools(
    persist<any>(
      (set) => ({
        user: null,
        setUser: (user: IUser) => set({ user }),
        accessToken: null,
        setAccessToken: (accessToken: string) => set({ accessToken }),
        isLoading: false,
        hasHydrated: false,
        clearUser: () => set({ user: null }),
        clearAccessToken: () => set({ accessToken: null }),
        setIsLoading: (isLoading: boolean) => set({ isLoading }),
        setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
      }),
      {
        name: "EBP_CLIENT_AUTH_STORE",
        storage: createJSONStorage(() => localStorage),
        // "partialize" is used when you want to save only part of your store's state in storage,
        // instead of saving everything. For example, you may want to persist sensitive or
        // session-specific data like 'user' and 'accessToken', but not UI state or functions.
        // Use "partialize" when you want to control and minimize what gets persisted to storage
        // for security, privacy, or efficiency.

        partialize: (state) => {
          return {
            accessToken: state.accessToken,
          };
        },
        // onRehydrateStorage is used with Zustand's persist middleware to run logic when the persisted state is rehydrated (restored) into the store.
        // It is especially useful for resetting or updating transient/UI state, such as loading flags, after the store is loaded from storage.
        // For example, here we ensure 'isLoading' is set to false when the store is rehydrated from localStorage.
        onRehydrateStorage() {
          return (state, error) => {
            if (error) {
              console.error("Error rehydrating auth store", error);
              if (state) {
                state.setHasHydrated(true);
                state.setIsLoading(false);
              }
            } else {
              if (state) {
                // After rehydration, set loading to true if we have accessToken (will fetch user)
                if (state.accessToken) {
                  state.setIsLoading(true);
                } else {
                  state.setIsLoading(false);
                }
                state.setHasHydrated(true);
              }
            }
          };
        },
        // Skip hydration errors in production
        // skipHydration: true,
      }
    ),
    {
      name: "Auth",
      enabled: process.env.NODE_ENV === "development" ? true : false,
    }
  )
);

export default useAuthStore;
