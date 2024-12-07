import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { CiGlobe } from "react-icons/ci";
import { FiArrowDownRight } from "react-icons/fi";
import ThreeDModel from "./ThreeDAnimation/ThreeDModel";
import Image from "next/image";
import ParticlesComponent from "./Particles";
export default function Banner() {
  function scrollTo(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();

    function animateScroll(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOut(progress); // Apply easing function
      element.scrollTop = start + change * easedProgress;

      if (elapsed < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    }

    // Easing function (example using easeInOut)
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    window.requestAnimationFrame(animateScroll);
  }

  return (
    <>
      <div
        id="top"
        className="w-full h-[100vh] flex items-center justify-center overflow-hidden  md:py-[5.6rem] px-0"
      >
        <ParticlesComponent id="particles" />
        <div className="absolute mt-10 md:mt-0 left-0 top-0 w-full overflow-hidden h-[500px] flex items-center justify-center"></div>
        <motion.div
          className="w-full p-2 flex flex-col items-center md:mx-[5%] "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-[3.5rem] text-[#c8c8c8] block mb-[1.2rem] leading-[1.5] text-center  md:text-[5.4rem] l:text-[7.6rem] md:leading-[1.2]"
            style={{
              fontWeight: "700",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Abderraouf Mimoune
          </motion.h1>
          <div>
            <p
              className="text-[1.5rem] text-[#c8c8c8] block mb-[3.2rem] leading-[1.5] text-center  md:text-[2rem] lg:text-[2rem] md:leading-[1.2]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Software Engineer <span className="text-[#ffce08]">|</span>{" "}
              Freelancer{" "}
              <span className="text-[#ffce08] hidden xxs:inline-block">|</span>{" "}
              Pentester
            </p>
          </div>
          <Image
            className="w-[100px] xs:w-[150px] mt-0 h-auto"
            src="/assets/logo.png"
            width={200}
            height={300}
          />

          {/* <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#about"
              className="w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[2rem] font-bold text-[#3AC4AC]   border-2 border-[#3AC4AC] md:text-[2.4rem]"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  const aboutSection = document.getElementById("about");
                  scrollTo(
                    document.documentElement,
                    aboutSection.offsetTop,
                    800
                  );
                }, 300);
              }}
            >
              Know More
            </a>
          </motion.p> */}
        </motion.div>

        {/* <div className="hidden md:flex  absolute top-[35%] left-0 translate-y-[-50%] h-[100px] w-[280px] bg-[#305230] rounded-r-full flex items-center p-4">
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
        </div> */}
      </div>
    </>
  );
}
