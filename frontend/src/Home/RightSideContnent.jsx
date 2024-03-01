import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { getMonthlyIncome,getMonthlyExpenses } from "./Apis/DashboardApis";
import { useSelector, useDispatch } from "react-redux";

function RightSideContnent() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpesnse, setMonthlyExpenses] = useState("");

  const userId = useSelector((state) => state.loginInfo.userid);

  const getIncomeOfTheMonth = async () => {
    let income = await getMonthlyIncome(userId);
    setMonthlyIncome(income[0]?.totalIncome ??0);
  };


  const getExpenseOfTheMonth= async () => {
    let expense = await getMonthlyExpenses(userId);
    setMonthlyExpenses(expense[0]?.totalExpenses??0);
  };

  useEffect(() => {
    getIncomeOfTheMonth();
    getExpenseOfTheMonth();
  }, []);
  return (
    <div>
      <div className=" hidden md:block h-52 md:w-3/4 lg:w-2/4 bg-gray-100 ml-10 lg:ml-10 rounded-md lg:mt-20  mr-10">
        <div className="flex justify-center">
          <img className="rounded-full mt-5" src="/man.png" />
        </div>

        <p className="text-[12px] text-center text-gray-800 font-semibold font-poppins">
          {" "}
          Welcome Adnan{" "}
        </p>

        <div className="flex justify-evenly mt-5">
          <p className="text-[12px]  text-center text-gray-800 font-semibold font-poppins">
            {" "}
            Edit Profile{" "}
          </p>
          <FaEdit color="black" className="ml-5" />
        </div>

        <div className="flex justify-evenly mt-5">
          <p className="text-[12px] text-center text-gray-800 font-semibold font-poppins">
            {" "}
            Settings{" "}
          </p>
          <AiOutlineSetting color="black" className="ml-5" />
        </div>
      </div>

      <p className="mt-10 ml-10 mb-5 font-poppins md:hidden"> Overview</p>
      <div className=" h-24 md:w-3/4 lg:w-2/4 shadow-lg  ml-10 lg:ml-10 rounded-md lg:mt-20  mr-10 border mt-10">
        <div className="flex justify-between">
          <p className="ml-5 mt-5">Income</p>
          <p className="ml-5 mt-6 mr-5 text-[10px]">This Month</p>
        </div>

        <p className="ml-5 font-bold font-poppins text-lg">£ {monthlyIncome}</p>
      </div>

      <div className=" h-24 md:w-3/4 lg:w-2/4 shadow-lg  ml-10 lg:ml-10 rounded-md  mt-10 lg:mt-6  mr-10 border ">
        <div className="flex justify-between">
          <p className="ml-5 mt-5">Expense</p>
          <p className="ml-5 mt-6 mr-5 text-[10px]">This Month</p>
        </div>

        <p className="ml-5 font-bold font-poppins text-lg">£ {monthlyExpesnse}</p>
      </div>


      <div className=" h-24 md:w-3/4 lg:w-2/4 shadow-lg  ml-10 lg:ml-10 rounded-md  mt-10 lg:mt-6  mr-10 border ">
        <div className="flex justify-between">
          <p className="ml-5 mt-5">Remaining</p>
          <p className="ml-5 mt-6 mr-5 text-[10px]">This Month</p>
        </div>

        <p className="ml-5 font-bold font-poppins text-lg">£ {monthlyIncome-monthlyExpesnse}</p>
      </div>  
    </div>
  );
}

export default RightSideContnent;
