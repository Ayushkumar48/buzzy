"use client";
import { AccountCircle } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Link from "next/link";
import { logout } from "@/db";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import MyProfile from "@/components/profile/Profile";

export default function Profile() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function handleLogout() {
    startTransition(async () => {
      await logout();
      toast.success("Logged out successfully.");
    });
    router.replace("/");
  }
  const data2 = [
    {
      href: "#",
      menuItem: "Edit Profile",
    },
    {
      href: "#",
      menuItem: "Settings",
    },
  ];
  return (
    <div className="group relative cursor-pointer flex justify-center items-center">
      <a className="menu-hover text-gray-700">
        <AccountCircle sx={{ fontSize: 32 }} />
      </a>

      <div className="invisible absolute left-0 right-0 h-12 group-hover:visible w-48" />

      <div className="invisible absolute top-10 z-50 left-1/2 -translate-x-1/2 flex gap-[2px] rounded-lg px-2 py-1 flex-col w-48 bg-gray-100 text-gray-800 shadow-xl group-hover:visible">
        <div className="block border-b border-gray-100 py-1 text-lg text-gray-500 hover:text-black md:mx-2">
          <div className="text-black font-bold">Ayushkumar48</div>
          <MyProfile>
            <div className="text-[15px] text-gray-400">View Profile</div>
          </MyProfile>
        </div>

        <Divider />
        {data2.map((item, i) => (
          <MyProfile key={i}>
            <div className="border-b border-gray-100 py-1 font-[550] text-[16px] text-gray-500 hover:text-black md:mx-2 flex">
              {item.menuItem}
            </div>
          </MyProfile>
        ))}
        <Divider />
        <div>
          <button
            className="block border-b border-gray-100 py-1 font-[550] text-[16px] text-gray-500 hover:text-black md:mx-2"
            onClick={handleLogout}
            disabled={isPending}
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  );
}
