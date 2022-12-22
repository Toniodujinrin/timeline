import React from "react";
import { putTask } from "../../../../data-store";
import { useState, useContext } from "react";
import check from "../../../../assets/Icon.svg";
import { toast } from "react-toastify";
import { UserContext } from "../../../../NavWrapper";

const Card = ({ task }) => {
  const [isComplete, setIsComplete] = useState(task.completed);
  const user = useContext(UserContext);
  const setComplete = async () => {
    try {
      const data = await putTask(
        {
          taskId: task._id,
          completed: !task.completed,
          details: task.details,
        },
        user
      );
      if (data) {
        toast.success("task successfuly marked as completed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("could not mark task as complete", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
        } border-timeline h-[20px] rounded-full flex justify-center items-center border border-solid `}
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
