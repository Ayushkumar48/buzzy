"use client";
import { usePriorityOpenStore } from "@/components/store/priorityOpen";
import { useSelectedPriorityStore } from "@/components/store/selectedPriority";
import { FlagRounded, OutlinedFlagRounded } from "@mui/icons-material";
import { Divider } from "@mui/material";

export default function Priority() {
  const priorities: string[] = [
    "text-red-500",
    "text-yellow-500",
    "text-blue-500",
    "",
  ];
  const { priorityOpen, setPriorityOpen } = usePriorityOpenStore();
  const { selectedPriority, setSelectedPriority } = useSelectedPriorityStore();
  return (
    <div
      className="text-xs outline-none ring-1 h-7 hover:bg-emerald-200 cursor-pointer ring-gray-200 rounded-md w-20 relative flex justify-center flex-row gap-1 items-center"
      onClick={() => setPriorityOpen(!priorityOpen)}
    >
      {selectedPriority === 4 ? (
        <>
          <OutlinedFlagRounded fontSize="small" />
          Priority
        </>
      ) : (
        <>
          <FlagRounded
            fontSize="small"
            className={priorities[selectedPriority - 1]}
          />
          <div>P{selectedPriority}</div>
        </>
      )}
      <div
        className={`absolute top-9 w-24 text-nowrap flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg left-1/2 -translate-x-1/2 ${
          priorityOpen
            ? "block translate-y-0 opacity-100 duration-300 ease-in-out"
            : "opacity-0 translate-y-2 hidden"
        }`}
      >
        <div
          className="flex flex-row gap-1 justify-center items-center py-2 hover:bg-slate-100 rounded-t-md"
          itemType="button"
          onClick={() => setSelectedPriority(1)}
        >
          <FlagRounded fontSize="small" className="text-red-500" />
          <div>Priority 1</div>
        </div>
        <Divider />
        <div
          className="flex flex-row gap-1 justify-center items-center py-2 hover:bg-slate-100"
          itemType="button"
          onClick={() => setSelectedPriority(2)}
        >
          <FlagRounded fontSize="small" className="text-yellow-500" />
          <div>Priority 2</div>
        </div>
        <Divider />
        <div
          className="flex flex-row gap-1 justify-center items-center py-2 hover:bg-slate-100"
          itemType="button"
          onClick={() => setSelectedPriority(3)}
        >
          <FlagRounded fontSize="small" className="text-blue-500" />
          <div>Priority 3</div>
        </div>
        <Divider />
        <div
          className="flex flex-row gap-1 justify-center items-center py-2 hover:bg-slate-100 rounded-b-md"
          itemType="button"
          onClick={() => setSelectedPriority(4)}
        >
          <OutlinedFlagRounded fontSize="small" />
          <div>Priority 4 </div>
        </div>
      </div>
    </div>
  );
}
