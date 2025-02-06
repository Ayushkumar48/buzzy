import axios from "axios";

type Task = {
  id: number;
  name: string;
  description: string;
  date: Date;
  time: string;
  priority: 1 | 2 | 3 | 4;
  saveTo: string;
};
type task = {
  name: string;
  description: string;
  date: Date;
  time: string;
  priority: 1 | 2 | 3 | 4;
  saveTo: string;
};

export const getTasksAPI = async () => {
  const response = await axios.get("/api/tasks");
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Error getting tasks.");
};

export const addTaskAPI = async (task: task): Promise<Task> => {
  const response = await axios.post("/api/tasks", task);
  if (response.status === 200) {
    return response.data[0];
  }
  throw new Error("Error adding task.");
};

export const updateTaskAPI = async (task: Task): Promise<Task> => {
  const response = await axios.put("/api/tasks", task);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Error updating task.");
};

export const deleteTaskAPI = async (id: number): Promise<number> => {
  const response = await axios.delete("/api/tasks", { data: { id } });

  if (response.status === 200) {
    return response.data;
  }

  throw new Error("Error deleting task.");
};
