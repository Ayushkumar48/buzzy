import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useState,
} from "react";
import { Menu } from "@base-ui-components/react/menu";

export default function ColorPalette({
  project,
  setProject,
  options,
}: {
  project: { name: string; colorName: string; color: string };
  setProject: Dispatch<
    SetStateAction<{ name: string; colorName: string; color: string }>
  >;
  options: {
    value: string;
    color: string;
  }[];
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState("auto");

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, []);

  return (
    <Menu.Root openOnHover={false}>
      <Menu.Trigger
        ref={triggerRef}
        className="outline-none ring-1 py-1 ring-slate-300 pl-2 h-9 rounded-md flex items-center cursor-pointer w-full"
        type="button"
      >
        <div
          className="w-4 h-4 rounded-full mr-2"
          style={{
            backgroundColor:
              options.find((opt) => opt.value === project.colorName)?.color ||
              "#000",
          }}
        ></div>
        {project.colorName}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-none" sideOffset={8}>
          <Menu.Popup
            style={{ minWidth: triggerWidth }}
            className="origin-[var(--transform-origin)] bg-[canvas] py-1 text-gray-900 shadow-gray-200 outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg w-full bg-white border border-slate-300 rounded-md shadow-lg"
          >
            {options.map((option) => (
              <Menu.CheckboxItem
                closeOnClick
                key={option.value}
                className="flex items-center px-2 py-1 hover:bg-slate-100 cursor-pointer outline-none"
                onClick={() =>
                  setProject({ ...project, colorName: option.value })
                }
              >
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: option.color }}
                ></div>
                {option.value}
              </Menu.CheckboxItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
