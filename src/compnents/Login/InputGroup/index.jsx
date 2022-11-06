import React from "react";
const Input = ({ value, setValue, label, errors, type }) => {
  const handleChange = ({ currentTarget: input }) => {
    setValue(input.value);
  };
  return (
    <div className="flex flex-col w-full mb-8 ">
      <label className=" text-black dark:text-white text-left">{label}</label>
      <input
        className="w-full dark:bg-black bg-white h-[30px] transition-[3000ms] text-black dark:text-white p-1 focus:outline-none dark:focus:border-t-black dark:focus:border-x-black focus:bg-white dark:focus:bg-black focus:border-b-2 focus:border-timeline border-b border-solid border-black dark:border-white "
        value={value}
        onChange={handleChange}
        type={type}
      />
      {errors ? (
        <div>
          <p className="text-red-600">{errors}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Input;
