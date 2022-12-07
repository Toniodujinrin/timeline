import React from "react";

const Sort = ({ sort, setSort }) => {
  return (
    <div>
      
      <select
        selected={sort}
        className="p-2 text-black dark:text-white border bg-white dark:bg-[#262626] border-[#c5c5c5] dark:border-none rounded-md "
        onChange={(e) => setSort(e.currentTarget.value)}
        value={sort}
      >
        <option className="focus:bg-none hover:bg-none" value="ascending">
          Ascending
        </option>
        <option value="descending">Descending</option>
      </select>
    </div>
  );
};

export default Sort;
