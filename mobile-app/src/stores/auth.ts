import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const storageKey = "token";

export type AuthState = {
  token?: string | null;
};

export type AuthActions = {
  getToken: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
};

export const useAuthStore = create(
  immer<AuthState & AuthActions>((set) => ({
    getToken: async () => {
      try {
        const token = await SecureStoragePlugin.get({ key: storageKey });

        set((state) => {
          state.token = token.value;
        });
      } catch (error) {
        set((state) => {
          state.token = null;
        });
      }
    },
    setToken: async (token) => {
      try {
        await SecureStoragePlugin.set({ key: storageKey, value: token });

        set((state) => {
          state.token = token;
        });
      } catch (error) {
        console.log("Failed to set token");
      }
    },
    clearToken: async () => {
      try {
        await SecureStoragePlugin.remove({ key: storageKey });

        set((state) => {
          state.token = null;
        });
      } catch (error) {
        console.log("Failed to clear token");
      }
    },
  }))
);
