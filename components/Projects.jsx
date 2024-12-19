import React, { useEffect, useState } from "react";
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

  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, project) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log({ rect, width: window.innerWidth });
    const x = e.clientX - rect.left; // Mouse X relative to the cell
    const y = e.clientY - rect.top; // Mouse Y relative to the cell

    // Check window boundaries
    const windowWidth = window.innerWidth;

    if (e.clientX + 500 >= windowWidth) {
      setMousePosition({ x: x - 500, y });
    } else {
      setMousePosition({ x, y });
    }

    setHoveredProject(project); // Set the current project being hovered
  };

  const handleMouseLeave = () => {
    setHoveredProject(null); // Clear hovered project when leaving
  };

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
      <div className="w-full l:hidden my-0 mx-[auto] sm:max-w-[720px] l:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px]">
        {
          // Loop through the projects array and render a ProjectCard component for each project
          projects.map((project) => (
            <div className="mb-4">
              <ProjectCard key={project.id} project={project} />
            </div>
          ))
        }
      </div>

      <div className="w-full hidden l:grid grid-cols-3 gap-0 lg:w-[90%] my-0 mx-[auto] sm:max-w-[720px] l:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px]">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`p-4 flex flex-col items-center justify-center relative ${
              index < 3 ? "" : "border-t"
            } ${index % 3 === 0 ? "" : "border-l"} border-gray-300`}
            onMouseMove={(e) => handleMouseMove(e, project)}
            onMouseLeave={handleMouseLeave}
          >
            <h1 className="text-[5rem] font-semibold p-10">{project.title}</h1>
            <div className="flex items-center my-[2.5rem]">
              {hoveredProject === project && (
                <div className="absolute bottom-8 flex items-center my-[2.5rem] mx-auto w-2/3 left-1/2 transform -translate-x-1/2">
                  {project.link && (
                    <p>
                      <a
                        className="w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#ffce08] border-2 border-[#ffce08] "
                        style={{
                          animation: "exampleAnimation .8s ease-in-out",
                          lineHeight: "1",
                          // animationDelay: ".1s",
                        }}
                        href={project.link}
                        target="_blank"
                      >
                        See live
                      </a>
                    </p>
                  )}
                  {project.github && (
                    <a
                      target="_blank"
                      className="w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#ffce08]"
                      href={project.github}
                      style={{
                        animation: "exampleAnimation .8s ease-in-out",
                        lineHeight: "1",
                        // animationDelay: ".1s",
                      }}
                    >
                      Source Code
                    </a>
                  )}
                </div>
              )}
            </div>
            {hoveredProject === project && (
              <div
                style={{
                  position: "absolute",
                  width: "450px",
                  height: "fit-content",
                  transform: "translateY(-40%)",
                  top: `${mousePosition.y}px`,
                  left: `${mousePosition.x + 20}px`,
                  pointerEvents: "none",
                  boxShadow: "0px 0px 8px 2px #c8c8c8",
                  zIndex: 1000,
                  borderRadius: "12px" /* Rounded corners for smoothness */,
                }}
              >
                <ProjectCard project={project} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
