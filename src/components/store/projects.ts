import { create } from "zustand";

type projectsStore = {
  projects: string[];
};

export const useProjectsStore = create<projectsStore>(() => ({
  projects: ["/dashboard/projects/home", "/dashboard/projects/grocery"],
}));
