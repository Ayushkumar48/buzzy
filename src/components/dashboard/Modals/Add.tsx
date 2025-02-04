import { Divider } from "@mui/material";
import Date from "./Date";
import Priority from "./Priority";
import Where from "./Where";
import { useAddTaskOpenStore } from "@/components/store/addTaskOpen";
import { useTimeStore } from "@/components/store/time";

export default function Add() {
  const { addTaskOpen, setAddTaskOpen } = useAddTaskOpenStore();
  const { time, setTime } = useTimeStore();
  return (
    <div
      className={`rounded-xl w-[35rem] duration-500 ease-in-out bg-white ring-1 ring-gray-200 shadow-lg p-4 flex flex-col gap-4 ${
        addTaskOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <input
        type="text"
        className="font-bold w-60 outline-none"
        autoFocus
        placeholder="Take groceries from market..."
      />
      <input
        className="text-sm text-gray-500 outline-none w-80"
        type="text"
        placeholder="Description..."
      />
      <div className="flex flex-row gap-6 items-center">
        <Date />
        <Priority />
        <div className="outline-none ring-1 h-7  cursor-pointer ring-gray-200 rounded-md w-20">
          <input
            type="time"
            className="hover:bg-emerald-200 px-5 text-sm outline-none ring-1 h-7 cursor-pointer ring-gray-200 rounded-md w-28"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <Divider variant="fullWidth" />
      <div className="flex flex-row justify-between">
        <Where />
        <div className="flex flex-row gap-4">
          <button
            className="px-3.5 py-1.5 hover:bg-gray-300 duration-200 ease-in-out font-semibold bg-gray-200 rounded-lg"
            onClick={() => setAddTaskOpen(false)}
          >
            Cancel
          </button>
          <button className="px-3.5 py-1.5 hover:bg-emerald-600 duration-200 ease-in-out font-semibold bg-emerald-500 text-white rounded-lg">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
