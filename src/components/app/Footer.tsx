import React from "react";

export default function Footer() {
  return (
    <div
      className="py-16 px-20 justify-center items-center bg-gradient-to-br from-[#85FFBD] to-[#FFFB7D]
 w-full flex flex-col gap-4 text-gray-700"
    >
      <div className="max-w-[30rem]">
        <h2 className="text-[3rem] font-bold text-[#667f87]">Buzzy</h2>

        <h4 className="text-3xl font-bold">
          Simplify your tasks, amplify your productivity.
        </h4>

        <div className="text-xl font-semibold">
          Join a thriving community of professionals who master their work-life
          balance every day!
        </div>
      </div>
    </div>
  );
}
