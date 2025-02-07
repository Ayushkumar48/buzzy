"use client";
import { useProjectsStore } from "@/components/store/projects";
import { task } from "@/components/store/types";
import { Menu } from "@base-ui-components/react/menu";
import {
  AccountCircleTwoTone,
  AllInboxRounded,
  KeyboardArrowDownRounded,
  TagRounded,
} from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

export default function Where({
  task,
  setTask,
}: {
  task: task;
  setTask: Dispatch<SetStateAction<task>>;
}) {
  const projects = useProjectsStore((state) => state.projects);

  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center items-center text-sm hover:bg-[#A7F3D0] duration-200 px-2.5 py-1 rounded-lg ease-in-out outline-none">
        <div className="flex flex-row justify-center items-center gap-1">
          {task.saveTo === "Inbox" ? (
            <AllInboxRounded className="opacity-75" fontSize="small" />
          ) : (
            <TagRounded className="opacity-65" fontSize="small" />
          )}
          {task.saveTo}
        </div>
        <span>
          <KeyboardArrowDownRounded className="opacity-55" />
        </span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-none" sideOffset={8}>
          <Menu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 w-72">
            <div className="w-full p-3">
              <input
                type="text"
                name="project"
                autoFocus
                id="project"
                className="rounded-md pl-2 h-8 outline-none ring-1 ring-gray-300 w-full"
                placeholder="Type a project name..."
                autoComplete="off"
              />
            </div>

            <div
              className="h-52 overflow-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg"
            >
              <Menu.CheckboxItem
                closeOnClick
                className="flex cursor-pointer w-full flex-row gap-2 px-2 py-1.5 items-center rounded-lg hover:bg-[#F2EFED] outline-none"
                onClick={() =>
                  setTask((prev) => ({
                    ...prev,
                    saveTo: "Inbox",
                    projectId: null,
                  }))
                }
                title="Inbox"
              >
                <AllInboxRounded className="opacity-75" />
                <div>Inbox</div>
              </Menu.CheckboxItem>
              <div className="flex flex-col">
                <h5 className="px-2 py-1.5 flex flex-row gap-2 items-center">
                  <AccountCircleTwoTone
                    sx={{ fontSize: 25 }}
                    className="opacity-65"
                  />
                  <span className="font-bold" title="My Projects">
                    My Projects
                  </span>
                </h5>
                {projects.map((item, i) => (
                  <Menu.CheckboxItem
                    closeOnClick
                    key={i}
                    className="pl-8 flex w-full flex-row gap-2 items-center pr-2 py-1.5 rounded-lg hover:bg-[#F2EFED] cursor-pointer outline-none overflow-x-clip"
                    title={item.name}
                    onClick={() =>
                      setTask((prev) => ({
                        ...prev,
                        saveTo: item.name,
                        projectId: item.id,
                      }))
                    }
                  >
                    <TagRounded className="opacity-65" />
                    <div className="w-[20ch] truncate">{item.name}</div>
                  </Menu.CheckboxItem>
                ))}
              </div>
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
