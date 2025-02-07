import axios from "axios";

type Project = {
  name: string;
  colorName: string;
  color: string;
  id: number;
};
type project = {
  name: string;
  colorName: string;
  color: string;
};

export const getProjectsAPI = async () => {
  const response = await axios.get("/api/projects");
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Error getting projects.");
};

export const addProjectsAPI = async (project: project): Promise<Project> => {
  const response = await axios.post("/api/projects", project);
  if (response.status === 200) {
    return response.data[0];
  }
  throw new Error("Error adding project!");
};

export const updateProjectAPI = async (project: Project): Promise<Project> => {
  console.log(project);
  const response = await axios.put("/api/projects", project);
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error("Error updating task.");
};

export const deleteProjectAPI = async (id: number): Promise<number> => {
  const response = await axios.delete("/api/projects", { data: { id } });

  if (response.status === 200) {
    return response.data;
  }

  throw new Error("Error deleting Project.");
};
