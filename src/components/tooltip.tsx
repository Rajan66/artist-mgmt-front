"use client";

import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ children, text, position = "top" }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={` absolute z-10 px-3 py-2 text-sm font-medium text-primary bg-primary/30 rounded-lg shadow-md transition-opacity duration-300 ${
            position === "top"
              ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2"
              : position === "bottom"
                ? "top-full mt-2 left-1/2 transform -translate-x-1/2"
                : position === "left"
                  ? "right-full mr-2 top-1/2 transform -translate-y-1/2"
                  : "left-full ml-2 top-1/2 transform -translate-y-1/2"
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
