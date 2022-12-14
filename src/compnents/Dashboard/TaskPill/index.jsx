import React from "react";
import { format, formatDistance } from "date-fns";
import { useState, useContext } from "react";
import edit from "../../../assets/edit.svg";
import calendar from "../../../assets/calender.svg";
import trash from "../../../assets/trash.svg";
import check from "../../../assets/Icon.svg";
import { putTask } from "../../../data-store";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../NavWrapper";

const TaskPill = ({
  details,
  dueTime,
  createdTime,
  status,
  completed,
  setAction,
  setShowing,
  setTaskId,
  id,
  setPopUp,
}) => {
  const user = useContext(UserContext);
  const [isComplete, setComplete] = useState(completed);
  const navigate = useNavigate();
  const setCompleted = async () => {
    setComplete(!isComplete);

    try {
      const data = await putTask(
        {
          taskId: id,
          completed: !completed,
          details: details,
        },
        user
      );
    } catch (error) {
      alert("could not mark task as complete");
    }
  };

  const [showActions, setShowActions] = useState(false);
  return (
    <div className="h-[300px] text-black dark:text-white my-4 w-[90%] flex flex-col dark:bg-[#262626] dark:border-black justify-between  rounded-md  border boder-solid p-4 shadow-xl  ]">
      <div className="h-[80%] w-full ">
        <div className="flex flex-row w-full items-center justify-between px-2">
          <div
            className={` h-[20px] w-[20px] mb-4 text-white rounded-full 
         ${status == "urgent" && "bg-[#FF452C] "} ${
              status == "casual" && "bg-[#00FF47]"
            } ${status == "regular" && "bg-timeline"}`}
          ></div>
          <div className="w-[20px] ">
            <button
              className=" pb-2 text-[36px]"
              onClick={() => setShowActions(!showActions)}
            >
              ...
            </button>
          </div>
        </div>
        <div className="w-full flex h-[90%] flex-row">
          <p className="text-[21px] w-[90%] h-[90%] font-semibold">{details}</p>
          {showActions && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              className="h-[90%] bg-[#c5c5c5] dark:bg-[#191919] ml-4 w-[15%]  rounded-md  items-center justify-around flex flex-col"
            >
              <button
                onClick={() => {
                  setAction("Edit");
                  setTaskId(id);
                  setShowing(true);
                }}
              >
                <img src={edit} alt="" />
              </button>
              <button
                onClick={() => {
                  navigate(`/dashboard/calendar/view?id=${id}`);
                }}
              >
                <img src={calendar} alt="" />
              </button>
              <button
                onClick={() => {
                  setPopUp(true);
                  setTaskId(id);
                }}
              >
                <img src={trash} alt="" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between mt-6">
        <button
          onClick={() => setCompleted()}
          className={` w-[30px] h-[30px] ${
            isComplete && `bg-timeline`
          } rounded-full border-timeline flex justify-center items-center border`}
        >
          {isComplete && (
            <img className="w-[20px] h-[20px]" src={check} alt="" />
          )}
        </button>

        <div className="flex flex-col gap-y-3 self-end">
          <div className=" flex flex-row gap-x-2">
            <p className="text-sm font-semibold">due:</p>
            <p className="    text-sm">{dueTime}</p>
          </div>

          <div className=" flex flex-row gap-x-2">
            <p className="text-sm font-semibold">created:</p>
            <p className="   text-sm">
              {`
          ${formatDistance(new Date(createdTime), new Date(Date.now()), {
            addSuffix: true,
          })}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPill;
