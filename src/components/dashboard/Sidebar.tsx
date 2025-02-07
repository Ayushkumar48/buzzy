"use client";

import Image from "next/image";
import NavLi from "./NavLi";
import Add from "./Modals/Add";
import Projects from "./Projects";
import { useLayoutToggleStore } from "../store/layoutToggle";
import AccountPopup from "./Modals/AccountPopup";
import { AddCircleRounded } from "@mui/icons-material";

export default function Sidebar() {
  const { layoutToggle, setLayoutToggle } = useLayoutToggleStore();

  return (
    <>
      <div
        className={`bg-[#ccfbf16d] w-1/5 h-screen flex flex-col py-4 px-2 gap-3 -translate-x-full transition-transform duration-500 ${
          layoutToggle ? "translate-x-0" : ""
        } fixed left-0 top-0`}
      >
        <div className="flex flex-row gap-1 justify-between items-center">
          <AccountPopup />

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

        <Add data={undefined} saveTo="Inbox">
          <div className="flex flex-row gap-4 hover:bg-[#ccfbf1] active:scale-[0.97] duration-500 ease-in-out px-2 py-1.5 items-center rounded-lg">
            <AddCircleRounded className="text-emerald-500" />
            <div className="font-bold text-emerald-800">Add Task</div>
          </div>
        </Add>

        <NavLi />
        <Projects />
      </div>

      <div
        className={`fixed top-2 left-2 p-2 ${
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
