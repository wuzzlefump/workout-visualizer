import { AudioContext } from "standardized-audio-context";
import React, { createRef, PureComponent, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getAudioURl } from "../utils/getAudioUrl";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useTimer } from "react-timer-hook";
import ReactAudioPlayer from "react-audio-player";
import { motion } from "framer-motion";

function Canvas2({ workout, session, likes }) {
  let canvasRef = createRef();
  let audioRef = createRef();
  let [exerciseIndex, setExerciseIndex] = useState(0);
  let [songIndex, setSongIndex] = useState(0);
  let [song, setSong] = useState(
    getAudioURl(workout.playlist.songs[songIndex].audio)
  );

  let [contextState, setContextState] = useState("");
  let [startTime, setStartTime] = useState(
    workout.exercises[exerciseIndex].duration
  );
  let [timerState, setTimerState] = useState(false);
  let exerciseArr = workout.exercises;
  let totalTime = workout.exercises
    .map((x) => x.duration)
    .reduce((a, b) => a + b, 0);
  const time = new Date();

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time.setSeconds(time.getSeconds() + totalTime),
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });

  const playNext = () => {
    const index = songIndex;

    if (index == workout.playlist.songs.length - 1) {
      setSong(getAudioURl(workout.playlist.songs[0].audio));
      setSongIndex(0);
    } else {
      setSong(getAudioURl(workout.playlist.songs[index + 1].audio));
      setSongIndex(index + 1);
    }
  };

  const like =
    likes
      .filter((like) => like.workout._id === workout._id)
      .find((like) => session?.name === like.user.username)?._id || undefined;
  const [loading, setloading] = useState(false);

  const isLiked = () =>
    likes
      .filter((like) => like.user.username === session?.name)
      .find((like) => like.workout._id === workout._id) || false;
  const likePost = async () => {
    setloading(true);
    if (!isLiked()) {
      await fetch("/api/createLike", {
        method: "POST",
        body: JSON.stringify({ user: session.user, workout: workout._id }),
      })
        .then((res) => {
          setliked(true);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
    return;
  };

  const [liked, setliked] = useState(isLiked());
  const unLikePost = async (key) => {
    setloading(true);
    if (isLiked() && key) {
      await fetch("/api/deleteLike", {
        method: "POST",
        body: JSON.stringify({ key: key }),
      })
        .then((res) => {
          setliked(false);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
    return;
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      {/* <h2>{contextState && contextState}</h2> */}
      <div className="relative" id="mp3_player">
        <div className="z-10  relative ">
          <div>
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
            <span>{seconds}</span>
          </div>
          <div className="flex flex-row items-center justify-between p-2">
            <h1 className="mx-auto flex font-bold text-xl">
              {workout.title}

              <span className="ml-2 cursor-pointer flex items-center ">
                {session && (
                  <div>
                    {loading ? (
                      <div> Loading ... </div>
                    ) : (
                      <div>
                        {!liked ? (
                          <HeartIcon
                            onClick={() => {
                              likePost();
                            }}
                            className="h-5 w-5 cursor-pointer"
                          />
                        ) : (
                          <SolidHeartIcon
                            onClick={() => {
                              unLikePost(like);
                            }}
                            className="text-red-400 h-5 w-5 cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </span>
            </h1>

            {/* <audio
              className=" bottom-0 "
              onPlay={() => {
                setTimerState(true);
                start();
              }}
              onPause={() => {
                setTimerState(false);
                pause();
              }}
              onEnded={() => {
                playNext();
                console.log(song);
              }}
              autoPlay={songIndex !== 0 ? true : false}
              controls={true}
              src={song}
            /> */}
          </div>
          <div
            className={`flex flex-col items-center justify-start space-y-10  `}
          >
            <h1 className={`text-6xl font-extrabold pt-20 pb-24 `}>
              {workout.exercises[exerciseIndex].title}
            </h1>
            <div className=" w-[100%] z-0 top-[30px] relative flex justify-center items-center ">
              <div className=" absolute border border-[#333333] rounded-full h-[200px] w-[200px] animate-pulse mt-52" />
              <div className=" absolute border border-[#333333] rounded-full h-[400px] w-[400px] animate-pulse mt-52" />
              <div className=" h-[400px] w-[400px] absolute border border-white rounded-full lg:h-[450px] lg:w-[450px] mt-52 animate-pulse" />
            </div>
            <CountdownCircleTimer
              key={exerciseIndex}
              isPlaying={timerState}
              duration={startTime}
              // up

              onComplete={() => {
                if (workout.exercises.length - 1 !== exerciseIndex) {
                  setExerciseIndex(exerciseIndex + 1);
                  setStartTime(
                    workout.exercises[exerciseIndex + 1].duration || 0
                  );
                  if ("speechSynthesis" in window) {
                    var msg = new SpeechSynthesisUtterance();
                    msg.text =
                      "switch to " + workout.exercises[exerciseIndex + 1].title;
                    window.speechSynthesis.speak(msg);
                  }
                  return { shouldRepeat: false };
                } else {
                  if ("speechSynthesis" in window) {
                    var msg = new SpeechSynthesisUtterance();
                    msg.text = "You Have Finished The Workout";
                    window.speechSynthesis.speak(msg);
                  }
                  return { shouldRepeat: false };
                }
              }}
              // onUpdate={}
              size={200}
              colors={["cyan"]}
            >
              {({ remainingTime }) => {
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;

                return `${hours}:${minutes}:${seconds}`;
              }}
            </CountdownCircleTimer>

            <ReactAudioPlayer
              src={song}
              controls
              onPlay={() => {
                setTimerState(true);
                start();
              }}
              onPause={() => {
                setTimerState(false);
                pause();
              }}
              onEnded={() => {
                playNext();
                console.log(song);
              }}
              autoPlay={songIndex !== 0 ? true : false}
            />
            <h1 className="text-xs font-extrabold pt-20">
              <span> Next Up:</span>
              {exerciseIndex + 1 < workout.exercises.length &&
                workout.exercises[exerciseIndex + 1].title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas2;
