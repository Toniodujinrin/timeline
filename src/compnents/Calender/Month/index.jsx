import React from "react";
import Day from "./Day";
const Month = ({ months, Data, setTaskInfo, setPopUpShowing }) => {
  return (
    <div className="flex-1 dark:bg-black bg-white grid grid-cols-7 grid-rows-5">
      {months.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, id) => (
            <Day
              setPopUpShowing={setPopUpShowing}
              setTaskInfo={setTaskInfo}
              Data={Data}
              day={day}
              key={id}
              rowIndex={i}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
