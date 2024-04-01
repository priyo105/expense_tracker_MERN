import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import GithubButton from "../Components/GithubButton";
import InputWithIcons from "../Components/InputWithIcons";
import { AiFillMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import BigScreenContent from "./BigScreenContent";
import { APIURL } from "../Constants/Api";
import { Link } from "react-router-dom";
import { LoginApi } from "../Apis/Login";

export default function Auth() {
  const LoginPressed = async () => {
    await LoginApi("adnankamal972@gmail.com", "1234").then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="m-10 flex justify-center flex-col">
      <h1 className="font-serif text-center text-xl md:text-2xl xl:text-4xl text-lime-950">
        Expense Tracker - Keep Track your Daily Records
      </h1>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 mt-10 w-full">
        <BigScreenContent />

        <div className=" flex justify-center">
          <div>
            <h1 className="font-mono"> Sign in Using Social Media </h1>
            <p className="mt-20 text-sm mb-5">Google Sign In </p>

            <a href={APIURL + "/auth"}>
              <GoogleButton />
            </a>

            <p className="text-center m-5">OR</p>
            <div className=" w-28 h-16">
              <a href={APIURL + "/auth/github"}>
                <GithubButton
                  height={50}
                  width={240}
                  title="Sign in with Github"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex  justify-start">
          <div className="flex md:mt-24">
            <div className="hidden md:block h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>

            <div className="ml-10">
              <p className="text-center "> OR</p>
              <p className="text-center mt-5 font-mono text-sm">
                {" "}
                Sign In Using Email and Password
              </p>

              <InputWithIcons
                icon={<AiFillMail size={35} />}
                placeholder={"Enter Your Email"}
                type={"email"}
              />
              <InputWithIcons
                icon={<FaLock size={35} />}
                placeholder={"Enter Your Password"}
                type={"password"}
              />
              <div className="mt-10 items-center flex justify-center">
                <button
                  onClick={LoginPressed}
                  className=" bg-black text-white pl-3 pr-3 pt-2 pb-2 rounded-lg"
                >
                  {" "}
                  Sign In
                </button>
              </div>
              <p className="mt-2 text-[12px] " style={{ textAlign: "center" }}>
                Dont Have Account?{" "}
                <Link to="/signup" className="text-blue-500">
                  {" "}
                  Sign Up
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-28  text-[10px] font-bold">
        All rights reserved @AdnanKamal
      </div>
    </div>
  );
}
