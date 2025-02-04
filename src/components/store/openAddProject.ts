import { create } from "zustand";

type OpenAddProjectStore = {
  openAddProject: boolean;
  setOpenAddProject: (value: boolean) => void;
};

export const useOpenAddProjectStore = create<OpenAddProjectStore>((set) => ({
  openAddProject: false,
  setOpenAddProject: (value) => {
    set({ openAddProject: value });
  },
}));
