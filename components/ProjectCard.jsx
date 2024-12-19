import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProjectCard({ project }) {
  const { title, image, description, link, github } = project;
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
  });
  const [shadowStyle, setShadowStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });
  const controls = useAnimation();
  const controls1 = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
      controls1.start({ opacity: 1, x: 0 });
    }
  }, [controls, inView]);

  const handleMouseMove = (e) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const centerX = img.offsetWidth / 2;
    const centerY = img.offsetHeight / 2;

    const deltaX = offsetX - centerX;
    const deltaY = offsetY - centerY;

    const tiltAngleX = (deltaY / centerY) * 5;
    const tiltAngleY = (deltaX / centerX) * 5;

    const overlay = document.querySelector(".reflection-overlay");
    const overlayX = (offsetX / rect.width) * 100;
    const overlayY = (offsetY / rect.height) * 100;
    overlay.style.backgroundPosition = `${overlayX}% ${overlayY}%`;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg)`,
    });
    setShadowStyle({
      display: "block",
      top: `${offsetY}px`, // Update the top position to match the cursor offset
      left: `${offsetX}px`, // Update the left position to match the cursor offset
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
    setShadowStyle({
      display: "none",
    });
  };

  return (
    <div
      className="w-full max-w-[540px] mx-[auto] flex flex-col sm:max-w-[720px]  l:max-w-[960px]  lg:max-w-[1140px] xl:max-w-[1320px] relative"
      style={{
        background: "rgba(0, 0, 0, 0.22)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)" /* Subtle border */,
        borderRadius: "12px" /* Rounded corners for smoothness */,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" /* Soft shadow for depth */,
        padding: "16px" /* Spacing inside the card */,
        color: "#c8c8c8" /* White text for contrast */,
      }}
    >
      <motion.div
        className=" relative w-full"
        style={{ position: "relative", display: "inline-block" }}
        ref={ref}
        initial={{ opacity: 0, x: 20 }}
        animate={controls}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Image
          src={image}
          width={1080}
          height={720}
          className="max-w-[100%] w-[100%] overflow-hidden relative lg:w-[90%] my-0 mx-[auto]"
          alt="project image"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-[#fff] opacity-10 pointer-events-none reflection-overlay"
            style={{
              ...shadowStyle,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%", // Make the overlay a circle
              width: "500px", // Set fixed width
              height: "500px", // Set fixed height
              boxShadow: "0px -1px 1092px 66px rgba(255,255,255)",
              pointerEvents: "none", // Ensure the shadow doesn't interfere with mouse events
              filter: "blur(50px)", // Soften the edges
            }}
          ></div>
        </div>
      </motion.div>
      <motion.div
        className="  w-full"
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={controls1}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3
          className="text-[2rem] mb-[1.8rem] xs:text-[2.5rem]"
          style={{ fontWeight: "700" }}
        >
          {title}
        </h3>
        <div className="">
          <p className="text-[1.6rem] mb-4" style={{ fontWeight: "400" }}>
            {description}
          </p>
        </div>
        <div className="flex items-center l:hidden my-[2.5rem]">
          {link && (
            <p>
              <a
                className="w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#ffce08] border-2 border-[#ffce08] "
                style={{
                  animation: "exampleAnimation .8s ease-in-out",
                  lineHeight: "1",
                  // animationDelay: ".1s",
                }}
                href={link}
                target="_blank"
              >
                See live
              </a>
            </p>
          )}
          {github && (
            <a
              target="_blank"
              className="w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#ffce08]"
              href={github}
            >
              Source Code
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
