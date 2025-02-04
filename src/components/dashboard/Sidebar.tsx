"use client";
import {
  AccountCircleTwoTone,
  AddCircleRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import NavLi from "./NavLi";
import Add from "./Modals/Add";
import Projects from "./Projects";
import { useAddTaskOpenStore } from "../store/addTaskOpen";
import { useLayoutToggleStore } from "../store/layoutToggle";
import AccountPopup from "./Modals/AccountPopup";

export default function Sidebar() {
  const { layoutToggle, setLayoutToggle } = useLayoutToggleStore();
  const { addTaskOpen, setAddTaskOpen } = useAddTaskOpenStore();
  const [openProfile, setOpenProfile] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        openProfile &&
        !profileRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpenProfile(false);
      }

      if (addTaskOpen && !modalRef.current?.contains(target)) {
        setAddTaskOpen(false);
      }
    },
    [openProfile, addTaskOpen, setAddTaskOpen]
  );
  useEffect(() => {
    if (openProfile || addTaskOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openProfile, addTaskOpen, handleClickOutside]);
  const handleAccountPopup = useCallback(() => {
    setOpenProfile((prev) => !prev);
  }, []);

  return (
    <>
      <div
        className={`bg-[#ccfbf16d] w-1/5 h-screen flex flex-col py-4 px-2 gap-3 -translate-x-full transition-transform duration-500 ${
          layoutToggle ? "translate-x-0" : ""
        } absolute left-0 top-0`}
      >
        <div className="flex flex-row gap-1 justify-between items-center">
          <div className="flex justify-center items-center gap-2 flex-row hover:bg-[#ccfbf1] px-2 py-1.5 rounded-lg">
            <div className="relative">
              <button
                ref={buttonRef}
                className="flex justify-center items-center gap-2 flex-row"
                onClick={handleAccountPopup}
              >
                <AccountCircleTwoTone
                  sx={{ fontSize: 25 }}
                  className="opacity-65"
                />
                <div className="flex flex-row gap-0.5 justify-center items-center">
                  <span className="w-[13ch] truncate">Ayushkumardwe48</span>
                  <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
                </div>
              </button>
              {openProfile && (
                <div ref={profileRef}>
                  <AccountPopup />
                </div>
              )}
            </div>
          </div>

          <button className="w-10 h-10 hover:bg-[#ccfbf1] rounded-lg p-1.5">
            <Image
              src="/bell.svg"
              alt="bell"
              className="w-full h-full opacity-65"
              width={40}
              height={40}
            />
          </button>
          <button
            className="w-10 h-10 rounded-lg hover:bg-[#ccfbf1] p-1.5"
            onClick={() => setLayoutToggle(!layoutToggle)}
          >
            <Image
              src="/toggler.svg"
              alt="toggler"
              className="w-full h-full opacity-65"
              width={40}
              height={40}
            />
          </button>
        </div>

        {addTaskOpen && (
          <div className="fixed top-0 left-0 w-screen flex justify-center items-center h-screen z-50">
            <div ref={modalRef}>
              <Add />
            </div>
          </div>
        )}

        <button
          className="flex flex-row gap-4 hover:bg-[#ccfbf1] active:scale-[0.97] duration-500 ease-in-out px-2 py-1.5 items-center rounded-lg"
          onClick={() => setAddTaskOpen(true)}
        >
          <AddCircleRounded className="text-emerald-500" />
          <div className="font-bold text-emerald-800">Add Task</div>
        </button>

        <NavLi />
        <Projects />
      </div>

      <div
        className={`absolute top-2 left-2 p-2 ${
          layoutToggle ? "opacity-0 -z-20" : "opacity-100 z-20"
        } duration-500 ease-in-out`}
      >
        <button
          className="w-9 h-9 rounded-lg hover:bg-[#ccfbf1] p-1.5"
          onClick={() => setLayoutToggle(!layoutToggle)}
        >
          <Image
            src="/toggler.svg"
            alt="toggler"
            className="w-full h-full opacity-65"
            width={40}
            height={40}
          />
        </button>
      </div>
    </>
  );
}
