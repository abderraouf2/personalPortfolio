import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const controls = useAnimation();
  const controls1 = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
      controls1.start({ opacity: 1, y: 0, x: 0 });
    }
  }, [controls, inView]);
  return (
    <div
      id="about"
      className="text-white bg-[#03112b] flex justify-center bg px-[1rem] py-[5rem] pb-[10%] clip-path-polygon lg:clip-path-none lg:clip-path-polygon-lg"
    >
      <div className="max-w-[1320px]">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -10 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[2.8rem] mb-[4.5rem] text-center xs:text-[4rem]"
          style={{ fontWeight: "700" }}
        >
          ABOUT ME
        </motion.h2>
        <div className="pb-[5rem] flex flex-wrap md:pb-0">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -10 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-[100%] h-fit flex justify-center pb-[6.4rem] sm:pb-0 sm:w-[50%] relative"
          >
            <Image
              src="/assets/profile-pic.png"
              width={300}
              height={300}
              className="max-w-[100%]"
              alt="rofile pic"
            />
          </motion.div>
          <div className="flex flex-col items-center justify-center sm:items-start sm:w-[50%]">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={controls1}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-[.5rem] text-[#FFFFFF]"
            >
              <p className="text-[1.6rem] text-center mb-[1rem] sm:text-left">
                Passionate software engineer proficient in JavaScript. Skilled
                in developing sleek web applications and robust backend systems.
                With a proactive approach and commitment to continuous learning,
                I tackle challenges head-on, expanding my skill set. Creative
                and perseverant, I deliver high-quality solutions exceeding
                expectations. Thriving in dynamic environments, I excel in
                collaboration and innovation. Let's bring your ideas to life!
              </p>
              <p className="text-[1.6rem] text-center mb-[1rem] sm:text-left">
                In my spare time, I'm either hitting the gym or taking solo
                night rides. Fitness enthusiast and calisthenics lover.
                Professionally, I aim to help companies develop tailored
                solutions and build a game-changing SaaS platform.{" "}
              </p>
            </motion.div>
            <motion.span
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mt-3 "
            >
              <a
                className="w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#fff]   border-2 border-[#fff] "
                style={{
                  animation: "exampleAnimation .8s ease-in-out",
                  // animationDelay: ".1s",
                }}
                href="http://localhost:3000/FullStack_CV_ABDERRAOUF.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
