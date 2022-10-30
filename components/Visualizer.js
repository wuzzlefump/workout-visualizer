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
const Canvas2 = dynamic(() => import("./Canvas2"), { ssr: false });

function Visualizer({ workout, likes, session }) {
  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>
        {!window.chrome && (
          <Canvas session={session} likes={likes} workout={workout} />
        )}
        {window.chrome && (
          <Canvas2 session={session} likes={likes} workout={workout} />
        )}
      </Suspense>
    </div>
  );
}

export default Visualizer;
