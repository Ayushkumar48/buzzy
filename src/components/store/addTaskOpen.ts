import { create } from "zustand";

type addTaskOpenStore = {
  addTaskOpen: boolean;
  setAddTaskOpen: (value: boolean) => void;
};

export const useAddTaskOpenStore = create<addTaskOpenStore>((set) => ({
  addTaskOpen: false,
  setAddTaskOpen: (value) => {
    set({ addTaskOpen: value });
  },
}));
