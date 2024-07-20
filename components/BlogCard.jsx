import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
export default function BlogCard(props) {
  const router = useRouter();
  const { title, timeToRead, _id, description, bannerImg, categories } = props;
  const getDescription = (desc) => {
    const words = desc?.split(" ");
    const truncatedDescription =
      words?.slice(0, 30).join(" ") + (words?.length > 30 ? "..." : "");
    return truncatedDescription;
  };
  return (
    <div
      className="flex flex-col-reverse xs:flex-row justify-between gap-[10%] xs:p-3 items-center cursor-pointer"
      onClick={() => {
        router.push(`/blogs/${_id}`);
      }}
    >
      <div className="w-full s:w-[90%] mt-[3%] xs:mt-0 xs:w-[75%] gap-2">
        <h1 className="text-[18px] sm:text-[20px] l:text-[24px] font-medium">
          {title}
        </h1>
        <p className="text-[12px] l:text-[14px] font-[300]">
          {getDescription(description)}
        </p>

        <div className="flex gap-2 mt-[3%] flex-wrap items-center">
          {categories.map((category, index) => (
            <span
              key={index}
              className="py-1 px-4 text-[10px] sm:text-[12px] font-[500] rounded-xl bg-[#043873] bg-opacity-10 "
            >
              {category}
            </span>
          ))}
          <p className="text-[10px] sm:text-[12px] l:text-[14px] ">
            {timeToRead} read
          </p>
        </div>
      </div>
      <div className="w-full s:w-[90%] xs:w-[25%] flex items-center justify-center">
        <Image
          width={1080}
          height={720}
          className="w-[100%] h-[fit-content]"
          src={`${bannerImg}`}
          alt={title}
        />
      </div>
    </div>
  );
}
