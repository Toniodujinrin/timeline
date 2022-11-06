import React from "react";
import logo from "../../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../../assets/leftArrow.svg";

import Dashboard from "./icons/dashboarIcon";
import All from "./icons/allTaksIcon";
import Settings from "./icons/settingsIcon";
import Timers from "./icons/timersIcon";
import Calender from "./icons/calenderIcon";
import Logout from "./icons/logoutIcon";
import { themeContext } from "./../../../App";
import { useContext } from "react";

const getIcon = (fill, iconPath) => {
  switch (iconPath) {
    case "Dashboard":
      return <Dashboard fill={fill} />;
    case "All Tasks":
      return <All fill={fill} />;
    case "Calendar":
      return <Calender fill={fill} />;
    case "Timers":
      return <Timers fill={fill} />;
    case "Settings":
      return <Settings fill={fill} />;
    case "Log out":
      return <Logout fill={fill} />;
  }
};

const NavButton = ({ isActive, text, path, onClick }) => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("users");
  };
  return (
    <Link to={path}>
      <button
        onClick={text == "Log out" ? navigate("/logou") : onClick}
        className={` transition-[100ms] inline-flex w-full h-[56px]  ${
          isActive
            ? "text-timeline border-l-4 border-timeline border-solid bg-[#303030]   py-[15px] "
            : "text-[#a4a6b3]"
        }  ${
          text == "Log out" ? "hover:border-[#FF452C]" : "hover:border-timeline"
        } hover:border  hover:border-solid hover:border-l-4 hover:border-r-0 hover:border-y-0   font-medium poppinsFont text-[16px]   px-[16px] items-center gap-x-[20px]`}
      >
        {getIcon(isActive ? "#ff9900" : "#a4a6b3", text)}
        {text}
      </button>
    </Link>
  );
};

const SideBar = ({ isShowing, setOpen }) => {
  const setTheme = useContext(themeContext);
  const toggler = false;
  const location = useLocation();
  return (
    <div>
      <div className="w-[255px] z-20 fixed h-screen hidden lg:flex flex-col items-center py-4  bg-[#262626]  dark:bg-[#262626]">
        <div>
          <img src={logo} className="w-[60px] h-[60px]" alt="" />
        </div>

        <div className="w-full my-[20px] border-b border-solid border-[#DFE0EB]">
          <NavButton
            text="Dashboard"
            isActive={location.pathname == "/dashboard"}
            path={"/dashboard"}
          />
          <NavButton
            text="All Tasks"
            isActive={location.pathname == "/dashboard/all"}
            path="/dashboard/all"
          />
          <NavButton
            text="Calendar"
            isActive={location.pathname == "/dashboard/calendar"}
            path="/dashboard/calendar"
          />
          <NavButton
            text="Timers"
            isActive={location.pathname == "/dashboard/timers"}
            path="/dashboard/timers"
          />
          <NavButton
            text="Settings"
            isActive={location.pathname == "/dashboard/settings"}
            path="/dashboard/settings"
          />
          <NavButton text="Log out" isActive={location.pathname == "/login"} />

          <div
            className={` transition-[100ms] inline-flex w-full h-[56px]  font-medium poppinsFont text-[16px]   px-[16px] items-center gap-x-[20px]`}
          >
            <p className="text-[#a4a6b3]">Dark Mode</p>
            <label class="switch">
              <input
                type="checkbox"
                onClick={() => {
                  setTheme();
                }}
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      {isShowing && (
        <div className="w-[255px] z-40 fixed  h-screen lg:hidden  flex flex-col items-center py-4  bg-[#262626]  dark:bg-[#262626]">
          <div
            onClick={() => setOpen()}
            className="w-full pr-4 flex justify-end items-center"
          >
            <button>
              {" "}
              <img src={leftArrow} alt="" />
            </button>
          </div>

          <div className="w-full my-[20px] border-b border-solid border-[#DFE0EB]">
            <NavButton
              text="Dashboard"
              isActive={location.pathname == "/dashboard"}
              path={"/dashboard"}
              onClick={setOpen}
            />
            <NavButton
              text="All Tasks"
              isActive={location.pathname == "/dashboard/all"}
              path="/dashboard/all"
              onClick={setOpen}
            />
            <NavButton
              text="Calendar"
              isActive={location.pathname == "/dashboard/calendar"}
              path="/dashboard/calendar"
              onClick={setOpen}
            />
            <NavButton
              text="Timers"
              isActive={location.pathname == "/dashboard/timers"}
              path="/dashboard/timers"
              onClick={setOpen}
            />
            <NavButton
              text="Settings"
              isActive={location.pathname == "/dashboard/settings"}
              path="/dashboard/settings"
              onClick={setOpen}
            />
            <NavButton
              text="Log out"
              isActive={location.pathname == "/login"}
              path="/login"
            />
            <div
              className={` transition-[100ms] inline-flex w-full h-[56px]  font-medium poppinsFont text-[16px]   px-[16px] items-center gap-x-[20px]`}
            >
              <p className="text-[#a4a6b3]">Dark Mode</p>
              <label class="switch">
                <input
                  type="checkbox"
                  onClick={() => {
                    setTheme();
                  }}
                />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
