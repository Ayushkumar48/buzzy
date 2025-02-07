"use client";
import { Dialog } from "@base-ui-components/react/dialog";
import { CloseRounded } from "@mui/icons-material";
import { Divider } from "@mui/joy";
import ColorPallete from "./Modals/ColorPallete";
import { FormEvent, useState } from "react";
import { useProjectsStore } from "../store/projects";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";
import {
  addProjectsAPI,
  updateProjectAPI,
} from "@/app/api/projects/projectsQuery";
import { Bounce, toast } from "react-toastify";

type projectType = {
  name: string;
  colorName: string;
  color: string;
  id: number;
};

const options = [
  { colorName: "Berry Red", color: "#b8255f" },
  { colorName: "Red", color: "#cf473a" },
  { colorName: "Orange", color: "#c77100" },
  { colorName: "Yellow", color: "#b29104" },
  { colorName: "Olive Green", color: "#949c31" },
  { colorName: "Lime Green", color: "#65a33a" },
  { colorName: "Green", color: "#369307" },
  { colorName: "Mint Green", color: "#42a393" },
  { colorName: "Teal", color: "#148fad" },
  { colorName: "Sky Blue", color: "#319dc0" },
  { colorName: "Light Blue", color: "#6988a4" },
  { colorName: "Blue", color: "#2a67e2" },
  { colorName: "Grape", color: "#692ec2" },
  { colorName: "Violet", color: "#ac30cc" },
  { colorName: "Lavender", color: "#a4698c" },
  { colorName: "Magenta", color: "#e05095" },
  { colorName: "Salmon", color: "#b2635c" },
  { colorName: "Charcoal", color: "#808080" },
  { colorName: "Grey", color: "#999999" },
  { colorName: "Taupe", color: "#8f7a69" },
];

export default function AddProject({
  children,
  data,
}: {
  children: React.ReactNode;
  data: projectType | undefined;
}) {
  const [project, setProject] = useState<{
    name: string;
    colorName: string;
    color: string;
  }>(
    data
      ? {
          name: data.name,
          color: data.color,
          colorName: data.colorName,
        }
      : {
          name: "",
          colorName: "Berry Red",
          color: "#b8255f",
        }
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { addProject, updateProject } = useProjectsStore(
    useShallow((state) => ({
      addProject: state.addProject,
      updateProject: state.updateProject,
    }))
  );
  const addMutate = useMutation({
    mutationFn: addProjectsAPI,
    onSuccess: (newProject) => {
      addProject(newProject);
      toast.success(`New project created ${newProject.name}`, {
        transition: Bounce,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error occured while while creating project!", {
        transition: Bounce,
        theme: "light",
      });
    },
  });
  const updateMutate = useMutation({
    mutationFn: updateProjectAPI,
    onSuccess: (updatedProject) => {
      updateProject(updatedProject);
      toast.success(`1 project updated to ${updatedProject.name}`, {
        transition: Bounce,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error occured while while updating project!", {
        transition: Bounce,
        theme: "light",
      });
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data !== undefined) {
      updateMutate.mutate({ ...project, id: data.id });
    } else {
      addMutate.mutate(project);
    }
    setDialogOpen(false);
    setProject({
      name: "",
      colorName: "Berry Red",
      color: "#b8255f",
    });
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger className="outline-none">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 opacity-40" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-[35rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <div className="px-2 pb-2 flex flex-row justify-between">
            <Dialog.Title className="font-bold">
              {data ? "Edit Project" : "Add Project"}
            </Dialog.Title>
            <Dialog.Close className="outline-none">
              <CloseRounded className="p-0.5 text-lg hover:bg-slate-300 rounded-md active:scale-95" />
            </Dialog.Close>
          </div>
          <Divider />
          <form
            onSubmit={handleSubmit}
            className="p-6 flex flex-col gap-8"
            onKeyDown={(event) => {
              if (event.key === "Enter" && project.name.trim() === "") {
                event.preventDefault();
              }
            }}
          >
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="outline-none ring-1 py-1 ring-slate-300 pl-2 h-9 rounded-md"
                placeholder="name"
                autoComplete="off"
                autoFocus
                value={project.name}
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="color" className="font-bold">
                Color
              </label>
              <ColorPallete
                project={project}
                setProject={setProject}
                options={options}
              />
            </div>
            <div className="flex flex-row gap-4 w-full justify-end">
              <Dialog.Close
                type="button"
                className="px-3.5 py-1.5 hover:bg-gray-300 duration-200 ease-in-out font-semibold bg-gray-200 rounded-lg"
              >
                Cancel
              </Dialog.Close>
              <button
                className="px-3.5 py-1.5 hover:bg-emerald-600 duration-200 ease-in-out font-semibold bg-emerald-500 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                type="submit"
                disabled={project.name.trim() === ""}
              >
                {data ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
