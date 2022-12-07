import { getMonth } from "../calenderUtils";
import Month from "../Month";
import CalenderHeader from "../CalenderHeader";
import React from "react";
import { DataContext } from "../../../NavWrapper";
import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const MainCalender = ({ Data }) => {
  const [searchParams, setSearchParams] = useSearchParams({ id: "" });
  const id = searchParams.get("id");
  const item = Data.filter((task) => task._id == id)[0];
  const [taskInfo, setTaskInfo] = useState(item ? item : {});
  const [popUpShowing, setPopUpShowing] = useState(item ? true : false);
  const [monthIndex, setMonthIndex] = useState(
    item
      ? dayjs(taskInfo.due).month() +
          (dayjs(taskInfo.due).year() - dayjs().year()) * 12
      : dayjs().month()
  );

  const [currentMonth, setCurrentMonth] = useState(getMonth(monthIndex));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="h-screen flex dark:bg-black bg-white flex-col justify-between items-center">
      <div className="w-full ">
        <CalenderHeader
          month={currentMonth}
          monthIndex={monthIndex}
          setMonthIndex={setMonthIndex}
        />
      </div>

      {popUpShowing && (
        <div className="fixed   w-[100%] h-[100%] bg-transparent flex justify-center items-center">
          <div className="lg:w-[50%] rounded-md border border-[#c5c5c5] dark:border-none shadow-lg shadow-[#262626 h-[40%] w-[80%]  dark:bg-[#262626] p-4 bg-white">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setPopUpShowing(false);
              }}
            >
              x
            </div>
            <div className="h-full">
              {taskInfo && (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex flex-row gap-x-4 items-center">
                      <div
                        className={` h-[20px] w-[20px]  text-white rounded-[5px] 
         ${taskInfo.status == "urgent" && "bg-[#FF452C] "} ${
                          taskInfo.status == "casual" && "bg-[#00FF47]"
                        } ${taskInfo.status == "regular" && "bg-timeline"}`}
                      ></div>
                      <p className=" font-semibold text-[28px] ">
                        {taskInfo.details}
                      </p>
                    </div>
                    <p>{taskInfo.due}</p>
                  </div>
                  <div className=" w-full mb-4 flex justify-end">
                    <Link to={`/dashboard/all/edit/${taskInfo._id}`}>
                      <button className="p-[6px] text-white rounded-md bg-timeline">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full dark:bg-black bg-white flex flex-1">
        <Month
          setTaskInfo={setTaskInfo}
          setPopUpShowing={setPopUpShowing}
          Data={Data}
          months={currentMonth}
        />
      </div>
    </div>
  );
};

export default MainCalender;
