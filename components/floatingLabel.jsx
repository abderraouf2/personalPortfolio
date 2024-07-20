import { useState } from "react";
import Image from "next/image";
const FloatingLabel = ({
  label,
  name,
  type,
  value,
  onChange,
  errorMgs,
  switchShowPAss,
  showEye,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative mt-[30px] w-full">
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 pl-70 "
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        className={`absolute ${
          isFocused || value ? "top-[-20%]" : "top-2"
        } left-0 mx-2 transition-all duration-300 ease-in-out bg-white ${
          isFocused || value
            ? "text-indigo-500 text-xs"
            : "text-gray-500 text-base"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      {type === "password" && showEye ? (
        <Image
          className="absolute top-[25%]  right-2"
          src="/assets/icons/closedeye.svg"
          width={20}
          height={20}
          onClick={switchShowPAss}
        />
      ) : (
        type === "text" &&
        showEye && (
          <Image
            className="absolute top-[25%]  right-2"
            src="/assets/icons/openeye.svg"
            width={20}
            height={20}
            onClick={switchShowPAss}
          />
        )
      )}
      {errorMgs && (
        <p className="absolute top-[100%] text-red-500 text-xs mt-1 ">
          {errorMgs}
        </p>
      )}
    </div>
  );
};

export default FloatingLabel;
