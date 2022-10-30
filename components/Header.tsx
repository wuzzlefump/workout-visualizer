import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { TPlaylist, TSession } from "../typings";

interface Props {
  session?: TSession;
}

function Header({ session }: Props) {
  const router = useRouter();
  return (
    <div>
      <div className=" sticky flex top-0 z-auto border-b  border-slate-100 justify-between space-x-3  px-5 bg-black text-gray-100">
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center space-x-1 cursor-pointer  py-2 rounded-xl hover:scale-110 transition-all duration-150 ease-out"
        >
          <Image
            className="border rounded-full border-white bg-slate-200 pt-1 mr-3 hover:pt-0 hover:pb-1"
            alt=""
            src={"/favicon.ico"}
            width={40}
            height={40}
          />
          <p className="hidden sm:inline whitespace-nowrap">
            Workout Visualizer
          </p>
        </div>
        <div className="flex items-center">
          <p className="px-8">Welcome: {session && session?.name}</p>

          <div
            className="flex cursor-pointer hover:bg-gray-900 flex-col items-center justify-center p-2"
            onClick={() => (session ? signOut() : signIn())}
          >
            <ArrowRightIcon className="h-6 w-6 text-slate-200 " />
            <p>{session ? "Logout" : "Login"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
