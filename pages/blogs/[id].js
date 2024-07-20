import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import PageLoader from "@/components/loader/PageLoader";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import styles from "@/styles/Blogs.module.scss";
import Link from "next/link";

export default function index() {
  const router = useRouter();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const BlogId = router.query.id;
  const fetchBlogData = () => {
    console.log({ BlogId });
    BlogId &&
      fetch(`/api/getBlog?id=${BlogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log({ RESD: data });
          setBlog(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
  };
  useEffect(() => {
    fetchBlogData();
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, [BlogId]);
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
      <div>
        <div className="fixed top-10 left-0 w-full px-[2%] flex gap-8 justify-end items-center">
          <Link href="/blogs">
            <button className="text-[20px] font-[600] hover:text-[#3AC4AC] duration-300">
              .Blogs
            </button>
          </Link>
          <Link href="/">
            <button className="text-[20px] font-[600] hover:text-[#3AC4AC] duration-300">
              .Home
            </button>
          </Link>
        </div>
        <div className="mt-[20%] w-full px-[2%] xs:px-[5%] md:px-[10%] l:px-[20%]">
          <h1 className="m-auto text-[28px] font-[600] md:text-[36px] l:text-[42px] text-center">
            {" "}
            {blog.title}{" "}
          </h1>

          <p className="text-[14px] font-[450] md:text-[16px] l:text-[16px] my-4">
            {" "}
            {blog.description}{" "}
          </p>
          <div className="flex flex-wrap gap-2 my-[3%] items-center">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className="py-1 px-4 rounded-xl bg-[#043873] font-[500] bg-opacity-10 "
              >
                {category}
              </span>
            ))}
            <p>{blog.timeToRead} read</p>
          </div>
          <Image
            loading={"lazy"}
            src={blog.bannerImg}
            className="w-full h-[fit-content] m-auto"
            alt={blog.title}
            width={1080}
            height={720}
          />
          <div className="my-6 rounded">
            <div
              className={styles.blogContent}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
