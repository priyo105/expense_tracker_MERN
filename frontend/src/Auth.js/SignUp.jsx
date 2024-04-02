/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import InputWithIcons from "../Components/InputWithIcons";
import { AiFillMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { FaPersonBooth } from "react-icons/fa";
import { SignUpApi } from "../Apis/SignUp";

export default function SignUp() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    if (password.length < 5) {
      setErrorMessage("password too short .Make at least 5 characters");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      SignUpApi(fullname, email, password).then(() => {});
    }
  };

  return (
    <div>
      <h1 className="font-serif mt-20 text-center text-xl md:text-2xl xl:text-4xl text-lime-950">
        Expense Tracker - Keep Track your Daily Records
      </h1>
      <h2 className="text-center text-lg mt-20">
        {" "}
        Sign Up - Create new Account
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full md:ml-24 mt-20">
        <div className="h-1/3 w-2/3 ml-16 md:ml-0 ">
          <img src="/budget.jpg" />
        </div>

        <div className="h-1/3 ml-5 ">
          <p className="font-mono md:text-left ml-5 mt-10 font-semibold text-sm md:text-2xl">
            Please Fillup the Form Below to Sign Up
          </p>

          <InputWithIcons
            icon={<FaPersonBooth size={35} />}
            placeholder={"Enter Full Name"}
            type={"text"}
            onChange={(text) => setFullName(text.target.value)}
          />

          <InputWithIcons
            icon={<AiFillMail size={35} />}
            placeholder={"Enter Your Email"}
            type={"email"}
            onChange={(text) => setEmail(text.target.value)}
          />
          <InputWithIcons
            icon={<FaLock size={35} />}
            placeholder={"Enter Your Password"}
            type={"password"}
            onChange={(text) => setPassword(text.target.value)}
          />

          <InputWithIcons
            icon={<FaLock size={35} />}
            placeholder={"Confirm Your Password"}
            type={"password"}
            onChange={(text) => setConfirmPassword(text.target.value)}
          />

          <p style={{ color: "red", marginTop: 20, marginLeft: 20 }}>
            {errorMessage}
          </p>

          <div className="mt-20 ml-40  lg:ml-20 mb-2   ">
            <button
              onClick={handleButtonClick}
              className=" bg-black text-white pl-3 pr-3 pt-2 pb-2 rounded-lg"
            >
              {" "}
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="w-full text-center  mt-28 mb-28 text-[10px] font-bold">
        All rights reserved @AdnanKamal- Software Engineer ,2024
      </div>
    </div>
  );
}
