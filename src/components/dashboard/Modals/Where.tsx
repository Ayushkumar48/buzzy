"use client";
import { useOpenProjectStore } from "@/components/store/openProject";
import {
  AccountCircleTwoTone,
  AllInboxRounded,
  KeyboardArrowDownRounded,
  TagRounded,
} from "@mui/icons-material";
import React, { useEffect, useRef } from "react";

export default function Where() {
  const { openProject, setOpenProject } = useOpenProjectStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenProject(false);
      }
    }

    if (openProject) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProject, setOpenProject]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex justify-center items-center text-sm hover:bg-[#A7F3D0] duration-200 px-2.5 py-1 rounded-lg ease-in-out"
        onClick={() => setOpenProject(!openProject)}
      >
        #Related To{" "}
        <span>
          <KeyboardArrowDownRounded className="opacity-55" />
        </span>
      </button>

      {openProject && (
        <div className="w-60 ring-1 ring-gray-200 rounded-lg shadow-lg bg-white absolute left-1/2 -translate-x-1/2 top-10">
          <div className="w-full p-3">
            <input
              type="text"
              name="project"
              autoFocus
              id="project"
              className="rounded-md pl-2 h-8 outline-none ring-1 ring-gray-300 w-full"
              placeholder="Type a project name..."
            />
          </div>

          <div
            className="h-36 overflow-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg"
          >
            <button className="flex w-full flex-row gap-2 px-2 py-1.5 items-center rounded-lg hover:bg-[#F2EFED]">
              <AllInboxRounded className="opacity-75" />
              <div>Inbox</div>
            </button>
            <div className="flex flex-col">
              <h5 className="px-2 py-1.5 flex flex-row gap-2 items-center">
                <AccountCircleTwoTone
                  sx={{ fontSize: 25 }}
                  className="opacity-65"
                />
                <span className="font-bold">My Projects</span>
              </h5>
              <button className="pl-8 flex w-full flex-row gap-2 items-center pr-2 py-1.5 rounded-lg hover:bg-[#F2EFED]">
                <TagRounded className="opacity-65" /> Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
