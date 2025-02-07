import { create } from "zustand";
import { task } from "./types";

type tasksStore = {
  tasks: task[];
  addTask: (t: task) => void;
  removeTask: (id: number) => void;
  updateTask: (t: task) => void;
  reorderTasks: (reorderedTasks: task[]) => void;
  setTasks: (tasks: task[]) => void;
};

export const useTasksStore = create<tasksStore>((set) => ({
  tasks: [],
  addTask: (t: task) =>
    set((state) => ({
      tasks: [...state.tasks, t],
    })),
  removeTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((item) => item.id !== id),
    })),
  updateTask: (t: task) =>
    set((state) => {
      const updatedTasks = state.tasks.map((item) =>
        item.id === t.id ? t : item
      );
      return { tasks: updatedTasks };
    }),
  reorderTasks: (reorderedFilteredTasks: task[]) =>
    set((state) => {
      const allTasks = state.tasks;
      const remainingTasks = allTasks.filter(
        (task) =>
          !reorderedFilteredTasks.some(
            (filteredTask) => filteredTask.id === task.id
          )
      );
      return { tasks: [...reorderedFilteredTasks, ...remainingTasks] };
    }),
  setTasks: (tasks: task[]) => set({ tasks }),
}));
