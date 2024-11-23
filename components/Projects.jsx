import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/public/projects";
export default function Projects() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [controls, inView]);
  return (
    <div className="pt-[5rem] px-[1rem]">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, x: -10 }}
        animate={controls}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-[#FFFFFF] text-[2.8rem] mb-[4.5rem] text-center xs:text-[4rem]"
        style={{ fontWeight: "700" }}
      >
        PROJECTS
      </motion.h2>
      <div className="w-full lg:w-[90%] my-0 mx-[auto] sm:max-w-[720px] l:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px]">
        {
          // Loop through the projects array and render a ProjectCard component for each project
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        }
      </div>
    </div>
  );
}
