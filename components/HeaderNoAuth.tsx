import Image from "next/image";
import React from "react";

interface Props {}

function HeaderNoAuth(props: Props) {
  const {} = props;

  return (
    <div className="">
      <div className=" sticky flex top-0 z-auto border-b border-slate-100 justify-between space-x-3  px-5 bg-black text-gray-100">
        <div className="flex items-center space-x-1 cursor-pointer  py-2 rounded-xl hover:scale-110 transition-all duration-150 ease-out">
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
      </div>
    </div>
  );
}

export default HeaderNoAuth;
