import React, { useState, useEffect } from "react";
import Head from "next/head";
// import axios from "axios";
import BlogCard from "@/components/BlogCard";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import PageLoader from "@/components/loader/PageLoader";

export default function index() {
  const [isLoading, setIsLoading] = useState(true);
  const categories = ["Cloud Computing", "Software Development", "SaaS"];
  const [blogs, setBlogs] = useState([]);

  const fetchAllBlogs = async () => {
    let blogs = [];
    fetch("/api/CreateBlog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
          setIsLoading(false);
        }
        return response.json();
      })
      .then((data) => {
        console.log({ RESD: data });
        setBlogs(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    return blogs;
  };

  useEffect(() => {
    fetchAllBlogs();
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      // console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return isLoading ? (
    <div className="w-full h-[500px] flex items-center justify-center">
      <PageLoader />
    </div>
  ) : (
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
      <div className="w-full">
        <div className="fixed top-10 left-0 w-full px-[2%] flex gap-8 justify-end items-center">
          <Link href="/">
            <button className="text-[20px] font-[600] hover:text-[#587858] duration-300">
              .Home
            </button>
          </Link>
        </div>
        <div className="px-[2%] sm:px-[5%] md:px-[8%] l:px-[10%] flex flex-col-reverse w-full mt-[20%] xs:mt-[12%] md:mt-[8%]">
          {/* <div className="flex gap-3 w-full"> */}
          <div className=" gap-8 w-full lg:w-[70%] p-5">
            <h1 className="font-medium text-center xs:text-left text-[24px] l:text-[28px] my-4">
              Blogs
            </h1>

            <div className="flex flex-col w-full gap-5">
              {isLoading ? (
                <div className="flex justify-center items-center w-full h-[250px]">
                  LOADNG...
                </div>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id}>
                    <BlogCard
                      _id={blog.id}
                      title={blog.title}
                      timeToRead={blog.timeToRead}
                      description={blog.description}
                      bannerImg={blog.bannerImg}
                      categories={blog.categories}
                    />
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="lg:w-[25%] lg:fixed lg:top-[20%] lg:left-[70%] border-l pl-4 border-[#043873]">
            <h1 className="font-medium text-[16px] sm:text-[20px]">
              Categories
            </h1>
            {categories.map((category, index) => {
              return (
                <span
                  key={index}
                  className="py-1 px-4 w-[fit-content] mx-1 m-3 rounded-xl bg-[#043873] bg-opacity-10 whitespace-nowrap inline-block"
                >
                  {category}
                </span>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      </div>
    </main>
  );
}
