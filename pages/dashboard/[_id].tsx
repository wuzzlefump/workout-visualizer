import { getSession } from "next-auth/react";
import React from "react";
import Header from "../../components/Header";
import WorkoutPageBody from "../../components/WorkoutPageBody";
import WorkoutSidebar from "../../components/WorkoutSidebar";
import { sanityClient } from "../../sanity";
import {
  TExercise,
  TExerciseType,
  TLike,
  TPlaylist,
  TSession,
  TWorkout,
} from "../../typings";

interface Props {
  session: TSession;
  workouts: TWorkout[];
  likes: TLike[];
  playlists: TPlaylist[];
  currentWorkout?: TWorkout;
}

function SpecificWorkout({ currentWorkout, session, workouts, likes }: Props) {
  //   console.log({ workouts });
  //   console.log({ playlists });
  console.log(currentWorkout);
  return (
    <div className="h-screen bg-gray-800 overflow-y-auto">
      <Header session={session} />
      <div className="flex">
        <div className="hidden sm:grid min-w-[100%] sm:min-w-[300px] max-w-[350px] sm:border-r  max-h-[97vh]  overflow-auto ">
          <WorkoutSidebar session={session} workouts={workouts} likes={likes} />
        </div>
        <div className="text-blue-200 min-h-[94vh] h-fit border-l border-l-slate-100 text-center flex-1 ove">
          {currentWorkout ? (
            <WorkoutPageBody
              session={session}
              workout={currentWorkout}
              playlists={currentWorkout?.playlist}
              likes={likes}
            />
          ) : (
            "No Valid Workout Chosen"
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecificWorkout;

export async function getServerSideProps(context: any) {
  // get user

  const session = await getSession(context);

  const query = `*[_type == "workout"]{
    ...,
    exercises[]->{
        ...,
        exerciseType->{...},
    },
    playlist->{
      ...,
      songs[]->{...},
    }
  }`;

  const query5 = `*[_type == "workout"]{
    ...,
    exercises[]->{
        ...,
        exerciseType->{...},
    },
    playlist->{
      ...,
      songs[]->{...},
    }
  }`;
  const query2 = `*[_type == "like"]{
    ...,
        user->{...
        },
        workout->{
        ...
        },
    }`;

  console.log(context.query._id);
  //   const query3 = `*[_type == "exercise"]{
  //     ...,
  //     exerciseType->{...},
  //     }`;

  const workouts = await sanityClient.fetch(query);
  const likes = await sanityClient.fetch(query2);
  const currentWorkout = (await sanityClient.fetch(query5)).filter(
    (x: any) => x._id === context.query._id
  )[0];
  return {
    props: {
      session: session,
      workouts: workouts,
      likes: likes,
      currentWorkout: currentWorkout || undefined,
    },
  };
}
