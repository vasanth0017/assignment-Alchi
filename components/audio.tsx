"use client";

import { Pause, PlayIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  //time Format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  console.log("audioRef", audioRef);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);
  console.log("currentTime", currentTime);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: any) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <audio ref={audioRef} src={src}></audio>
      <div className="flex items-center justify-center space-x-4">
        <button onClick={togglePlay} className="p-3 bg-blue-600 rounded-full">
          {isPlaying ? <Pause /> : <PlayIcon />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={currentTime}
          onChange={handleSeek}
          className="w-full cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
