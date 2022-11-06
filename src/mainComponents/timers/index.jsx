import React from "react";
import Pomodoro from "../../../Components/Timers/Pomodoro";
import Wrapper from "../../../Components/Dashboard/NavWrapper";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from "axios";

const Timers = () => {
  const [selected, setSelected] = useState("Pomodoro");
  const payload = {
    email: "todujinrin@gmail.com",
    firstName: "Toniloba",
    lastName: "Odujinrin",
    password: "Toniloba2004",
  };
  let config = {
    headers: {
      token: `nqniqqiasoqmelhnbdkd`,
    },
  };
  const callaxios = async () => {
    const res = await axios.get(
      `http://127.0.0.1:3200/users?email=tonilobaodujinrin@gmail.com`,
      config
    );
    console.log(res);
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center ">
        <div className="w-[40%] cursor-pointer shadow-lg  transition-[5000ms] rounded-[24px] h-[50px] mt-4 bg-[#f4f1f1] flex px-2 flex-row justify-between items-center dark:bg-[#262626]">
          <button
            onClick={() => {
              setSelected("Pomodoro");
            }}
            className={`  cursor-pointer transition-[5000ms] w-[50%] ${
              selected == "Pomodoro" &&
              "shadow-inner shadow-[#262626]  bg-timeline text-white"
            } rounded-[21px] h-[40px] items-center flex justify-center`}
          >
            Pomodoro
          </button>

          <button
            onClick={() => {
              setSelected("Standard");
            }}
            className={`w-[50%] ${
              selected == "Standard" &&
              "shadow-inner shadow-[#262626] bg-timeline text-white"
            } flex justify-center items-center rounded-[21px] h-[40px] `}
          >
            Standard
          </button>
        </div>
        <button onClick={() => callaxios()}>test</button>
      </div>
    </Wrapper>
  );
};

export default Timers;
