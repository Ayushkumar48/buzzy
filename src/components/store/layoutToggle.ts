import { create } from "zustand";

type layoutToggleStore = {
  layoutToggle: boolean;
  setLayoutToggle: (value: boolean) => void;
};

export const useLayoutToggleStore = create<layoutToggleStore>((set) => ({
  layoutToggle: true,
  setLayoutToggle: (value) => {
    set({ layoutToggle: value });
  },
}));
