import { useRouter } from "next/router";
import React, { useState } from "react";
import { TWorkout, TLike, TSession } from "../typings";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { urlFor } from "../sanity";
import Image from "next/image";
import Switch from "react-switch";

// import {}from "../typings"

interface Props {
  workouts: TWorkout[];
  likes?: TLike[];
  session?: TSession;
}

function WorkoutSidebar({ workouts, likes, session }: Props) {
  const [search, setSearch] = useState("");
  const [likeToggle, setLikeToggle] = useState<boolean>(false);
  const router = useRouter();

  const filteredWorkouts = (search: string) => {
    if (!search || search.length < 1) {
      return workouts;
    } else {
      return workouts.filter((x) =>
        x.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const filterLiked = (workouts: TWorkout[], likes?: TLike[]) => {
    if (likeToggle) {
      let likesMap =
        likes!
          .filter((x: any) => {
            return x.user.username === session?.name;
          })
          .map((x: any) => x.workout.title) || [];
      return workouts.filter((x) => likesMap.includes(x.title));
    } else {
      return workouts;
    }
  };

  return (
    <div className="flex-[0.45]  min-h-[screen] h-[fill]  min-w-[300] w-[100%] sm:max-w-[350] overflow-y-auto">
      <div className="flex border-t border-b items-center space-x-2 p-[20px]">
        <MagnifyingGlassCircleIcon className="h-8 w-8 text-gray-400" />
        <input
          className={`bg-inherit text-gray-400 border-none flex-1 ring-0 outline-none`}
          placeholder="Search your workouts ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {session && (
        <div className="flex flex-col space-y-2 border-t border-b items-center space-x-2 p-[20px] text-gray-400">
          <p>Liked Only</p>
          <Switch
            uncheckedIcon={false}
            checkedIcon={false}
            checked={likeToggle}
            onColor="#00FFFF"
            onChange={setLikeToggle}
          />
        </div>
      )}

      {filterLiked(filteredWorkouts(search), likes)?.map((x) => {
        return (
          <div
            onClick={() => router.push("/dashboard/" + x._id)}
            key={x._id}
            className="w-[100%] border-b border-b-slate-200 p-3 flex items-center hover:bg-gray-700 cursor-pointer"
          >
            <h1 className="flex-1 text-gray-400">{x.title}</h1>

            <Image
              src={urlFor(x.mainImage).url()!}
              alt={x.slug}
              height={40}
              width={40}
              className={"rounded-full border border-slate-200"}
            />
          </div>
        );
      })}
    </div>
  );
}

export default WorkoutSidebar;
