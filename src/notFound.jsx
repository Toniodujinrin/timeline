import React from "react";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f8f1e6] p-4  h-screen w-screen">
      <img src={logo} className="w-[50px] h-[50px]" alt="" />
      <div className="w-full h-full  flex justify-center flex-col items-center bg-[#f8f1e6]">
        <img className="w-[70vw] h-[50vh]" src="../notFound.svg" alt="" />
        <h1 className="text-black font-semibold text-[28px] mt-4">
          This page does not exist{" "}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="w-[100px] text-white rounded-md py-2 bg-timeline"
        >
          {" "}
          Go Back{" "}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
