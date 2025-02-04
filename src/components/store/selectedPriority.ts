import { create } from "zustand";

type selectedPriorityStore = {
  selectedPriority: 1 | 2 | 3 | 4;
  setSelectedPriority: (value: 1 | 2 | 3 | 4) => void;
};

export const useSelectedPriorityStore = create<selectedPriorityStore>(
  (set) => ({
    selectedPriority: 4,
    setSelectedPriority: (value) => {
      set({ selectedPriority: value });
    },
  })
);
