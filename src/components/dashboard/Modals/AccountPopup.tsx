"use client";
import { getUsername, logout } from "@/db";
import { Popover } from "@base-ui-components/react";
import {
  AccountCircleTwoTone,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { Divider } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Profile from "@/components/profile/Profile";

export default function AccountPopup() {
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      setUsername(await getUsername());
    };
    fetchUser();
  }, []);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function handleLogout() {
    startTransition(async () => {
      await logout();
      toast.success("Logged out successfully.");
    });
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  }
  return (
    <Popover.Root>
      <Popover.Trigger className="flex justify-center items-center gap-2 flex-row hover:bg-[#ccfbf1] px-2 py-1.5 rounded-lg outline-none">
        <AccountCircleTwoTone sx={{ fontSize: 25 }} className="opacity-65" />
        <div className="flex flex-row gap-0.5 justify-center items-center">
          <span className="w-[13ch] truncate">{username}</span>
          <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="origin-[var(--transform-origin)] rounded-lg bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 flex flex-col w-60">
            <div className="flex flex-col px-0 pt-4">
              <Popover.Title className="text-lg font-bold px-4 pb-2 max-w-[ch] truncate">
                {username}
              </Popover.Title>
              <Divider />
              <Profile>
                <div className="text-gray-500 font-bold px-4 py-2 hover:bg-neutral-200 ease-in-out duration-300 w-full text-left">
                  Profile
                </div>
              </Profile>
            </div>
            <Divider />
            <div>
              <Link
                href="/"
                className="w-full px-4 py-2 hover:bg-neutral-200 ease-in-out duration-300 flex disabled:cursor-not-allowed"
              >
                Home
              </Link>
              <Divider />
              <button
                onClick={handleLogout}
                className="px-4 w-full rounded-b-md py-2 hover:bg-neutral-200 ease-in-out duration-300 flex disabled:cursor-not-allowed"
                disabled={isPending}
              >
                Log out
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
