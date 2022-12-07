import * as React from "react";

const FilterComp = ({ setFiltered, filtered }) => {
  return (
    <div>
      
      <select
        className="p-2 text-black dark:text-white border border-[#c5c5c5] dark:border-none rounded-md bg-white dark:bg-[#262626]"
        onChange={(e) => setFiltered(e.currentTarget.value)}
        value={filtered}
      >
        <option value={"Pending"}>Pending</option>

        <option value="Urgent">Urgent</option>
        <option value="Regular">Regular</option>
        <option value="Casual">Casual</option>
        <option value="Completed">Completed</option>
        <option value="All">All</option>
      </select>
    </div>
  );
};

export default FilterComp;
