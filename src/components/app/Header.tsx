import { Divider, Link } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <div className="flex flex-row justify-between px-20 py-4 bg-emerald-400 text-lime-50 items-center fixed w-full z-30">
      <h1 className="text-3xl font-bold">Buzzy</h1>
      <div className="flex flex-row gap-6 items-center justify-center font-semibold">
        <Link href="/" underline="always" sx={{ color: "white" }}>
          Home
        </Link>
        <Link href="/dashboard" underline="always" sx={{ color: "white" }}>
          Dashboard
        </Link>
        <Divider orientation="vertical" />
        <a
          href="/login"
          className="px-5 py-1.5 bg-purple-500 hover:bg-purple-400 active:bg-purple-600 duration-200 rounded-md shadow-lg cursor-pointer hover:ring-1 hover:ring-purple-400"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-5 py-1.5 hover:bg-purple-400 active:bg-purple-600 duration-200 rounded-md shadow-lg cursor-pointer ring-1 ring-purple-800 hover:ring-0 text-gray-600 hover:text-white"
        >
          Signup
        </a>
      </div>
    </div>
  );
}
