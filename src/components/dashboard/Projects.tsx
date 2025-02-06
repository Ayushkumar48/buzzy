"use client";
import {
  AddRounded,
  BorderColorRounded,
  DeleteOutlineRounded,
  KeyboardArrowDownRounded,
  MoreHorizRounded,
  TagRounded,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AddProject from "./AddProject";
import { useProjectsStore } from "../store/projects";
import { Popover } from "@base-ui-components/react/popover";
import { Divider } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import { getProjectsAPI } from "@/app/api/projects/projectsQuery";

export default function Projects() {
  const [toggleProjects, setToggleProjects] = useState(true);
  const { projects, deleteProject, setProjects } = useProjectsStore(
    useShallow((state) => ({
      projects: state.projects,
      deleteProject: state.deleteProject,
      setProjects: state.setProjects,
    }))
  );
  const pathname = usePathname().split("/").pop();
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsAPI,
    staleTime: 1000 * 60 * 10,
  });
  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, setProjects]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-row gap-4 px-2 py-1.5 justify-between items-center rounded-lg group ${
          pathname === "/dashboard/projects"
            ? "bg-[#CCFBF1]"
            : "hover:bg-[#F2EFED]"
        }`}
      >
        <Link href="/dashboard/projects" className="font-bold text-gray-700">
          My Projects
        </Link>
        <div className="group-hover:block text-gray-600">
          <AddProject data={undefined}>
            <AddRounded className="hover:bg-slate-300 rounded-md" />
          </AddProject>

          <button onClick={() => setToggleProjects(!toggleProjects)}>
            <KeyboardArrowDownRounded
              className={`hover:bg-slate-300 rounded-md transform transition-transform duration-500 ease-in-out ${
                toggleProjects ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg h-80
    ${
      toggleProjects
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-5 pointer-events-none"
    }
  `}
      >
        {projects?.map((item) => (
          <div
            key={item.id}
            className={`flex flex-row group justify-between px-2 py-1.5 items-center rounded-lg ${
              pathname === item.name.split(" ").join("2%c").toLowerCase()
                ? "bg-[#CCFBF1]"
                : "hover:bg-[#F2EFED]"
            }`}
          >
            <Link
              href={`/dashboard/projects/${item.name
                .split(" ")
                .join("2%c")
                .toLowerCase()}`}
              className="flex flex-row gap-4"
            >
              <TagRounded style={{ color: item.color }} />
              <div>{item.name}</div>
            </Link>
            <Popover.Root>
              <Popover.Trigger className="outline-none">
                <MoreHorizRounded className="text-gray-500 hover:bg-slate-200 rounded invisible group-hover:visible p-0.5 cursor-pointer" />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner
                  sideOffset={5}
                  align="start"
                  side="right"
                  className="outline-none"
                >
                  <Popover.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] overflow-hidden text-gray-900 shadow-lg shadow-gray-200 outline outline-1 w-36 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                    <Popover.Description className="px-3 py-2 gap-x-2 flex items-center hover:bg-slate-100 outline-none">
                      <AddProject data={item}>
                        <BorderColorRounded fontSize="small" /> Edit
                      </AddProject>
                    </Popover.Description>
                    <Divider />
                    <Popover.Description
                      className="px-3 py-2 outline-none flex gap-x-2 items-center hover:bg-slate-100 cursor-pointer"
                      onClick={() => deleteProject(item)}
                    >
                      <DeleteOutlineRounded
                        className="text-red"
                        fontSize="small"
                      />{" "}
                      Delete
                    </Popover.Description>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </div>
        ))}
      </div>
    </div>
  );
}
