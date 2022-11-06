import React from "react";
import illustration2 from "../assets/illustration2.svg";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../compnents/Login/InputGroup";
import Joi from "joi";
import LoadButton from "../compnents/LoadingButton";
import { useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const Schema = Joi.object({
    password: Joi.string().required().min(4).label("Password"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label("Email")
      .required(),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = Schema.validate(
      { password, email },
      { abortEarly: false }
    );
    if (error) {
      const errors = {
        email: error.details.find((item) => item.path[0] == ["email"])
          ? error.details.find((item) => item.path[0] == ["email"]).message
          : "",
        password: error.details.find((item) => item.path[0] == ["password"])
          ? error.details.find((item) => item.path[0] == ["password"]).message
          : "",
      };
      setErrors(errors);
      console.log(error);
    } else {
      setIsLoading(true);
      try {
        const payload = {
          email: email,
          password: password,
        };
        const { data } = await axios.post(
          "http://127.0.0.1:3200/tokens",
          payload
        );
        if (typeof data == "object" && data !== null) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/dashboard");
        } else {
          setIsLoading(false);
          window.alert("wrong username and password try again");
        }
      } catch (error) {
        setIsLoading(false);

        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.status == 404) {
            alert("user does not exist in the database");
          } else {
            alert("email or password incorrect");
          }
        } else {
          alert("an unexpected error occured please try to login later");
          console.log(error);
        }
      }
      setErrors(errors);
    }
  };

  return (
    <div id="main" className="w-screen h-screen  flex flex-row-reverse">
      <section className="lg:w-[50%] hidden lg:flex  bg- dark:bg-[#101010] lg:flex-col items-center">
        <img
          className="w-[80%] h-[60%] flex flex-col items-center mt-4"
          src={illustration2}
          alt=""
        />
        <p className="text-[28px] dark:text-white text-black font-medium mt-8 w-[60%]">
          Are you ready to be productive? Log into your timeline account
        </p>
      </section>
      <main className="flex flex-col lg:w-[50%] w-full pt-[20px] lg:px-[50px] px-[20px]  ">
        <div className="flex w-full flex-row items-center py-[30px] justify-center lg:justify-start ">
          <img src={logo} className="w-[60px] mt-6 h-[60px]" alt="" />
        </div>
        <h2 className=" dark:text-white text-black font-medium w-[80%] text-[32px]">
          Log into your Timeline account
        </h2>
        <span className="flex flex-row mb-4 ">
          <p className="mr-2 dark:text-white text-black">
            Dont have an account yet?
          </p>
          <Link to="/signup">
            <p className="text-timeline">Sign up</p>
          </Link>
        </span>
        <div className="h-[300px] w-[100%]   flex flex-col rounded-md mt-4 items-center">
          <Input
            value={email}
            label={"Email"}
            setValue={setEmail}
            errors={errors.email}
            type="text"
          />
          <Input
            value={password}
            label={"Password"}
            setValue={setPassword}
            errors={errors.password}
            type="password"
          />

          <div onClick={onSubmit} className="w-[40%] py-2 px-6 ">
            <LoadButton
              submit={onSubmit}
              content="Log in"
              isLoading={isLoading}
              color="bg-timeline"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
