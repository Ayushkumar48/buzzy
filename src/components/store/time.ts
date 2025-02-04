import { create } from "zustand";

type timeStore = {
  time: string;
  setTime: (value: string) => void;
};
export const useTimeStore = create<timeStore>((set) => ({
  time: "string",
  setTime: (value) => {
    set({ time: value });
  },
}));
