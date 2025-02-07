"use client";
import { getTasksWithPIdAPI } from "@/app/api/projects/[projectId]/projectIdQuery";
import Card from "@/components/dashboard/Inbox/Card";
import Add from "@/components/dashboard/Modals/Add";
import { useTasksStore } from "@/components/store/tasks";
import { AddCircleRounded, AddRounded } from "@mui/icons-material";
import { LinearProgress } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Reorder, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useParams } from "next/navigation";

export default function Page() {
  const { projectId } = useParams();
  const parsedProjectId = projectId ? Number(projectId) : null;

  const { tasks, reorderTasks, setTasks } = useTasksStore(
    useShallow((state) => ({
      tasks: state.tasks,
      reorderTasks: state.reorderTasks,
      setTasks: state.setTasks,
    }))
  );

  const { isLoading, error, data } = useQuery({
    queryKey: ["tasksWithPId", parsedProjectId],
    queryFn: ({ queryKey }) => getTasksWithPIdAPI(queryKey[1] as number),
    enabled: parsedProjectId !== null && !isNaN(parsedProjectId),
    staleTime: 1000 * 60 * 10,
  });
  useEffect(() => {
    if (data) {
      setTasks(data.tasks);
    }
  }, [setTasks, data]);

  const [icon, setIcon] = useState<boolean>(false);
  if (isLoading)
    return (
      <LinearProgress
        variant="soft"
        sx={{
          "--LinearProgress-thickness": "5px",
          color: "#10B981",
        }}
      />
    );

  const filteredTasks =
    tasks?.filter((item) => item.projectId === parsedProjectId) || [];

  return (
    <div className="flex py-16 flex-col gap-6 px-48 justify-center items-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-3xl font-extrabold text-left w-full"
      >
        {data?.project.name}
      </motion.h2>
      {error ? (
        <div className="mt-20 text-red font-bold text-xl">
          Error while getting data!!!{" "}
        </div>
      ) : (
        <>
          <Reorder.Group
            axis="y"
            values={tasks}
            onReorder={reorderTasks}
            className="w-full flex flex-col gap-4"
          >
            {filteredTasks?.map((item) => (
              <Reorder.Item
                key={item.id}
                value={item}
                layout="position"
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <Card data={item} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <div className="w-full flex flex-row justify-start">
            <Add
              data={undefined}
              saveTo={
                isLoading
                  ? "Loading..."
                  : error
                  ? "Error fetching tasks"
                  : filteredTasks.length > 0
                  ? filteredTasks[0].saveTo
                  : "Inbox"
              }
            >
              <div
                className="flex justify-start items-center flex-row gap-2 group w-full cursor-pointer"
                onMouseEnter={() => setIcon(true)}
                onMouseLeave={() => setIcon(false)}
              >
                {icon ? (
                  <AddCircleRounded className="text-emerald-500" />
                ) : (
                  <AddRounded className="text-emerald-500" />
                )}
                <span className="group-hover:text-emerald-500 text-gray-500 duration-150 ease-in-out font-semibold">
                  Add Task
                </span>
              </div>
            </Add>
          </div>
        </>
      )}
    </div>
  );
}
