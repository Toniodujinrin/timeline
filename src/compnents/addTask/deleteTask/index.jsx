import React from "react";

import { motion } from "framer-motion";

const DeleteTaskPop = ({ taskId, setPopUp, sendDelete }) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="lg:w-[35%] w-[80%] h-[40%]   border border-[#cccccc] justify-self-center items-center fixed bottom-[150px]   self-center flex  flex-col justify-around dark:bg-[#363636] rounded-md bg-slate-50 "
    >
      <h1 className="text-center text-[21px] text-black dark:text-white">
        Are you sure you want to delete this task permamnently?
      </h1>
      <div className="flex flex-row gap-x-8">
        <button
          className="p-2 rounded-md bg-[#00FF47] text-white"
          onClick={() => {
            setPopUp(false);
          }}
        >
          Cancel
        </button>
        <button
          className="p-2 rounded-md bg-[#EF2E2E] text-white"
          onClick={() => {
            sendDelete(taskId);
            setPopUp(false);
          }}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default DeleteTaskPop;
