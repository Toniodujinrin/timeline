import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      className=" text-black rounded-md  bg-white dark:bg-[#262626] dark:text-white border border-[#c5c5c5]  lg:w-[300px] w-[70%] lg:ml-0 ml-4  focus:outline-none focus:border-timeline  dark:border-white  p-1 "
      type="text"
      value={search}
      placeholder="Search for a task ..."
      onChange={(e) => {
        setSearch(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBar;
