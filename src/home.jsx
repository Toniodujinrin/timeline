import React from "react";
import logo from "./assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { delay, motion } from "framer-motion";
import { type } from "@testing-library/user-event/dist/type";

const Home = () => {
  const navigate = useNavigate();
  const message =
    "Be productive every with Timeline. Keep track of all your tasks and stay on top of your schedule ";
  return (
    <div className="lg:h-screen h-screen w-screen py-4 pl-4 lg:pr-0 bg-[#f8f1e6] overflow-hidden">
      <nav className="text-center text-[32px] flex flex-row items-center justify-between ">
        <img src={logo} className="w-[50px] h-[50px]" alt="" />

        <motion.ul
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, stiffness: 200, type: "spring" }}
          className="text-black text-[17px] gap-x-6 mr-4 flex flex-row items-center "
        >
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="bg-timeline flex items-center hover:shadow-lg hover:shadow-[#c5c5c5] justify-center hover:bg-transparent hover:border hover:scale-110  hover:border-timeline transition-[5000ms] hover:text-timeline  text-white w-[70px] h-auto py-2 rounded-md "
            >
              <p>Sign up</p>
            </button>
          </li>
          <Link to="/login">
            <li className="cursor-pointer transition-[5000ms] hover:text-timeline">
              Login
            </li>
          </Link>
        </motion.ul>
      </nav>

      <main className="flex lg:flex-row flex-col   lg:justify-between">
        <section className="lg:w-[40%] mt-[100px] lg:block flex flex-col ">
          <div className="bg-[#f8f1e6] w-full  ">
            <h1 className="text-black cursor-pointer w-full  h-auto  lg:w-[100%]  text-[32px] dark:text-white">
              {message.split(" ").map((word, index) => (
                <motion.span
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index / 12,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="text-word m-[0.8vmin] relative inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.button
              transition={{ duration: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate("/signup")}
              className="bg-timeline mt-8 px-4 py-2 rounded-md text-white text-[21px]  flex items-center hover:shadow-lg hover:shadow-[#c5c5c5] justify-center hover:bg-transparent hover:border hover:scale-110  hover:border-timeline transition-[5000ms] hover:text-timeline   "
            >
              Get Started
            </motion.button>
          </div>

          <div className=" h-[100%] w-full flex justify-end mt-4p">
            <img
              className=" lg:hidden w-[300px]   overflow-hidden h-[100%]"
              src="../timeline-main-small.svg"
              alt=""
            />
          </div>
        </section>
        <motion.section
          transition={{ duration: 1 }}
          initial={{ x: 200, y: 200, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          className="w-[70%] lg:block hidden  mt-[40px] h-[120vh] overflow-hidden"
        >
          <img
            className="w-full ml-[100px] overflow-hidden h-full"
            src="../timeline-main.svg"
            alt=""
          />
        </motion.section>
      </main>
    </div>
  );
};

export default Home;
