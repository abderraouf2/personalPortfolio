import { useEffect, useState } from "react";
import Head from "next/head";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const lenis = new Lenis();

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
        <div className="fixed top-10 z-10 left-0 w-full px-[2%] flex gap-8 justify-end items-center">
          <Link href="/blogs">
            <button className="text-[20px] font-[600] hover:text-[#ffce08] duration-300">
              .Blogs
            </button>
          </Link>
        </div>
        <Banner />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
