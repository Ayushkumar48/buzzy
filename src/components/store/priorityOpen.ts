import { create } from "zustand";

type priorityOpenStore = {
  priorityOpen: boolean;
  setPriorityOpen: (value: boolean) => void;
};

export const usePriorityOpenStore = create<priorityOpenStore>((set) => ({
  priorityOpen: false,
  setPriorityOpen: (value) => {
    set({ priorityOpen: value });
  },
}));
