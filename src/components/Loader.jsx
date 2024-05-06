import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex items-center text-3xl min-h-screen justify-center min-w-full animate-spin">
      <AiOutlineLoading3Quarters />
    </div>
  );
};

export default Loader;
