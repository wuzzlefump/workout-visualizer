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
  const detectBrowser = () => {
    var isOpera =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== "undefined";

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
          (typeof safari !== "undefined" && window["safari"].pushNotification)
      );

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return isBlink ? (
      <Canvas2 session={session} likes={likes} workout={workout} />
    ) : isEdgeChromium ? (
      <Canvas2 session={session} likes={likes} workout={workout} />
    ) : isChrome ? (
      <Canvas2 session={session} likes={likes} workout={workout} />
    ) : isEdge ? (
      <Canvas session={session} likes={likes} workout={workout} />
    ) : isIE ? (
      <Canvas2 session={session} likes={likes} workout={workout} />
    ) : isSafari ? (
      <Canvas2 session={session} likes={likes} workout={workout} />
    ) : isFirefox ? (
      <Canvas session={session} likes={likes} workout={workout} />
    ) : (
      <Canvas2 session={session} likes={likes} workout={workout} />
    );
  };

  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>{detectBrowser()}</Suspense>
    </div>
  );
}

export default Visualizer;
