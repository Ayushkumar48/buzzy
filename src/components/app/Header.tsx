import { Divider, Link as A } from "@mui/material";
import Link from "next/link";

import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/db";
import { Slide, ToastContainer } from "react-toastify";
import Profile from "./Profile";

export default async function Header() {
  let username: string = "";
  const session = (await cookies()).get("session")?.value;
  if (session) {
    const res = await decrypt(session);
    username = res.username;
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="flex flex-row justify-between pr-24 pl-20 py-3 bg-emerald-400 text-gray-700 items-center fixed w-full z-30">
        <Link href={"/"}>
          <h1 className="text-5xl font-extrabold text-violet-800">Buzzy</h1>
        </Link>
        <div className="flex flex-row gap-6 items-center justify-center font-bold text-xl">
          <A href="/" underline="always" sx={{ color: "#4b5563" }}>
            Home
          </A>
          <A href="/dashboard" underline="always" sx={{ color: "#4b5563" }}>
            Dashboard
          </A>
          <A href="/" underline="always" sx={{ color: "#4b5563" }}>
            Contact Us
          </A>
          {username ? null : <Divider orientation="vertical" />}
          {username ? (
            <Profile />
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-1.5 bg-purple-500 active:bg-purple-600 duration-200 rounded-md shadow-lg cursor-pointer hover:ring-1 hover:ring-purple-400 hover:scale-[1.02]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-1.5 hover:bg-purple-400 active:bg-purple-600 duration-200 rounded-md shadow-lg cursor-pointer ring-1 ring-purple-800 hover:ring-0 text-gray-600 hover:text-white"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
