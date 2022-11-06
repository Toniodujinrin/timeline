import Input from "../../compnents/Login/InputGroup";
import { useState, useContext } from "react";
import LoadButton from "../../compnents/LoadingButton";
import Joi from "joi";
import axios from "axios";
import { DataContext } from "../../NavWrapper";
import { config } from "../../data-store";
import { deleteUser } from "../../data-store";

const Settings = () => {
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
    if (error) {
      const errorArray = { ...errors };

      errorArray.password = error.details.find(
        (item) => item.path[0] == ["password"]
      )
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
      errorArray.confirm = error.details.find(
        (item) => item.path[0] == ["confirm"]
      )
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
          "http://127.0.0.1:3200/users",
          payload,
          config
        );
        if (data) {
          alert("successfully updated user");
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
    } catch (error) {
      alert("could not delete user");
    }
  };
  return (
    <div className="h-screen flex flex-col justify-between">
      {deletePopUp && (
        <div className="w-full h-full fixed z-30 flex justify-center items-center ">
          <div className="lg:w-[35%] w-[80%] h-[40%]  items-center lg:mr-[200px] lg: mb-[100px] flex  flex-col justify-around dark:bg-[#363636] rounded-md bg-slate-50 ">
            <h1 className="text-center text-[21px]">
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
          </div>
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
              isLoading={isLoading}
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
