import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ServicesCard from "./ServicesCard";
export default function Services() {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const myServices = [
    {
      title: "Website Development",
      icon: "🌐",
      creativeTitle: "Craft Stunning Websites",
      description:
        "We bring your online presence to life with modern, responsive, and user-friendly websites.",
      offerings: [
        "Custom Design tailored to your brand",
        "Fast and Responsive performance across devices",
        "Integration with tools like CMS platforms or e-commerce solutions",
        "Use of cutting-edge technologies like Next.js, Tailwind CSS, and Vue.js",
      ],
    },
    {
      title: "Build Your MVP",
      icon: "🚀",
      creativeTitle: "Accelerate Your Startup Dream",
      description:
        "Turn your ideas into reality with a functional MVP, ready to attract investors or test your market.",
      offerings: [
        "End-to-end product development",
        "Focus on scalability and maintainability",
        "Expertise in Next.js, Node.js, and MongoDB for robust backend and frontend solutions",
        "Agile methodologies to ensure quick delivery",
      ],
    },
    {
      title: "E-commerce Website Development",
      creativeTitle: "Create Your Online Store",
      description:
        "Specialized in building high-performance e-commerce platforms tailored to your brand and customer needs.",
      icon: "🛒",
      offerings: [
        "Custom e-commerce platforms",
        "Integration with payment gateways",
        "Product management features",
        "Mobile-friendly designs",
        "Order tracking and management systems",
      ],
    },

    // {
    //   title: "Pentesting (Coming Soon)",
    //   icon: "🛡️",
    //   creativeTitle: "Secure Your Application",
    //   description:
    //     "Identify vulnerabilities before attackers do. Comprehensive security testing for your apps.",
    //   offerings: [
    //     "Advanced penetration testing for web applications and APIs",
    //     "Reports on vulnerabilities and actionable recommendations",
    //     "Tools and techniques to secure sensitive data",
    //   ],
    //   status: "Coming Soon",
    // },
  ];

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
        Services
      </motion.h2>
      <div className="w-full grid grid-cols-1 l:grid-cols-3 gap-10 lg:w-[90%] my-0 mx-[auto] sm:max-w-[720px] l:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px]">
        {myServices.map((service, index) => {
          return <ServicesCard service={service} key={index} />;
        })}
      </div>
    </div>
  );
}
