"use client";

import AudioPlayer from "@/components/audio";
import { ChartNoAxesGantt, Menu, Play, Search, UserRound, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [openAudio, setOpenAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#595353" }}
    >
      <div
        className="bg-black mt-4 sm:mt-8 md:mt-12 mx-4 sm:mx-8 md:mx-12 w-full h-[93%] overflow-hidden shadow-lg rounded-t-xl bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/backGro.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Navbar */}
        <div className="flex flex-row items-center justify-between px-4 sm:px-6 md:px-10 absolute top-0 left-0 w-full p-4 text-white">
          <h1 className="text-xl sm:text-2xl font-bold">Navbar</h1>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-8 justify-center">
            <li>Home</li>
            <li>About</li>
            <li>Service</li>
            <li>Data</li>
            <li>Clients</li>
          </ul>

          <div className="hidden md:flex flex-row items-center gap-4">
            <button className="px-4 py-2 rounded-lg">
              <Search className="text-white" />
            </button>
            <button className="px-4 py-2 rounded-lg">
              <ChartNoAxesGantt className="text-white h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black bg-opacity-90 z-50 p-4 text-white">
            <ul className="flex flex-col space-y-4">
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
              <li>Data</li>
              <li>Clients</li>
            </ul>
            <div className="flex flex-row items-center gap-4 mt-4">
              <button className="px-4 py-2 rounded-lg">
                <Search className="text-white" />
              </button>
              <button className="px-4 py-2 rounded-lg">
                <ChartNoAxesGantt className="text-white h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between h-fit text-white mt-20 sm:mt-24 md:mt-40 px-4 sm:px-6 md:px-10">
          <div className="flex flex-col h-fit text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl max-w-sm font-bold">
              Everything you need to start and run your Business
            </h1>
            <button
              onClick={() => setOpenAudio(true)}
              className="px-4 py-2 mt-4 border w-fit border-white rounded-full"
            >
              <div className="flex flex-row items-center justify-center w-fit gap-2">
                <span>
                  <Play />
                </span>
                <span>
                  <p className="text-xs text-left">
                    View Demos <br /> and Highlights
                  </p>
                </span>
              </div>
            </button>
          </div>
          <div className="mt-8 md:mt-32 md:mr-12">
            <h2 className="text-xl sm:text-2xl max-w-xs">
              The ideas that improve your products
            </h2>
            <p className="text-sm md:text-md max-w-xs mt-3">
              Be among the first founders to join the community and get access
            </p>
            <div className="flex items-center mt-4">
              <div className="rounded-full p-2 w-8 sm:w-10 h-8 sm:h-10 bg-gray-300 flex items-center justify-center border border-white">
                <UserRound className="text-black h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="rounded-full p-2 w-8 sm:w-10 h-8 sm:h-10 bg-gray-300 flex items-center justify-center border border-white -ml-3">
                <UserRound className="text-black h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="rounded-full p-2 w-8 sm:w-10 h-8 sm:h-10 bg-gray-300 flex items-center justify-center border border-white -ml-3">
                <UserRound className="text-black h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="rounded-full p-2 w-8 sm:w-10 h-8 sm:h-10 bg-gray-300 flex items-center justify-center border border-white -ml-3">
                <UserRound className="text-black h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center w-full bottom-0 left-0 px-4 sm:px-8 md:px-12 mt-8 sm:mt-2 gap-6 sm:gap-2 pb-6">
          <div className="h-16 sm:h-20 p-10 sm:p-14 border-2 border-red-500 rounded-full flex flex-col items-center justify-center relative">
            <p className="text-white text-xs text-center">
              Project Managemet <br /> Tool Design
            </p>
            <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2">
              <Image src="/arrow.svg" alt="background" width={50} height={50} />
            </div>
          </div>

          <div className="h-16 sm:h-20 p-10 sm:p-14 border-2 border-blue-500 rounded-full flex items-center justify-center relative">
            <p className="text-white text-xs text-center">
              The Leading Customer <br /> Data Platform
            </p>
            <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2">
              <Image src="/arrow.svg" alt="background" width={50} height={50} />
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-end">
            <div className="h-16 sm:h-20 p-4 sm:p-5 border-2 border-green-500 rounded-full flex items-center justify-center relative">
              <p className="text-white text-xs text-center">
                View <br /> Projects
              </p>
            </div>
            <div className="h-16 sm:h-20 mt-6 border-2 py-10 sm:py-14 px-16 sm:px-20 border-green-500 rounded-full flex items-center justify-center relative">
              <p className="text-white text-xs text-center">
                Food Delivery <br /> Mobile Apps
              </p>
              <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2">
                <Image src="/arrow.svg" alt="background" width={50} height={50} />
              </div>
            </div>
          </div>

          <div className="h-16 sm:h-20 p-10 sm:p-14 border-2 border-yellow-500 rounded-full flex items-center justify-center relative">
            <p className="text-white text-xs text-center">
              Business Management <br /> Dashboard
            </p>
            <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2">
              <Image src="/arrow.svg" alt="background" width={50} height={50} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Audio Modal */}
      {openAudio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-gray-300"
              onClick={() => setOpenAudio(false)}
            >
              <X size={20} />
            </button>
            <Image
              src="/backGro.png"
              alt="background"
              width={380}
              height={200}
              className="rounded-md mb-4 w-full h-auto"
            />

            <AudioPlayer src="/audio.mp3" />
          </div>
        </div>
      )}
    </div>
  );
}