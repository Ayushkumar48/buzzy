"use client";
import {
  AddRounded,
  KeyboardArrowDownRounded,
  TagRounded,
} from "@mui/icons-material";
import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AddProject from "./AddProject";
import { useOpenAddProjectStore } from "../store/openAddProject";
import { useToggleProjectsStore } from "../store/toggleProjects";
import { useProjectsStore } from "../store/projects";

export default function Projects() {
  const { toggleProjects, setToggleProjects } = useToggleProjectsStore();
  const { openAddProject, setOpenAddProject } = useOpenAddProjectStore();
  const { projects } = useProjectsStore();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenAddProject(false);
      }
    }

    if (openAddProject) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenAddProject, openAddProject]);

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
          {openAddProject && (
            <div className="fixed flex justify-center items-center w-screen h-screen top-0 left-0 z-30 bg-black/30">
              <div ref={modalRef}>
                <AddProject />
              </div>
            </div>
          )}
          <button onClick={() => setOpenAddProject(true)}>
            <AddRounded className="hover:bg-slate-300 rounded-md" />
          </button>
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
        {projects?.map((item, i) => (
          <Link
            href={item}
            key={i}
            className={`flex flex-row gap-4 px-2 py-1.5 items-center rounded-lg ${
              pathname === item ? "bg-[#CCFBF1]" : "hover:bg-[#F2EFED]"
            }`}
          >
            <TagRounded
              className={`${
                pathname === item ? "text-emerald-500" : "text-gray-500"
              }`}
            />
            <div>
              {item
                ?.split("/")
                .pop()
                ?.split("-")
                .map((a) => a[0].toUpperCase() + a.slice(1))
                .join(" ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
