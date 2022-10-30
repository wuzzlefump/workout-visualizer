import {Circle} from "better-react-spinkit"

import React from 'react'

function Loading() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
            <div className={" mt-52"}>
                <Circle color={"black"} size={60}/>
                <p className="font-semibold text-lg">Loading...</p>
            </div>
            
        </div>
    )
}

export default Loading
