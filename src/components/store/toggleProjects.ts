import { create } from "zustand";

type toggleProjectsStore = {
  toggleProjects: boolean;
  setToggleProjects: (value: boolean) => void;
};

export const useToggleProjectsStore = create<toggleProjectsStore>((set) => ({
  toggleProjects: true,
  setToggleProjects: (value) => {
    set({ toggleProjects: value });
  },
}));
