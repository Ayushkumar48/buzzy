import { useTasksStore } from "@/components/store/tasks";
import {
  BorderColorRounded,
  CalendarTodayRounded,
  DragIndicatorRounded,
  MoreHorizRounded,
} from "@mui/icons-material";
import { Checkbox } from "@mui/joy";
import { motion } from "framer-motion";
import React from "react";
import { Bounce, toast } from "react-toastify";
import Add from "../Modals/Add";
import { deleteTaskAPI } from "@/app/api/tasks/tasksQuery";
import { useMutation } from "@tanstack/react-query";
import { task } from "@/components/store/types";

export default function Card({ data }: { data: task }) {
  const removeTask = useTasksStore((state) => state.removeTask);
  const color =
    data &&
    (data.priority === 1
      ? "danger"
      : data.priority === 2
      ? "warning"
      : data.priority === 3
      ? "primary"
      : "neutral");
  const deleteMutate = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: (id) => {
      removeTask(id);
      toast.info(`1 Task completed at ${data.saveTo}`, {
        transition: Bounce,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error occured while deleting task!", {
        transition: Bounce,
        theme: "light",
      });
    },
  });
  async function handleRemove(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked === true && data.id) {
      deleteMutate.mutate(data.id);
    }
  }

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group flex flex-col w-full bg-white rounded-md shadow-md ring-1 ring-gray-200 hover:shadow-lg transition-all"
    >
      <motion.div className="absolute top-1 -left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-move">
        <DragIndicatorRounded
          className="text-gray-500 hover:bg-gray-300 p-1 rounded-md transition-colors"
          sx={{ fontSize: 30 }}
        />
      </motion.div>
      <div className="flex flex-row gap-3 p-3">
        <Checkbox
          variant="soft"
          color={color}
          onChange={handleRemove}
          className="relative transition-all duration-200 ease-in-out group-hover:checked:opacity-100 group-hover:scale-110"
        />

        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-medium text-gray-800 text-left">
            {data.name}
          </div>
          <div className="text-xs text-gray-600 text-left">
            {data.description}
          </div>
          <div className="flex flex-row gap-2 text-xs items-center text-gray-700">
            <CalendarTodayRounded
              fontSize="inherit"
              className="text-gray-500"
            />
            <span>
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>{data.time}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 invisible group-hover:visible">
        <div className="absolute right-0 w-36 h-12 bg-gradient-to-l from-white via-white to-transparent opacity-100" />

        <div className="relative flex flex-row gap-2 justify-center items-center pt-1.5 pr-1">
          <Add data={data} saveTo="Inbox">
            <BorderColorRounded
              className="text-gray-500 hover:bg-slate-200 p-0.5 rounded-sm transition-colors duration-200"
              fontSize="medium"
            />
          </Add>
          <button>
            <MoreHorizRounded
              className="text-gray-500 hover:bg-slate-200 p-0.5 rounded-sm transition-colors duration-200"
              fontSize="medium"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
