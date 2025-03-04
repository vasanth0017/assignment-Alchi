// "use client";

// import { Pause, PlayIcon, Volume2, VolumeX, RotateCcw } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// export default function AudioPlayer({ src }: { src: string }) {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isReversed, setIsReversed] = useState(false);
//   const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
//   const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
//   const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
//   const [playbackTime, setPlaybackTime] = useState(0);
  
//   // time Format
//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   // Load and decode the audio file when component mounts
//   useEffect(() => {
//     const loadAudio = async () => {
//       try {
//         const context = new (window.AudioContext || (window as any).webkitAudioContext)();
//         setAudioContext(context);
//         console.log("Audio context created",context);
//         const response = await fetch(src);
//         console.log("Audio response",response);
//         const arrayBuffer = await response.arrayBuffer();
//         console.log("Audio arrayBuffer",arrayBuffer);
//         const decodedBuffer = await context.decodeAudioData(arrayBuffer);
//         console.log("Audio decodedBuffer",decodedBuffer);
//         setAudioBuffer(decodedBuffer);
        
//         // Set duration once we have the audio buffer
//         setDuration(decodedBuffer.duration);
//       } catch (error) {
//         console.error("Error loading audio:", error);
//       }
//     };
    
//     loadAudio();
    
//     return () => {
//       if (sourceNode) {
//         sourceNode.stop();
//       }
//       if (audioContext) {
//         audioContext.close();
//       }
//     };
//   }, [src]);

//   useEffect(() => {
//     // For normal playback through the audio element
//     const audio = audioRef.current;
//     if (!audio || isReversed) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const setAudioDuration = () => setDuration(audio.duration);
    
//     audio.volume = volume;
//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", setAudioDuration);
//     audio.addEventListener("ended", () => setIsPlaying(false));
    
//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", setAudioDuration);
//       audio.removeEventListener("ended", () => setIsPlaying(false));
//     };
//   }, [isReversed]);

//   // Update current time for reversed playback
//   useEffect(() => {
//     if (!isReversed || !isPlaying) return;
    
//     let animationFrame: number;
//     const updateReverseTime = () => {
//       if (audioContext && sourceNode) {
//         // Calculate current time for reversed playback
//         const elapsedTime = audioContext.currentTime - playbackTime;
//         const reversedCurrentTime = duration - elapsedTime;
        
//         if (reversedCurrentTime <= 0) {
//           stopPlayback();
//         } else {
//           setCurrentTime(reversedCurrentTime);
//           animationFrame = requestAnimationFrame(updateReverseTime);
//         }
//       }
//     };
    
//     animationFrame = requestAnimationFrame(updateReverseTime);
    
//     return () => {
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [isReversed, isPlaying, playbackTime, duration, audioContext]);

//   const createReversedBuffer = (originalBuffer: AudioBuffer): AudioBuffer => {
//     const context = audioContext!;
//     const reversedBuffer = context.createBuffer(
//       originalBuffer.numberOfChannels,
//       originalBuffer.length,
//       originalBuffer.sampleRate
//     );
    
//     // Reverse each channel
//     for (let channel = 0; channel < originalBuffer.numberOfChannels; channel++) {
//       const originalData = originalBuffer.getChannelData(channel);
//       const reversedData = reversedBuffer.getChannelData(channel);
      
//       for (let i = 0; i < originalData.length; i++) {
//         reversedData[i] = originalData[originalData.length - 1 - i];
//       }
//     }
    
//     return reversedBuffer;
//   };

//   const playReversed = () => {
//     if (!audioContext || !audioBuffer) return;
    
//     // Stop any existing playback
//     if (sourceNode) {
//       sourceNode.stop();
//     }
    
//     // Stop the HTML audio element if it's playing
//     if (audioRef.current && !isReversed) {
//       audioRef.current.pause();
//     }
    
//     // Create reversed buffer
//     const buffer = createReversedBuffer(audioBuffer);
    
//     // Create and configure source node
//     const source = audioContext.createBufferSource();
//     source.buffer = buffer;
    
//     // Create gain node for volume control
//     const gainNode = audioContext.createGain();
//     gainNode.gain.value = isMuted ? 0 : volume;
    
//     // Connect nodes
//     source.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     // Start playback
//     source.start(0);
//     setSourceNode(source);
//     setPlaybackTime(audioContext.currentTime);
//     setIsPlaying(true);
    
//     // Handle playback end
//     source.onended = () => {
//       setIsPlaying(false);
//       setCurrentTime(0);
//     };
//   };

