import { logout } from "@/db";
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
    <div className="absolute  top-10 z-20 bg-white ring-1 ring-gray-300 shadow-xl rounded-md w-[20vw]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 px-2 pt-4">
          <h2 className="text-lg font-bold px-2 py-1.5">Ayushkumar48</h2>
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
      </div>
    </div>
  );
}
