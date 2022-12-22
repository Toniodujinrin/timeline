import SideBar from "../compnents/Dashboard/SideNav";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import TopNav from "../compnents/Dashboard/topnav";
import { useState, useContext } from "react";
import Dashboard from "../mainComponents/dashboard";
import All from "../mainComponents/all";
import Calender from "./../mainComponents/calender/index";
import { useQuery } from "react-query";

import Settings from "../mainComponents/settings";
import { useEffect } from "react";
import axios from "axios";

export const DataContext = React.createContext();
export const UserContext = React.createContext();
const Wrapper = ({ children }) => {
  const navigate = useNavigate();
  const user =
    typeof localStorage.getItem("user") == "string" &&
    localStorage.getItem("user").length !== 0
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const config = {
    headers: {
      token: user && user !== null ? user._id : 1234,
    },
  };
  const rootDir = "https://timeline-backend.vercel.app/";
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${rootDir}users?email=${user.userEmail}`,
        config
      );

      if (data) {
        return data;
      } else return {};
    } catch (error) {
      throw new Error("could not get data from the server");
    }
  };

  const { data, status } = useQuery("user", getData);
  const [isShowing, setShowing] = useState(false);

  const setOpen = () => {
    setShowing(!isShowing);
  };

  const verifyLoggedIn = () => {
    if (user && user.expires > Date.now()) {
      return;
    } else {
      navigate("/login", { replace: true });
    }
  };
  verifyLoggedIn();

  return (
    <UserContext.Provider value={user}>
      <DataContext.Provider value={data}>
        <div className="flex flex-row dark:bg-black bg-white ">
          <SideBar isShowing={isShowing} setOpen={setOpen} />
          <div className="lg:w-full w-screen flex flex-col  ">
            <TopNav setOpen={setOpen} />
            <div className="lg:block hidden">
              <div className="pl-[255px] pt-[80px] w-full h-[1024px] dark:bg-black bg-white min-h-screen min-w-screen ">
                {status == "loading" ? (
                  <div className="  w-full min-h-[calc(100vh-100px)] dark:bg-black bg-white pl-[30px] pr-[40px] flex justify-center items-center  pb-[43px]">
                    <div className="m-auto">
                      <div className="spinner-5"></div>
                    </div>
                  </div>
                ) : status == "success" && data ? (
                  <div className=" w-full min-h-[calc(100vh-100px)] dark:bg-black bg-white pl-[30px] pr-[40px]  pb-[43px]">
                    <Routes>
                      <Route path="all/add" element={<All />} />
                      <Route path="all/edit/:id" element={<All />} />
                      <Route path="all" element={<All />} />
                      <Route path="" element={<Dashboard />} />
                      <Route path="calendar/view" element={<Calender />} />
                      <Route path="calendar" element={<Calender />} />
                      <Route path="settings" element={<Settings />} />
                    </Routes>
                  </div>
                ) : (
                  <div className=" w-full min-h-[calc(100vh-100px)] dark:bg-black bg-white pl-[30px] pr-[40px] text-black dark:text-white  pb-[43px]">
                    Could not get data from server check connection and try
                    again
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                setShowing(false);
              }}
              className=" lg:hidden w-full h-full pt-[80px]  "
            >
              {status == "loading" ? (
                <div className="h-screen w-full flex justify-center items-center">
                  <div className="spinner-5 mb-[80px]"></div>
                </div>
              ) : status == "success" && data ? (
                <div className="pt-[50px]">
                  <Routes>
                    <Route path="calendar/view" element={<Calender />} />
                    <Route path="all/add" element={<All />} />
                    <Route path="all/edit/:id" element={<All />} />
                    <Route path="all" element={<All />} />
                    <Route path="" element={<Dashboard />} />

                    <Route path="calendar" element={<Calender />} />

                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </div>
              ) : (
                <div className=" h-screen w-full text-center">
                  <h1 className="text-black dark:text-white">
                    Could not get data from server check connection and try
                    again
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </DataContext.Provider>
    </UserContext.Provider>
  );
};

export default Wrapper;
