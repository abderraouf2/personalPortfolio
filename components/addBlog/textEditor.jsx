import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: ["small", false, "large"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
];

const TextEditor = (props) => {
  const { setcontent, content } = props;

  useEffect(() => {
    const registerQuillFormats = () => {
      const Quill = require("react-quill").Quill;
      const Size = Quill.import("formats/size");
      Size.whitelist = ["small", "medium", "large"];
      Quill.register(Size, true);
    };

    if (typeof window !== "undefined") {
      registerQuillFormats();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <ReactQuill
        value={content}
        onChange={(value) => setcontent(value)}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
