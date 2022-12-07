import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "./../../../NavWrapper/index";
import Greeting from "./greeting";
import logo from "../../../assets/logo.svg";
import hamburgerLight from "../../../assets/hamburgerLight.svg";
import hamburgerDark from "../../../assets/hamburgerDark.svg";
import { themeContext } from "../../../App";

const TopNav = ({ setOpen }) => {
  const location = useLocation();
  const setTheme = useContext(themeContext);
  const data = useContext(DataContext);
  const getPage = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/all":
        return "All Tasks";
      case "/dashboard/timers":
        return "Timers";
      case "/dashboard/calender":
        return "Calender";
      case "/dashboard/settings":
        return "Settings";
    }
  };
  return (
    <div>
      <div className="fixed  z-40  left-[255px] top-0 w-[calc(100%-255px)] h-[80px] bg-white dark:bg-[#262626] #bg-white pl-[35px] pt-[0px] pr-[66px] lg:flex hidden justify-between items-center poppinsFont  ">
        <div className=" text-black dark:text-white lg:block hidden font-bold text-[24px]  ">
          {getPage()}
        </div>

        <div className="flex flex-row items-center gap-x-4">
          <div className="flex flex-row items-center gap-x-4">
            <Greeting />
            {data && (
              <p className="text-black font-medium dark:text-white">{`${data.firstName} ${data.lastName}`}</p>
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden bg-[#262626] z-10 fixed px-4 w-screen h-[80px]  flex flex-row items-center justify-between  ">
        <div className="w-[30%]">
          <button onClick={() => setOpen()}>
            <img className="w-[30px]  h-[30px]" src={hamburgerLight} alt="" />
          </button>
        </div>
        <div className="w-[30%] flex justify-center">
          <img className="w-[100px] h-[50px]" src={logo} alt="" />
        </div>
        <div className="w-[30%]"></div>
      </div>
    </div>
  );
};

export default TopNav;
