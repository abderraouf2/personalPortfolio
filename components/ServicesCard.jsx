import React, { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function ServicesCard(props) {
  const { service } = props;
  const [mouseOver, setMouseOver] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X relative to the card
    const y = e.clientY - rect.top; // Mouse Y relative to the card

    // Check if the red div is hitting the left edge of the window
    const windowWidth = window.innerWidth;

    // If the red div's x position is close to the left edge, adjust it to the right
    if (e.clientX + 420 >= windowWidth) {
      // 20px as a buffer
      setMousePosition({ x: windowWidth - rect.left - 450, y }); // Move to the right
    } else {
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        boxShadow: "0px 0px 10px 10px #03112b inset",
        padding: "20px",
        borderRadius: "10px",
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onMouseMove={handleMouseMove}
    >
      <h1 className="text-[1.8rem] font-semibold flex items-center gap-4">
        <span className="text-[3.8rem]">{service.icon}</span>
        {service.creativeTitle}
      </h1>
      <h1 className="my-6 w-[96%] mx-auto text-[1.5rem]">
        {service.description}
      </h1>
      {mouseOver && (
        <div
          className="absolute hidden lg:block  p-4 rounded-[10px] z-[8]"
          style={{
            width: "400px",
            background: "rgba(0, 0, 0, 0.22)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(9px)",

            // height: "50px",
            transform: "translateY(-30%)",
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            pointerEvents: "none",
            boxShadow: "0px 0px 8px 2px #c8c8c8",
          }}
        >
          <h1 className="text-[1.8rem] font-semibold flex items-center gap-4">
            Features
          </h1>
          {service.offerings.map((offering, index) => {
            return (
              <div
                key={index}
                className="flex items-start gap-4 my-4 border-b-[1px] py-2 border-opacity-20 border-[#c8c8c8]"
              >
                <div className="flex-shrink-0">
                  <IoCheckmarkCircleOutline
                    className="text-[#ffce08]"
                    size={15}
                  />
                </div>
                <h3 className="break-words text-[1.5rem] font-semibold">
                  {offering}
                </h3>
              </div>
            );
          })}
        </div>
      )}
      {/* for mobile */}
      <div className="lg:hidden w-[80%] mx-auto">
        <h1 className="text-[1.5rem] mt-4 font-semibold flex items-center gap-4">
          Features
        </h1>
        {service.offerings.map((offering, index) => {
          return (
            <div
              key={index}
              className="flex items-start gap-4 my-4 border-b-[1px] py-2 border-opacity-20 border-[#c8c8c8]"
            >
              <div className="flex-shrink-0">
                <IoCheckmarkCircleOutline
                  className="text-[#ffce08]"
                  size={15}
                />
              </div>
              <h3 className="break-words text-[1.2rem] font-semibold">
                {offering}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
