import React from "react";
import { putTask } from "../../../../data-store";
import { useState } from "react";
import check from "../../../../assets/Icon.svg";
const Card = ({ task }) => {
  const [isComplete, setIsComplete] = useState(task.completed);

  const setComplete = async () => {
    try {
      const data = await putTask({
        taskId: task._id,
        completed: !task.completed,
        details: task.details,
      });
    } catch (error) {
      alert("could not mark task as complete");
    }
  };
  return (
    <li className="flex flex-row justify-between py-[20px] items-center border-t border-solid border-t-[#9fa2b4]">
      <button
        onClick={() => {
          setComplete();
          setIsComplete(!isComplete);
        }}
        className={`w-[20px] ${
          isComplete && "bg-timeline"
        } hover:border-timeline h-[20px] rounded-full flex justify-center items-center border border-solid border-[#9fa2b4]`}
      >
        {isComplete && <img src={check} alt="" />}
      </button>
      <p className="w-[70%] text-black dark:text-white">{task.details}</p>

      <p
        className={`p-1 text-white rounded-md ${
          task.status == "urgent" && "bg-[#FF452C] "
        } ${task.status == "casual" && "bg-[#00FF47]"} ${
          task.status == "regular" && "bg-timeline"
        }`}
      >
        {task.status}
      </p>
    </li>
  );
};

export default Card;
