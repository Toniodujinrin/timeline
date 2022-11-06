import React from "react";

const Greeting = ({ name }) => {
  const date = new Date();
  const getTime = () => {
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return "Good Morning";
    }
    if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    }
    if (hour >= 18 && hour <= 23) {
      return "Good Evening";
    }
  };
  return (
    <div className="flex flex-row">
      <h1 className=" font-semibold text-timeline text-[18px]">{`${getTime()},`}</h1>
    </div>
  );
};
export default Greeting;
