import React from "react";

import { LuLoader } from "react-icons/lu";

const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <LuLoader className="rotate-180 animate-spin transition duration-300" />
    </div>
  );
};

export default Loading;
