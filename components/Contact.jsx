import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import styles from "./contact.module.scss";
import CalendlyPopup from "./CalendlyPopup";
import ParticlesComponent from "./Particles";
export default function Contact({ mainRef }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (fullName.trim() === "") {
      errors.fullName = "Full Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (message.trim() === "") {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const postEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log("Form is valid");
    console.log(fullName, email, message, validateForm());
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        email,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    console.log({ isInView });
  }, [isInView]);

  return (
    <div className={styles.letsTalkWrapper} id="contact">
      <ParticlesComponent id="contactParticles" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={styles.contactWrapper}
        style={{
          backgroundColor: isInView ? "#03112b" : "transparent",
        }}
      >
        <div>
          <p className={styles.p}>want to start a project?</p>
          <h1 className={styles.title}>Let&apos;s talk</h1>
        </div>
        <div className={styles.contactForm}>
          <form>
            <div className={styles.inputWrapper}>
              <input
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
              />
              {errors.fullName && (
                <p className="text-red-700">{errors.fullName}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className={styles.inputWrapper}>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                required
                placeholder="Message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500">{errors.message}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              {/* <button
                type="submit"
                onClick={postEmail}
                className={styles.SubmitBtn}
              >
                Send
              </button> */}
              <span className="flex justify-center mt-3 ">
                <a
                  className="cursor-pointer w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#fff]   border-2 border-[#fff] "
                  style={{
                    animation: "exampleAnimation .8s ease-in-out",
                    // animationDelay: ".1s",
                  }}
                  onClick={postEmail}
                >
                  Send Message
                </a>
              </span>
            </div>
          </form>
        </div>
        <h4 className="text-white text-[2rem] ">or</h4>
        <span className="flex justify-center mt-3 ">
          <a
            className="cursor-pointer w-[fit-content] h-[fit-content] py-[0.8rem] px-[1.6rem] text-center text-[1.6rem] font-bold text-[#fff]   border-2 border-[#fff] "
            style={{
              animation: "exampleAnimation .8s ease-in-out",
              // animationDelay: ".1s",
            }}
            onClick={() => {
              setIsCalendlyOpen(true);
            }}
          >
            Schedule a meeting
          </a>
        </span>
        <CalendlyPopup
          url="https://calendly.com/mimoune-abderraouf/web-summit-connections"
          isOpen={isCalendlyOpen}
          onClose={() => {
            setIsCalendlyOpen(false);
          }}
        />
      </motion.div>
    </div>
  );
}
