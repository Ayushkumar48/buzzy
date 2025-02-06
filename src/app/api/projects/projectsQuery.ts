import axios from "axios";

export const getProjectsAPI = async () => {
  const response = await axios.get("/api/projects");
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Error getting projects.");
};

export const addProjectsAPI = async () => {
  const response = await axios.get("/api/projects");
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Error adding project!");
};
