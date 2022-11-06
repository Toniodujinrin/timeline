import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Day = ({ day, rowIndex, Data, setTaskInfo, setPopUpShowing }) => {
  const navigate = useNavigate();
  const getCurrentDay = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-timeline text-white rounded-full w-7"
      : "";
  };
  return (
    <div className="border dark:bg-black bg-white border-gray-200 flex flex-col">
      <header className="flex flex-col items-center cursor-pointer ">
        {rowIndex === 0 && (
          <p className="text-sm text-black dark:text-white mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}

        <p
          onClick={() =>
            navigate(`/dashboard/all/add?due=${day.format("YYYY-MM-DD")}`)
          }
          className={`text-sm  text-black dark:text-white p-1 my-1 ${getCurrentDay()} text-center`}
        >
          {day.format("DD")}
        </p>
        <ul className="w-full">
          {Data.filter((task) => task.due == day.format("YYYY-MM-DD")).map(
            (task) => (
              <p
                onClick={() => {
                  setTaskInfo(task);
                  setPopUpShowing(true);
                }}
                className={` cursor-pointer text-white w-full h-fit p-[2px] rounded-md ${
                  task.status == "urgent" && "bg-[#FF452C] "
                } ${task.status == "casual" && "bg-[#00FF47]"} ${
                  task.status == "regular" && "bg-timeline"
                }`}
              >
                {`${task.details.split("").splice(0, 12).join("")}...`}
              </p>
            )
          )}
        </ul>
      </header>
    </div>
  );
};

export default Day;
