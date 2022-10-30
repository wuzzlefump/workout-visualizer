import React, { useEffect, useState } from "react";
import { TLike, TPlaylist, TSession, TWorkout } from "../typings";
import {
  CountdownCircleTimer,
  useCountdown,
} from "react-countdown-circle-timer";
import dynamic from "next/dynamic";
const Visualizer = dynamic(() => import("./Visualizer"), { ssr: false });
// import Visualizer from "./Visualizer";

interface Props {
  playlists: TPlaylist;
  likes?: TLike[];
  workout: TWorkout;
  session: TSession;
}

function WorkoutPageBody({ playlists, workout, likes, session }: Props) {
  console.log(playlists);

  const AudioUrl = (asset: any) => {
    const ref = asset?.asset?._ref;
    const assetRefParts = ref?.split("-");
    const id = assetRefParts ? assetRefParts[1] : undefined;
    const format = assetRefParts ? assetRefParts[2] : undefined;
    const assetUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${format}`;
    return assetUrl;
  };

  console.log(AudioUrl(playlists?.songs[0]?.audio));

  return (
    <div>
      <div className="" id="visualizer">
        <Visualizer session={session} likes={likes} workout={workout} />
      </div>
    </div>
  );
}

export default WorkoutPageBody;
