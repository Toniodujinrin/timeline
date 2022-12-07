import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, putTask } from "../../../data-store";

import { useState } from "react";

import Card from "./cardDetails/index";

const TaskCard = ({ Data, setCall, call }) => {
  const navigate = useNavigate();
  const date = new Date(Date.now());
  const [dashboardData, setDashBoardData] = useState(Data);

  const todaysTask = dashboardData.filter(
    (task) =>
      new Date(task.due).toISOString().slice(0, 10) ===
      date.toISOString().slice(0, 10)
  );

  return (
    <div className="bg-white dark:bg-[#262626] border border-solid border-[#CCCCCC] dark:border-black rounded-md shadow-md mt-6 h-auto lg:w-full w-[90%] px-4 py-4 ">
      <div className="flex w-full flex-row justify-between items-center">
        <h1 className="text-[19px] text-black dark:text-white font-bold">
          Tasks
        </h1>
        <p
          onClick={() => {
            navigate("/dashboard/all");
          }}
          className="text-timeline text-[16px] cursor-pointer "
        >
          View all
        </p>
      </div>
      <h2 className="text-[#9FA2B4] text-[12px]">today</h2>
      <ul className="h-auto w-full">
        {todaysTask.length > 0 ? (
          todaysTask.map((task) => <Card task={task} />)
        ) : (
          <div className="text-center text-black dark:text-white py-[40px] text-[21px] font-semibold">
            {" "}
            You have no tasks for today
          </div>
        )}
      </ul>
      <div className="w-full flex justify-end">
        <button
          onClick={() => navigate("/dashboard/all/add")}
          className="bg-timeline p-3 rounded-md"
        >
          New
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
