"use client";
import { Divider } from "@mui/material";
import CustomDate from "./Date";
import Priority from "./Priority";
import Where from "./Where";
import { Dialog } from "@base-ui-components/react/dialog";
import { useEffect, useState } from "react";
import { useTasksStore } from "@/components/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { addTaskAPI, updateTaskAPI } from "@/app/api/tasks/tasksQuery";

type taskType = {
  name: string;
  description: string;
  date: Date;
  time: string;
  priority: 1 | 2 | 3 | 4;
  saveTo: string;
};
type task = {
  id: number;
  name: string;
  description: string;
  date: Date;
  time: string;
  priority: 1 | 2 | 3 | 4;
  saveTo: string;
};

export default function Add({
  children,
  data,
}: {
  children: React.ReactNode;
  data: task | undefined;
}) {
  const [task, setTask] = useState<taskType | task>({
    name: "",
    description: "",
    time: "12:00",
    date: new Date(),
    priority: 4,
    saveTo: "Inbox",
  });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  useEffect(() => {
    if (data !== undefined) {
      setTask((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...taskData } = data;
        if (JSON.stringify(prev) !== JSON.stringify(taskData)) {
          return taskData;
        }
        return prev;
      });
    }
  }, [data]);

  const { addTask, updateTask } = useTasksStore(
    useShallow((state) => ({
      addTask: state.addTask,
      updateTask: state.updateTask,
    }))
  );
  const addMutate = useMutation({
    mutationFn: addTaskAPI,
    onSuccess: (newTask) => {
      addTask(newTask);
      toast.success(`Task added to ${task.saveTo}`, {
        transition: Bounce,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error occured while adding task!", {
        transition: Bounce,
        theme: "light",
      });
    },
  });
  const updateMutate = useMutation({
    mutationFn: updateTaskAPI,
    onSuccess: (newTask) => {
      updateTask(newTask);
      toast.success(`Task updated at ${task.saveTo}`, {
        transition: Bounce,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error occured while updating task!", {
        transition: Bounce,
        theme: "light",
      });
    },
  });

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data !== undefined) {
      updateMutate.mutate({ ...task, id: data.id } as task);
    } else {
      addMutate.mutate(task as taskType);
    }
    setTask({
      name: "",
      description: "",
      time: "12:00",
      date: new Date(),
      priority: 4,
      saveTo: "Inbox",
    });
    setDialogOpen(false);
  }
  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger className="outline-none">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 transition-all bg-black/20 duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-[40rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl text-gray-600 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleAdd}
            onKeyDown={(event) => {
              if (event.key === "Enter" && task.name.trim() === "") {
                event.preventDefault();
              }
            }}
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="font-bold w-60 outline-none text-lg"
                autoFocus
                name="name"
                placeholder="Take groceries from market..."
                onChange={(e) =>
                  setTask((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                value={task.name}
                autoComplete="off"
                spellCheck={false}
              />
              <input
                className="text-sm text-gray-500 outline-none w-80"
                type="text"
                name="description"
                placeholder="Description..."
                autoComplete="off"
                spellCheck={false}
                value={task.description}
                onChange={(e) =>
                  setTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-row gap-6 items-center">
              <CustomDate task={task} setTask={setTask} />
              <Priority task={task} setTask={setTask} />
              <div className="outline-none ring-1 h-7  cursor-pointer ring-gray-200 rounded-md w-20">
                <input
                  type="time"
                  className="hover:bg-emerald-200 px-5 text-sm outline-none ring-1 h-7 cursor-pointer ring-gray-200 rounded-md w-28"
                  value={task.time}
                  name="time"
                  autoCapitalize="off"
                  onChange={(e) =>
                    setTask((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <Divider variant="fullWidth" />
            <div className="flex flex-row justify-between">
              <Where task={task} setTask={setTask} />
              <div className="flex flex-row gap-4">
                <Dialog.Close className="px-3.5 py-1.5 hover:bg-gray-300 duration-200 ease-in-out font-semibold bg-gray-200 rounded-lg outline-none">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 hover:bg-emerald-600 outline-none duration-200 ease-in-out font-semibold bg-emerald-500 text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={task.name.trim() === ""}
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
