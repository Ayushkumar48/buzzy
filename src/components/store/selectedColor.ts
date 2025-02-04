import { create } from "zustand";

type selectedColorStore = {
  selectedColor: string;
  setSelectedColor: (value: string) => void;
};

export const useSelectedColorStore = create<selectedColorStore>((set) => ({
  selectedColor: "Berry Red",
  setSelectedColor: (value) => {
    set({ selectedColor: value });
  },
}));
