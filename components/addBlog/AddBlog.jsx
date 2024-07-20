"use client";

import React, { useEffect, useState } from "react";
import TextEditor from "./textEditor";
import FloatingLabel from "../floatingLabel";
// import axios from "axios";

export default function AddBlog() {
  const [blog, setBlog] = useState({
    title: "",
    bannerImg: "",
    description: "",
    categories: [],
    content: "",
    timeToRead: "",
  });
  const [category, setCategory] = useState("");
  const [content, setcontent] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBlog((prevProduct) => ({
      ...prevProduct,
      [name]: value, // Update the corresponding attribute dynamically
    }));
    console.log({ blog });
  };
  useEffect(() => {
    console.log({ content });
  }, [content]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setBlog((prev) => ({ ...prev, bannerImg: base64 }));
    console.log({ base64 });
  };

  const createBlog = () => {
    console.log({ blog });
    fetch("/api/CreateBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setBlog({
          title: "",
          bannerImg: "",
          description: "",
          categories: [],
          content: "",
          timeToRead: "",
        });
      })
      .catch((err) => {
        console.log({ err });
      });

    // axios
    //   .post(`${process.env.SERVER_URL}/blogs/newBlog`, blog, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log({ res });
    //     setBlog({
    //       title: "",
    //       bannerImg: "",
    //       description: "",
    //       categories: [],
    //       content: "",
    //       timeToRead: "",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });
  };
  const addContent = (value) => {
    setBlog((prev) => ({ ...prev, content: value }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000] flex justify-center items-center bg-opacity-30 ">
      <div className="w-[50%] h-[fit-content] max-h-[95%] bg-[#fff] overflow-y-scroll">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-[24px]">Add a new blog</h2>
          <button className="text-[24px] text-red-500">X</button>
        </div>
        <div className="p-4">
          <FloatingLabel
            label="Title"
            name="title"
            type="text"
            value={blog.title}
            onChange={handleInputs}
            errorMgs={errorMessages.email}
          />
          <FloatingLabel
            label="description"
            name="description"
            type="text"
            value={blog.description}
            onChange={handleInputs}
            errorMgs={errorMessages.description}
          />
          <FloatingLabel
            label="timeToRead"
            name="timeToRead"
            type="text"
            value={blog.timeToRead}
            onChange={handleInputs}
            errorMgs={errorMessages.timeToRead}
          />
        </div>
        <div className="p-4">
          <input
            type="file"
            onChange={(e) => uploadImage(e)}
            placeholder="banner image"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-[#2F9ED8] text-white p-2 rounded"
            onClick={() => {
              setBlog((prev) => ({
                ...prev,
                categories: [...prev.categories, category],
              }));
              setCategory("");
            }}
          >
            {" "}
            Add category
          </button>
        </div>
        <div className="flex gap-2 my-2 p-4">
          {blog.categories.map((category, index) => {
            return (
              <span
                key={index}
                className="p-1 rounded-lg bg-[#2F9ED8] bg-opacity-30"
              >
                {category}
              </span>
            );
          })}
        </div>
        <TextEditor content={blog.content} setcontent={addContent} />
        <div className="p-4">
          <button
            className="bg-[#2F9ED8] text-white p-2 rounded"
            onClick={createBlog}
          >
            Save blog
          </button>
        </div>
      </div>
    </div>
  );
}
