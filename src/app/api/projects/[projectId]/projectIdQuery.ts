import axios from "axios";

export const getTasksWithPIdAPI = async (projectId: number) => {
  if (projectId === 0 || projectId === null) {
    throw new Error("Error getting projects.");
  }
  const response = await axios.get(`/api/projects/${projectId}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Error getting projects.");
};
