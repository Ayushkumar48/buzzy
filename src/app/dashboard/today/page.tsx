"use client";
import Card from "@/components/dashboard/Inbox/Card";
import Add from "@/components/dashboard/Modals/Add";
import { useTasksStore } from "@/components/store/tasks";
import { AddCircleRounded, AddRounded } from "@mui/icons-material";
import { Reorder, motion } from "framer-motion";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const [icon, setIcon] = useState(false);
  const { tasks, reorderTasks } = useTasksStore(
    useShallow((state) => ({
      tasks: state.tasks,
      reorderTasks: state.reorderTasks,
    }))
  );

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const sevenDaysBefore = new Date(currentDate);
  sevenDaysBefore.setDate(currentDate.getDate() - 7);
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate >= sevenDaysBefore && taskDate <= currentDate;
  });

  return (
    <div className="flex py-16 flex-col gap-6 px-48 justify-center items-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-3xl font-extrabold text-left w-full"
      >
        Today
      </motion.h2>

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
        <Add data={undefined}>
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
    </div>
  );
}
