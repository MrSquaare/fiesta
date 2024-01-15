import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { MinimalUser } from "../types";

type AppState = {
  currentUser?: MinimalUser | null;
};

export type AppActions = {
  setCurrentUser: (currentUser: MinimalUser | null) => void;
  clearCurrentUser: () => void;
};

export const useAppStore = create(
  immer<AppState & AppActions>((set) => ({
    setCurrentUser: (currentUser) => {
      set((state) => {
        state.currentUser = currentUser;
      });
    },
    clearCurrentUser: () => {
      set((state) => {
        state.currentUser = undefined;
      });
    },
  }))
);
