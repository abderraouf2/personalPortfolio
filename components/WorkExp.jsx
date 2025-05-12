import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    id: "01",
    title: "Founder - CarNest",
    date: "April 2025 – Present",
    location: "/",
    content: [
      "Designed and developed Carnest from scratch",
      "Built using modern web stack with user-first UX",
      "Launched to help users manage car listings effortlessly",
    ],
  },
  {
    id: "02",
    title: "Team Lead – GO Platform",
    date: "Jul 2024 – Present",
    location: "Qatar (Remote)",
    content: [
      "Led team and implemented CI/CD with GitHub Actions",
      "Reduced deployment time by 20%, improved load speed by 30%",
      "Mentored developers and managed Jira sprint tasks",
    ],
  },
  {
    id: "03",
    title: "Fullstack Developer – GO Platform",
    date: "Jun 2023 – Jul 2024",
    location: "Qatar (Remote)",
    content: [
      "Developed features using Vue.js & Node.js",
      "Deployed with Nginx on Ubuntu (DigitalOcean)",
      "Coordinated with stakeholders for project clarity",
    ],
  },
  {
    id: "04",
    title: "Intern – SIHHATECH",
    date: "Jul 2023 – Oct 2023",
    location: "Algeria (Remote)",
    content: [
      "Added user roles and permissions in admin dashboard",
      "Improved mobile UX and audited UI for usability",
      "Used Vue.js and Laravel stack",
    ],
  },
  {
    id: "05",
    title: "Intern – Algérie Telecom",
    date: "Feb 2023 – Apr 2023",
    location: "Algeria, Batna",
    content: [
      "Simulated network topology with PNETLab",
      "Configured and replaced network devices",
      "Wrote technical report with optimization suggestions",
    ],
  },
];

export default function ScrollTimeline() {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMiddle = window.scrollY + window.innerHeight / 2;
      const newIndex = stepRefs.current.findIndex((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        return scrollMiddle >= top && scrollMiddle < bottom;
      });
      if (newIndex !== -1 && newIndex !== activeIndex) setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="pt-[5rem] px-[1rem] relative hidden md:block">
      <motion.h1
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={controls}
        transition={{ duration: 1, delay: 1 }}
        className="text-[#FFFFFF] text-[2.8rem] mb-[4.5rem] text-center xs:text-[4rem]"
        style={{ fontWeight: "700" }}
      >
        Work experience
      </motion.h1>

      <div
        ref={containerRef}
        className="w-full hidden md:flex flex-col gap-0 lg:w-[90%] my-0 mx-[auto] sm:max-w-[720px] l:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] relative"
      >
        <div className="absolute right-10 lg:left-1/2 top-0 h-full w-2 bg-gray-200 -translate-x-1/2">
          <motion.div
            className="absolute right-[-2px] lg:left-1/2 top-0 w-2 bg-[#365ca3] origin-top -translate-x-1/2"
            style={{ height: lineScaleY }}
          />
        </div>

        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`step my-[5%] flex items-center w-full ${
                index % 2 === 0
                  ? "justify-start"
                  : "justify-start lg:justify-end"
              }`}
            >
              <div
                className={`relative l:w-xl xl:w-4xl w-full max-w-4xl l:max-w-6xl lg:max-w-2xl xl:max-w-4xl p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "bg-blue-100 scale-110 text-black"
                    : "bg-white scale-95 text-gray-400"
                } ${
                  index % 2 === 0 ? "text-left mr-16" : "text-left lg:ml-16"
                }`}
              >
                <div
                  className={`text-xl font-extrabold mb-1 ${
                    activeIndex === index ? "text-[#03112b]" : "text-gray-400"
                  }`}
                >
                  {step.id}
                </div>
                <h2 className="text-4xl font-bold mb-1">{step.title}</h2>
                <div className="text-sm italic mb-2">
                  {step.date} – {step.location}
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {step.content.map((point, idx) => (
                    <li key={idx} className="text-base leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 ${
                    activeIndex === index
                      ? "bg-[#ffcc39] border-[#ffcc39]"
                      : "bg-gray-300 border-gray-300"
                  } ${index % 2 === 0 ? "-left-16 lg:-right-16" : "-left-16"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
