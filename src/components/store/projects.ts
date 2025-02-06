import { create } from "zustand";

type projectType = {
  id: number;
  name: string;
  colorName: string;
  color: string;
};

type projectsStore = {
  projectNo: number;
  projects: projectType[];
  addProject: (p: { name: string; colorName: string; color: string }) => void;
  updateProject: (p: projectType) => void;
  deleteProject: (p: projectType) => void;
  setProjects: (ps: projectType[]) => void;
};

export const useProjectsStore = create<projectsStore>((set) => ({
  projectNo: 3,
  projects: [],
  addProject: (p: { name: string; colorName: string; color: string }) => {
    set((state) => {
      const updatedProjects = [
        ...state.projects,
        { ...p, id: state.projectNo },
      ];
      state.projectNo = state.projectNo + 1;
      return { projects: updatedProjects };
    });
  },
  updateProject: (p: projectType) => {
    set((state) => {
      const updatedProjects = state.projects.map((item) =>
        item.id === p.id ? p : item
      );
      return { projects: updatedProjects };
    });
  },
  deleteProject: (p: projectType) => {
    set((state) => {
      const updatedProjects = state.projects.filter((item) => item.id !== p.id);
      return { projects: updatedProjects };
    });
  },
  setProjects: (ps: projectType[]) => set({ projects: ps }),
}));
