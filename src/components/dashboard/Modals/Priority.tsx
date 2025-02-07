"use client";
import { FlagRounded, OutlinedFlagRounded } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { Menu } from "@base-ui-components/react/menu";
import { Dispatch, SetStateAction } from "react";
import { task } from "@/components/store/types";

export default function Priority({
  task,
  setTask,
}: {
  task: task;
  setTask: Dispatch<SetStateAction<task>>;
}) {
  const priorities: string[] = ["text-red", "text-yellow", "text-blue"];

  return (
    <Menu.Root>
      <Menu.Trigger className="text-xs outline-none ring-1  hover:bg-emerald-200 cursor-pointer ring-gray-200 rounded-md w-20 relative flex justify-center flex-row gap-1 items-center h-7">
        {task.priority === 4 ? (
          <>
            <OutlinedFlagRounded fontSize="small" />
            Priority
          </>
        ) : (
          <>
            <FlagRounded
              fontSize="small"
              className={priorities[task.priority - 1]}
            />
            <div>P{task.priority}</div>
          </>
        )}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-none" sideOffset={8}>
          <Menu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline-none ring-1 ring-gray-300 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none">
            {priorities.map((item, i) => (
              <div key={i}>
                <Menu.CheckboxItem
                  className="flex cursor-pointer flex-row gap-1 justify-center items-center py-3 hover:bg-slate-100 rounded-t-md text-sm px-4 outline-none"
                  itemType="button"
                  onClick={() =>
                    setTask((prev) => ({
                      ...prev,
                      priority: (i + 1) as 1 | 2 | 3,
                    }))
                  }
                  closeOnClick
                >
                  <FlagRounded fontSize="small" className={item} />
                  <div>Priority {i + 1}</div>
                </Menu.CheckboxItem>
                <Divider key={`divider-${i}`} />
              </div>
            ))}

            <Menu.CheckboxItem
              className="flex flex-row gap-1 cursor-pointer justify-center items-center py-3 hover:bg-slate-100 rounded-b-md text-sm px-4"
              itemType="button"
              onClick={() =>
                setTask((prev) => ({
                  ...prev,
                  priority: 4,
                }))
              }
              closeOnClick
            >
              <OutlinedFlagRounded fontSize="small" />
              <div>Priority 4 </div>
            </Menu.CheckboxItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
