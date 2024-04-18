import React, { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";

const CalendlyPopup = ({ url, isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <PopupModal
        url={url}
        open={isOpen}
        onModalClose={() => {
          onClose();
        }}
        rootElement={document?.getElementById("contact")} // Set rootElement to a valid DOM element

        // Add any additional props you need
      />
    )
  );
};

export default CalendlyPopup;
