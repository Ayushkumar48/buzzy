import { create } from "zustand";

type openProjectStore = {
  openProject: boolean;
  setOpenProject: (value: boolean) => void;
};

export const useOpenProjectStore = create<openProjectStore>((set) => ({
  openProject: false,
  setOpenProject: (value) => {
    set({ openProject: value });
  },
}));
