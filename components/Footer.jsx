import React from "react";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowUp, IoLogoGithub } from "react-icons/io";

export default function Footer() {
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
    <div className="bg-[#333] py-[4.8rem]">
      <div className="w-[100%] mx-[auto] text-white">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setTimeout(() => {
              const aboutSection = document.getElementById("top");
              scrollTo(document.documentElement, aboutSection.offsetTop, 1000);
            }, 300);
          }}
        >
          <IoIosArrowUp className="text-[#fff] text-[3rem] mx-[auto] block m-[1rem]" />
        </a>
        <div className="flex justify-center">
          <a
            href="https://twitter.com/Abderraouf_29"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-[5rem] h-[5rem] text-[#fff] text-[3rem] m-[1.6rem]"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/abderraouf-mimoune-2290971a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-[5rem] h-[5rem] text-[#fff] text-[3rem] m-[1.6rem]"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/abderraouf2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-[5rem] h-[5rem] text-[#fff] text-[3rem] m-[1.6rem]"
          >
            <IoLogoGithub />
          </a>
        </div>
      </div>
      <hr className="w-[50%] my-[1rem] mx-[auto] border-t-[#808080]" />
      <h6 className="text-[#808080] text-[1.3rem] text-center ">
        © 2024 - Template developed by{" "}
        <a
          href="https://github.com/abderraouf2"
          target="_blank"
          className="hover:text-[#3ac4ac] duration-300"
        >
          Abderraouf Mimoune
        </a>
      </h6>
    </div>
  );
}
