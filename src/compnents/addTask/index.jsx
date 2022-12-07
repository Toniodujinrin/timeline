import React from "react";
import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import leftArrow from "../../assets/leftArrow.svg";

import { useQuery } from "react-query";
import { DataContext } from "./../../NavWrapper/index";

const AddTask = ({
  setShowing,
  sendTask,
  taskId,
  action,
  dueDate,
  EditTask,
}) => {
  const taskid = taskId;
  const dataContext = useContext(DataContext);
  const [Data, setData] = useState(dataContext ? dataContext.tasks : []);
  const task = taskid
    ? Data.filter((task) => task._id == taskid)[0]
    : undefined;
  const [status, setStatus] = useState(
    task && task.status ? task.status : "regular"
  );
  const [due, setDue] = useState(
    task && task.due
      ? new Date(task.due)
      : dueDate
      ? new Date(dueDate)
      : Date.now()
  );
  const [details, setDetails] = useState(task ? task.details : "");
  const [shouldAlert, setShouldAlert] = useState(false);

  const data = {
    details: details,
    due: due,
    status: status,
    createdAt: Date.now(),
    shouldAlert: shouldAlert,
  };

  return (
    <div className="w-full text-black dark:text-white  justify-self-center self-center z-10      border p-4 border-white dark:border-black h-screen">
      <div>
        <div className="flex flex-row gap-x-4">
          <button
            onClick={() => {
              setShowing(false);
            }}
          >
            <img src={leftArrow} alt="" />
          </button>
          {action == "Add" ? (
            <h1 className="font-semibold text-[24px]">Create New Task</h1>
          ) : (
            <h1 className="font-semibold text-[24px]">Edit Task</h1>
          )}
        </div>
        <div className="flex flex-col mt-[50px] ">
          <label>Task Details</label>
          <textarea
            autoFocus={true}
            value={details}
            onChange={(e) => {
              setDetails(e.currentTarget.value);
            }}
            id=""
            className=" focus:outline-none  bg-white dark:bg-[#262626] px-2 pt-2 border-[#282828] focus:border-timeline border w-[100%] h-[40%] resize-none text-[18px] "
            maxLength={110}
          ></textarea>
        </div>
        <div className="mt-[60px]">
          <p className="mb-2">Is your task:</p>
          <div className="w-full flex flex-row justify-around">
            <div
              className={` transition-[1500ms] cursor-pointer w-[25%] flex items-center justify-center h-[50px] border ${
                status == "urgent"
                  ? "text-white bg-[#FF452C]"
                  : "text-[#FF452C]"
              }   border-solid border-[#FF452C] rounded-md`}
              onClick={() => {
                setStatus("urgent");
              }}
            >
              <p> Urgent</p>
            </div>
            <div
              className={` transition-[1500ms] w-[25%] cursor-pointer flex items-center justify-center text-center h-[50px] border ${
                status == "regular" ? "text-white bg-timeline" : "text-timeline"
              }   border-solid border-timeline  rounded-md`}
              onClick={() => {
                setStatus("regular");
              }}
            >
              <p> Regular</p>
            </div>
            <div
              className={`w-[25%] transition-[1500ms] cursor-pointer flex items-center justify-center text-center h-[50px] border ${
                status == "casual"
                  ? "text-white bg-[#00FF47]"
                  : "text-[#00FF47]"
              }   border-solid border-[#00FF47] rounded-md`}
              onClick={() => {
                setStatus("casual");
              }}
            >
              <p> Casual</p>
            </div>
          </div>
        </div>
        <div className="mt-[50px]">
          <p>When is your task due:</p>
          <DatePicker
            className="w-auto outline-none border border-black p-2 bg-white dark:bg-[#262626] text-center rounded-md"
            selected={due}
            onChange={(date) => setDue(date)}
          />
        </div>

        <div className="mt-4 flex flex-row items-center gap-x-4">
          <p>Alert me when its due:</p>
          <label className="switch">
            <input
              value={shouldAlert}
              onClick={() => {
                setShouldAlert(!shouldAlert);
              }}
              type="checkbox"
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="w-full text-white flex justify-end">
          {action == "Add" ? (
            <button
              onClick={() => {
                sendTask(data);
              }}
              className="p-2 rounded-md bg-timeline "
            >
              Create
            </button>
          ) : (
            <button
              onClick={() => {
                data.id = taskId;
                EditTask(data);
              }}
              className="p-2 rounded-md bg-timeline "
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
