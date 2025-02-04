import { useSelectedColorStore } from "@/components/store/selectedColor";
import React, { useState, useEffect, useRef } from "react";

export default function ColorPalette() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { selectedColor, setSelectedColor } = useSelectedColorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "Berry Red", color: "bg-[#b8255f]" },
    { value: "Red", color: "bg-[#cf473a]" },
    { value: "Orange", color: "bg-[#c77100]" },
    { value: "Yellow", color: "bg-[#b29104]" },
    { value: "Olive Green", color: "bg-[#949c31]" },
    { value: "Lime Green", color: "bg-[#65a33a]" },
    { value: "Green", color: "bg-[#369307]" },
    { value: "Mint Green", color: "bg-[#42a393]" },
    { value: "Teal", color: "bg-[#148fad]" },
    { value: "Sky Blue", color: "bg-[#319dc0]" },
    { value: "Light Blue", color: "bg-[#6988a4]" },
    { value: "Blue", color: "bg-[#2a67e2]" },
    { value: "Grape", color: "bg-[#692ec2]" },
    { value: "Violet", color: "bg-[#ac30cc]" },
    { value: "Lavender", color: "bg-[#a4698c]" },
    { value: "Magenta", color: "bg-[#e05095]" },
    { value: "Salmon", color: "bg-[#b2635c]" },
    { value: "Charcoal", color: "bg-[#808080]" },
    { value: "Grey", color: "bg-[#999999]" },
    { value: "Taupe", color: "bg-[#8f7a69]" },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="outline-none ring-1 py-1 ring-slate-300 pl-2 h-9 rounded-md flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-4 h-4 rounded-full ${
            options.find((opt) => opt.value === selectedColor)?.color
          } mr-2`}
        ></div>
        {selectedColor}
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-slate-300 rounded-md shadow-lg first:rounded-t-md last:rounded-b-md h-40 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-2 py-1 hover:bg-slate-100 cursor-pointer"
              onClick={() => {
                setSelectedColor(option.value);
                setIsOpen(false);
              }}
            >
              <div
                className={`w-4 h-4 rounded-full ${option.color} mr-2`}
              ></div>
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
