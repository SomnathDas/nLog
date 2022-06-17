import { useState } from "react";

const InputBar = ({ placeholder, type }) => {
  return (
    <input
      className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
      placeholder={`${placeholder || ""}`}
      type={`${type || "text"}`}
    />
  );
};

export default InputBar;
