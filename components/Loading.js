import { Circle } from "better-react-spinkit";

import React from "react";

function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-800  ">
      <div className={" mt-52"}>
        <Circle color={"white"} size={60} />
        <p className="font-semibold text-lg text-gray-200">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
