import Input from "../../compnents/Login/InputGroup";
import { useState, useContext } from "react";
import LoadButton from "../../compnents/LoadingButton";
import Joi from "joi";
import axios from "axios";
import { DataContext } from "../../NavWrapper";
import { config } from "../../data-store";
import { deleteUser } from "../../data-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Settings = () => {
  const navigate = useNavigate();
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const userData = useContext(DataContext);
  const [firstName, setFirstName] = useState(
    userData ? userData.firstName : ""
  );
  const [lastName, setLastName] = useState(userData ? userData.lastName : "");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    firstName: "",
    lastName: "",
    confirm: "",
  });
  const [isLoading, setIsLoading] = useState();

  const Schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    password: Joi.string().required().min(4).label("Password"),
    confirm: Joi.ref("password"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const { error } = Schema.validate(
      {
        firstName,
        password,
        confirm,
        lastName,
      },
      { abortEarly: false }
    );
    if (error && password.length) {
      const errorArray = { ...errors };

      errorArray.password =
        password.length === 0
          ? ""
          : error.details.find((item) => item.path[0] == ["password"])
          ? error.details.find((item) => item.path[0] == ["password"]).message
          : "";
      errorArray.firstName = error.details.find(
        (item) => item.path[0] == ["firstName"]
      )
        ? error.details.find((item) => item.path[0] == ["firstName"]).message
        : "";
      errorArray.lastName = error.details.find(
        (item) => item.path[0] == ["lastName"]
      )
        ? error.details.find((item) => item.path[0] == ["lastName"]).message
        : "";
      errorArray.confirm =
        password.length === 0
          ? ""
          : error.details.find((item) => item.path[0] == ["confirm"])
          ? error.details.find((item) => item.path[0] == ["confirm"]).message
          : "";
      setErrors(errorArray);
    } else {
      setErrors(false);
      setIsLoading(true);
      try {
        const payload = {
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: userData.email,
        };

        const data = await axios.put(
          "https://timeline-backend.vercel.app/users",
          payload,
          config
        );
        if (data) {
          toast.success("user successfuly updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          alert("wrong input fields ");
        } else {
          alert("an unexpected error occured please try again later");
          console.log(error);
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const Delete = () => {
    setDeletePopUp(true);
  };

  const initDelete = () => {
    try {
      const data = deleteUser(userData.email);
      if (data) {
        toast.success("user successfuly deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/signup");
        localStorage.removeItem("user");
      }
    } catch (error) {
      alert("could not delete user");
    }
  };
  return (
    <div className="h-screen flex flex-col justify-between">
      {deletePopUp && (
        <div className="w-full h-full fixed z-30 flex justify-center items-center ">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="lg:w-[35%] w-[80%] h-[40%] border border-[#cccccc]  items-center lg:mr-[200px] lg: mb-[100px] flex  flex-col justify-around dark:bg-[#363636] rounded-md bg-slate-50 "
          >
            <h1 className="text-center text-black dark:text-white  text-[21px]">
              Are you sure you want to delete your account?
            </h1>
            <div className="flex flex-row gap-x-8">
              <button
                onClick={() => {
                  setDeletePopUp(false);
                }}
                className="p-2 rounded-md bg-[#00FF47] text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => initDelete()}
                className="p-2 rounded-md bg-[#EF2E2E] text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <div>
        <div className="w-[80%] mx-auto pb-6 ">
          <h1 className="text-[28px]  my-6  text-black dark:text-white  ">
            Edit Account
          </h1>
        </div>

        <div className="w-[80%] mx-auto ">
          <Input
            value={firstName}
            label={"Change first name:"}
            errors={errors.firstName}
            setValue={setFirstName}
            type={"text"}
          />
          <Input
            value={lastName}
            label={"Change last name:"}
            errors={errors.lastName}
            setValue={setLastName}
            type={"text"}
          />
          <Input
            value={password}
            label={"Change password:"}
            errors={errors.password}
            setValue={setPassword}
            type={"password"}
          />
          <Input
            value={confirm}
            label={"Confirm changed password:"}
            errors={errors.confirm}
            setValue={setConfirm}
            type={"password"}
          />
        </div>

        <div className="w-full  flex items-center mt-4">
          <div
            onClick={(e) => onSubmit(e)}
            className="w-[30%] cursor-pointer hover:scale-110 transition-[2000ms] mx-auto"
          >
            <LoadButton
              content={"Edit Account"}
              isLoading={isLoading}
              submit={onSubmit}
              color="bg-[#ff9900]"
            />
          </div>
          <div
            onClick={(e) => Delete(e)}
            className="w-[30%] cursor-pointer hover:scale-110 transition-[2000ms] mx-auto"
          >
            <LoadButton
              content={"Delete Account"}
              isLoading={false}
              submit={Delete}
              color="bg-[#FF452C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
