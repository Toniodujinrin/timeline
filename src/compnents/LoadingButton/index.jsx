import React from "react";
const LoadButton = ({ submit, isLoading, content, color, hoverColor }) => {
  return (
    <button
      disabled={!isLoading}
      className={`w-full pointer-events-none text-white dark:text-white h-[40px] rounded-md hover:scale-110 flex items-center justify-center ${color}`}
    >
      {!isLoading ? <p>{content}</p> : <div class="bars-7"></div>}
    </button>
  );
};

export default LoadButton;
