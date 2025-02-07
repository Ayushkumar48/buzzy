import { create } from "zustand";
import { project } from "./types";

type projectsStore = {
  projects: project[];
  addProject: (p: project) => void;
  updateProject: (p: project) => void;
  deleteProject: (id: number) => void;
  setProjects: (ps: project[]) => void;
};

export const useProjectsStore = create<projectsStore>((set) => ({
  projects: [],
  addProject: (p: project) => {
    set((state) => {
      const updatedProjects = [...state.projects, p];
      return { projects: updatedProjects };
    });
  },
  updateProject: (p: project) => {
    set((state) => {
      const updatedProjects = state.projects.map((item) =>
        item.id === p.id ? p : item
      );
      return { projects: updatedProjects };
    });
  },
  deleteProject: (id: number) => {
    set((state) => {
      const updatedProjects = state.projects.filter((item) => item.id !== id);
      return { projects: updatedProjects };
    });
  },
  setProjects: (ps: project[]) => set({ projects: ps }),
}));
