import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-1/2">
        <Image
          src={"/desk.jpg"}
          height={500}
          width={500}
          className="w-full h-full"
          alt="desk"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center flex-col bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="w-96 bg-slate-100 h-80 rounded-lg shadow-sm px-4 ring-1 ring-gray-300 flex justify-center items-center gap-2 flex-col bg-gradient-to-r from-green-300 to-purple-400 text-slate-600">
          <div className="text-4xl font-bold">
            Managing your tasks is easy now!
          </div>
          <div className="text-lg font-semibold">
            Try our newly created, personal task manager and seamlessly manage
            your tasks.
          </div>
          <div className="w-full flex flex-row justify-start">
            <a
              href="/login"
              className="px-5 py-1.5 bg-purple-500 hover:bg-purple-400 active:bg-purple-600 duration-200 rounded-md shadow-lg cursor-pointer hover:ring-1 hover:ring-purple-400 text-white"
            >
              Signup for free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