//   const playNormal = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
    
//     // Stop Web Audio API playback if it's active
//     if (sourceNode) {
//       sourceNode.stop();
//       setSourceNode(null);
//     }
    
//     audio.play();
//     setIsPlaying(true);
//   };

//   const togglePlay = () => {
//     if (isPlaying) {
//       stopPlayback();
//     } else {
//       if (isReversed) {
//         playReversed();
//       } else {
//         playNormal();
//       }
//     }
//   };

//   const stopPlayback = () => {
//     if (isReversed) {
//       if (sourceNode) {
//         sourceNode.stop();
//         setSourceNode(null);
//       }
//     } else {
//       const audio = audioRef.current;
//       if (audio) {
//         audio.pause();
//       }
//     }
//     setIsPlaying(false);
//   };

//   const toggleReverse = () => {
//     // Stop current playback
//     stopPlayback();
    
//     // Toggle reversed state
//     setIsReversed(!isReversed);
    
//     // Reset current time
//     setCurrentTime(0);
    
//     // If we were playing, start playing in the new mode
//     if (isPlaying) {
//       setTimeout(() => {
//         if (!isReversed) {
//           playReversed();
//         } else {
//           playNormal();
//         }
//       }, 100);
//     }
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const seekValue = parseFloat(e.target.value);
//     const newTime = (seekValue / 100) * duration;
    
//     if (isReversed) {
//       // Stop current playback
//       if (sourceNode) {
//         sourceNode.stop();
//       }
      
//       setCurrentTime(newTime);
      
//       // If currently playing, restart from new position
//       if (isPlaying) {
//         setTimeout(() => playReversed(), 100);
//       }
//     } else {
//       const audio = audioRef.current;
//       if (audio) {
//         audio.currentTime = newTime;
//         setCurrentTime(newTime);
//       }
//     }
//   };

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value) / 100;
//     setVolume(newVolume);
    
//     if (newVolume > 0 && isMuted) {
//       setIsMuted(false);
//     }
    
//     if (newVolume === 0) {
//       setIsMuted(true);
//     }
    
//     // Update volume for HTML audio element
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
    
//     // Update volume for Web Audio API
//     if (audioContext && sourceNode) {
//       const gainNode = audioContext.createGain();
//       gainNode.gain.value = newVolume;
//       sourceNode.connect(gainNode);
//       gainNode.connect(audioContext.destination);
//     }
//   };

//   const toggleMute = () => {
//     const newMutedState = !isMuted;
//     setIsMuted(newMutedState);
    
//     if (audioRef.current) {
//       audioRef.current.volume = newMutedState ? 0 : volume;
//     }
//   };
  
//   return (
//     <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
//       <audio ref={audioRef} src={src}></audio>

//       {/* Playback Controls */}
//       <div className="flex items-center justify-center space-x-4 mb-2">
//         <button
//           onClick={togglePlay}
//           className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
//         >
//           {isPlaying ? <Pause size={20} /> : <PlayIcon size={20} />}
//         </button>
        
//         <button
//           onClick={toggleReverse}
//           className={`p-2 rounded-full transition-colors ${
//             isReversed ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-600 hover:bg-gray-700"
//           }`}
//           title={isReversed ? "Switch to normal playback" : "Switch to reversed playback"}
//         >
//           <RotateCcw size={18} />
//         </button>

//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={(currentTime / duration) * 100 || 0}
//           onChange={handleSeek}
//           className="w-full h-2 bg-gray-700 rounded-lg appearance-none accent-blue-500 cursor-pointer"
//           style={{
//             background: `linear-gradient(to right, #3b82f6 ${
//               (currentTime / duration) * 100
//             }%, #374151 ${(currentTime / duration) * 100}%)`,
//           }}
//         />
//       </div>

//       <div className="flex justify-between text-sm">
//         <span>{formatTime(currentTime)}</span>
//         <span>{isReversed ? "Reversed" : "Normal"}</span>
//         <span>{formatTime(duration)}</span>
//       </div>

//       {/* Volume Controls */}
//       <div className="flex items-center mt-3 space-x-2">
//         <button
//           onClick={toggleMute}
//           className="p-1 rounded hover:bg-gray-800 transition-colors"
//         >
//           {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
//         </button>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={isMuted ? 0 : volume * 100}
//           onChange={handleVolumeChange}
//           className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
//           style={{
//             background: `linear-gradient(to right, #3b82f6 ${
//               volume * 100
//             }%, #374151 ${volume * 100}%)`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }