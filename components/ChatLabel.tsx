import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets.js";

const ChatLabel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm cursor-pointer overflow-visible">
      <p className="group-hover:max-w-[83%] truncate">Chat Name Here</p>
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg"
          aria-label="Chat options"
        >
          <Image src={assets.three_dots} alt="" className="w-4" />
        </button>
        <div
          className={`absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 z-50 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } transition`}
        >
          <button
            type="button"
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg w-full text-left"
          >
            <Image src={assets.pencil_icon} alt="" className="w-4" />
            <p>Rename</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg w-full text-left"
          >
            <Image src={assets.delete_icon} alt="" className="w-4" />
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
