import dynamic from "next/dynamic";
import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  Suspense,
  lazy,
} from "react";
import Loading from "./Loading";

const Canvas = dynamic(() => import("./Canvas"), { ssr: false });

function Visualizer({ workout, likes, session }) {
  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>
        {!window.chrome && (
          <Canvas session={session} likes={likes} workout={workout} />
        )}
        {window.chrome && (
          <p className="h-screen w-[100%] flex flex-col text-center justify-center items-center text-semibold">
            unfortunately audio visualizer does not run on Chrome, please try
            using another browser like firefox{" "}
          </p>
        )}
      </Suspense>
    </div>
  );
}

export default Visualizer;
