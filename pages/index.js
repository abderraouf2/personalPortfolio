import { useEffect, useState } from "react";
import Head from "next/head";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  });
  return (
    <main>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/profile-pic.png" type="image/png" />
        <title>Abderraouf - Mimoune</title>
      </Head>
      <div>
        <Banner />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
