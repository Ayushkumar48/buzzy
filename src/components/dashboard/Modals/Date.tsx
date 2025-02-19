"use client";
import { task } from "@/components/store/types";
import { Dispatch, SetStateAction } from "react";

export default function MyDatePicker({
  task,
  setTask,
}: {
  task: task;
  setTask: Dispatch<SetStateAction<task>>;
}) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setTask((prev) => ({
        ...prev,
        date: date,
      }));
    }
  };

  return (
    <div className="outline-none ring-1 h-7 group cursor-pointer hover:bg-emerald-200 pr-3 pl-2 ring-gray-200 rounded-md flex justify-center flex-row gap-1 items-center">
      <input
        type="date"
        className="[&::-webkit-datetime-edit]:hidden group-hover:bg-emerald-200 w-full h-full cursor-pointer outline-none"
        onChange={handleDateChange}
      />

      <span className="text-sm text-gray-700 group-hover:bg-emerald-200 text-nowrap">
        {new Date(task.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
}
