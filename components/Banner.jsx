import React from "react";
import AnimatedText from "./AnimatedText";
import { CiGlobe } from "react-icons/ci";
import { FiArrowDownRight } from "react-icons/fi";
import ThreeDModel from "./ThreeDAnimation/ThreeDModel";

export default function Banner() {
  return (
    <>
      <div id="top" className="w-full overflow-x-hidden  md:py-[5.6rem] px-0">
        <AnimatedText />
        <div className="absolute mt-10 md:mt-0 left-0 top-0 w-full overflow-hidden h-[500px] flex items-center justify-center">
          {/* <ThreeScene /> */}
          <ThreeDModel />
          {/* <iframe
            id="landing-model"
            title="A 3D model of a shoe"
            class="hero__iframe"
            width="400"
            height="400"
            src="https://sketchfab.com/models/7971770a9dc6443d9a66dd249e81965e/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0"
            // frameborder="0"
            // allow="autoplay; fullscreen; xr-spatial-tracking"
            allowfullscreen=""
            // mozallowfullscreen="true"
            // webkitallowfullscreen="true"
            // xr-spatial-tracking="true"
            // execution-while-out-of-viewport="true"
            // execution-while-not-rendered="true"
            // web-share="true"
          ></iframe> */}
        </div>
        <div className="hidden md:flex  absolute top-[35%] left-0 translate-y-[-50%] h-[100px] w-[280px] bg-[#305230] rounded-r-full flex items-center p-4">
          <h2 className="text-[2rem] w-[180px] mx-0">Located in Algeria</h2>
          <div className="w-[80px] h-[80px] rounded-full bg-[#182018] flex items-center justify-center">
            <CiGlobe size={40} />
          </div>
        </div>
        <div className="absolute top-14 -left-6 md:top-[30%] md:left-[70%] translate-y-[-50%] h-[100px]  rounded-r-full flex md:flex-col items-center md:items-start p-4">
          <div className="w-[80px] h-[80px] rounded-full bg-[#182018] flex items-center justify-center">
            <FiArrowDownRight size={40} />
          </div>
          <h2 className="text-[1.5rem] md:text-[3rem] -mx-4 md:mx-8">
            Freelance <br /> software engineer
          </h2>
        </div>
      </div>
    </>
  );
}
