import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import cheveronLeft from "../../../assets/chevron-left.svg";
import cheveronRight from "../../../assets/chevron-right.svg";

const CalenderHeader = ({ setMonthIndex, monthIndex }) => {
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  return (
    <header className="px-4 py-2 flex items-center">
      <button
        onClick={() => setMonthIndex(dayjs().month())}
        className="border text-black dark:text-white rounded-md py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={() => handlePrevMonth()}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <img src={cheveronLeft} alt="" />
        </span>
      </button>
      <button
        onClick={() => {
          handleNextMonth();
        }}
      >
        <span className="cursor-pointer text-gray-600 mx-2">
          <img src={cheveronRight} alt="" />
        </span>
      </button>
      <h2 className="ml-4 text-xl text-timeline">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default CalenderHeader;
