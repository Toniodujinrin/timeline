import Charts from "./chart";
import { useState } from "react";
const Card = ({ Data }) => {
  Data = typeof Data == "object" && Data instanceof Array ? Data : [];
  const urgent = Data.filter(
    (tasks) => tasks.status == "urgent" && !tasks.completed
  ).length;
  const regular = Data.filter(
    (tasks) => tasks.status == "regular" && !tasks.completed
  ).length;
  const casual = Data.filter(
    (tasks) => tasks.status == "casual" && !tasks.completed
  ).length;
  const completed = Data.filter((tasks) => tasks.completed).length;
  return (
    <div className="lg:w-full w-[90%] h-[400px] lg:rounded-md rounded-xl shadow-md  bg-white dark:bg-[#262626] border border-solid dark:border-black border-[#CCCCCC] flex lg:flex-row flex-col items-center justify-between">
      <div className=" text-black dark:text-white flex flex-col h-[90%] lg:h-full lg:w-[65%] w-full  items-center">
        <div className="lg:flex w-full lg:flex-row lg:justify-between mt-4 px-4">
          <p className="text-[18px] lg:block hidden font-medium'">
            Task Visualizer
          </p>
          <div className="  flex gap-x-[40px] flex-row justify-around w-full lg:gap-x-4">
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-[23px] h-[2px] bg-[#FF452C]"></div>
              <p className="text-sm ">Urgent</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-[23px] h-[2px] bg-timeline"></div>
              <p className="text-sm">Regular</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-[23px] h-[2px] bg-[#00FF47]"></div>
              <p className=" text-sm">Casual</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center mt-4 w-[70%] h-[70%]">
          <Charts
            urgent={urgent}
            casual={casual}
            regular={regular}
            completed={completed}
          />
        </div>
      </div>

      <div className="flex text-black dark:text-white  lg:flex-col flex-row justify-around lg:my-auto lg:border-l h-[10%] lg:h-full lg:w-[35%] w-full border-solid dark:border-black border-[#DFE0EB]">
        <div className="flex flex-col  items-center   lg:border-b justify-center border-solid border-[#dfeoeb] lg:dark:border-black border-[#DFE0EB] h-1/3 font-medium text-[16px] lg:text-[21px]">
          <p>{"Urgent Tasks"}</p>
          <p className="mr-4" style={{ color: "#FF452C" }}>
            {urgent}
          </p>
        </div>
        <div className="flex flex-col lg:border-b border-solid justify-center dark:border-black border-[#DFE0EB] h-1/3 items-center font-medium text-[16px] lg:text-[21px]">
          <p>{"Regular Tasks"}</p>
          <p className="mr-4" style={{ color: "#ff9900" }}>
            {regular}
          </p>
        </div>

        <div className="flex  flex-col lg:border-b border-solid justify-center dark:border-black border-[#DFE0EB] h-1/3  font-medium items-center text-[16px] lg:text-[21px]">
          <p>{"Casual Tasks"}</p>
          <p className="mr-4" style={{ color: "#00FF47" }}>
            {`${casual} `}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
