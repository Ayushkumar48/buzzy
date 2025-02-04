import React from "react";
import { useLayoutToggleStore } from "../store/layoutToggle";

export default function Content({ children }: { children: React.ReactNode }) {
  const layoutToggle = useLayoutToggleStore((state) => state.layoutToggle);
  return (
    <div
      className={`h-full transition-all duration-500 ml-auto text-center ${
        layoutToggle ? "w-[80%]" : "w-full"
      }`}
    >
      {children}
    </div>
  );
}
