import React from "react";
import { motion } from "framer-motion";
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
    <div
      id="top"
      className="w-full h-[100vh] flex items-center justify-start md:p-[5.6rem]"
    >
      <motion.div
        className="w-full p-2 flex flex-col items-center md:mx-[5%] md:items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-[3.5rem] block mb-[3.2rem] leading-[1.5] text-center md:text-left md:text-[4rem] lg:text-[5.6rem] md:leading-[1.2]"
          style={{
            fontWeight: "700",
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hi, my name is <span className="text-[#3AC4AC]">Abderraouf</span>
          <br />
          I'm the Unknown Developer.
        </motion.h1>
        <motion.p
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
                scrollTo(document.documentElement, aboutSection.offsetTop, 800);
              }, 300);
            }}
          >
            Know More
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
