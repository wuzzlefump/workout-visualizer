import { getSession } from "next-auth/react";
import React from "react";
import Header from "../components/Header";
import WorkoutSidebar from "../components/WorkoutSidebar";
import { TLike, TSession, TWorkout } from "../typings";
import { sanityClient } from "../sanity";

interface Props {
  session: TSession;
  workouts: TWorkout[];
  likes: TLike[];
}

function Dashboard({ session, workouts, likes }: Props) {
  console.log({ workouts });
  console.log({ likes });
  return (
    <div className="h-screen bg-gray-800 overflow-y-auto">
      <Header session={session} />
      <div className="flex">
        <div className=" min-w-[100%] sm:min-w-[300px] sm:max-w-[350px] sm:border-r sm:h-[97vh] overflow-auto  ">
          <WorkoutSidebar session={session} workouts={workouts} />
        </div>
        <div className="hidden sm:flex  text-blue-200 sm:min-h-[94vh] h-fit border-l border-l-slate-100 sm:text-center sm:justify-center sm:items-center flex-1 ">
          no workout selected
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

export async function getServerSideProps(context: any) {
  // get user
  const session = await getSession(context);

  const query = `*[_type == "workout"]{
    ...,
    exercises[]->{
        ...,
        exerciseType->{...},
    }
  }`;

  const query2 = `*[_type == "like"]{
        _id,
        user->{
            _id,
            username
        },
        workout->{
            _id
        },
    }`;
  const workouts = await sanityClient.fetch(query);
  const likes = await sanityClient.fetch(query2);
  return {
    props: {
      session: session,
      workouts: workouts,
      likes: likes,
    },
  };
}
