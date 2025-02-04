import { create } from "zustand";

type selectedDateStore = {
  selectedDate: string | null;
  setSelectedDate: (value: string | null) => void;
};

export const useSelectedDateStore = create<selectedDateStore>((set) => ({
  selectedDate: null,
  setSelectedDate: (value) => {
    set({ selectedDate: value });
  },
}));
