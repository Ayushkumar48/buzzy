import { logout } from "@/db";
import { Popover } from "@base-ui-components/react";
import {
  AccountCircleTwoTone,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { Divider } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "react-toastify";

export default function AccountPopup() {
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
          <span className="w-[13ch] truncate">Ayushkumardwe48</span>
          <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="origin-[var(--transform-origin)] rounded-lg bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 flex flex-col gap-2 w-60">
            <div className="flex flex-col gap-2 px-2 pt-4">
              <Popover.Title className="text-lg font-bold px-2 py-1.5">
                Ayushkumar48
              </Popover.Title>
              <Link
                href="/profile"
                className="text-gray-500 font-bold rounded-md px-2 py-1.5 hover:bg-neutral-200 ease-in-out duration-300"
              >
                Profile
              </Link>
            </div>
            <Divider />
            <button
              onClick={handleLogout}
              className="mx-2 rounded-md px-2 py-1.5 mb-2.5 hover:bg-neutral-200 ease-in-out duration-300 flex disabled:cursor-not-allowed"
              disabled={isPending}
            >
              Log out
            </button>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
