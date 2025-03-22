import { LuLoader } from "react-icons/lu";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <LuLoader className="rotate-180 animate-spin transition duration-300" />
    </div>
  );
};

export default Loading;
