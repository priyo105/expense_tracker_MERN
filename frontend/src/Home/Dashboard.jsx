import React, { useEffect, useState } from "react";
import DashBoardBox from "../Components/DashBoardBox";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineFork, AiFillCar } from "react-icons/ai";
import { FaCar, FaCoffee, FaShoppingBasket } from "react-icons/fa";
import TractionCard from "../Components/TransactionCard";
import { APIURL, FILEPATH } from "../Constants/Api";
import Cookies from "js-cookie";
import getDashboardCost from "./Apis/DashboardApis";
import { getRecentTransactions } from "./Apis/DashboardApis";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const [shoppingTotalCost, setTotalShoppingCost] = useState(0);
  const [eatingOutTotal, setEatingOutTotal] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [recentTransactions, setRecentTrasaction] = useState([]);
  const userId = useSelector((state) => state.loginInfo.userid);

  useEffect(() => {
    const getShoppingCost = async () => {
      let shopping = await getDashboardCost("Shopping", userId);
      console.log(shopping);
      setTotalShoppingCost(shopping[0]?.totalSpending);
    };

    const getEatingOutCost = async () => {
      let eatingOut = await getDashboardCost("Eating Out", userId);
      console.log(eatingOut);
      setEatingOutTotal(eatingOut[0]?.totalSpending);
    };

    const getTransportCost = async () => {
      let transport = await getDashboardCost("Transport", userId);
      console.log(transport);
      setTransportCost(transport[0]?.totalSpending);
    };

    const getTransacions = async () => {
      let transactions = await getRecentTransactions(userId);
      console.log(transactions);
      setRecentTrasaction(transactions);
    };

    getShoppingCost();
    getEatingOutCost();
    getTransportCost();
    getTransacions();
  }, []);
  return (
    <div className="mt-28 md:mt-0">
      <div>
        <div className="flex">
          <p className="font-poppins ml-14 md:ml-5"> Top Categories</p>
          <p className="font-poppins text-sm ml-20 md:ml-[60%] text-blue-400 ">
            {" "}
            See more
          </p>
        </div>
        <div className="  grid grid-cols-1 ml-14 mt-5 gap-5 lg:grid-cols-2  xl:flex md:justify-start md:gap-10 md:mt-10 md:ml-5">
          <DashBoardBox
            icon={<AiOutlineFork size={25} color="white" />}
            title={"Shopping"}
            value={shoppingTotalCost}
            color={"bg-red-400"}
          />
          <DashBoardBox
            icon={<AiOutlineFork size={25} color="white" />}
            title={"Eating Out"}
            value={eatingOutTotal}
            color={"bg-blue-400"}
          />
          <DashBoardBox
            icon={<AiFillCar size={25} color="white" />}
            title={"Transport"}
            value={transportCost}
            color={"bg-purple-400"}
          />
        </div>
      </div>

      <div>
        <p className="font-poppins ml-14 md:ml-5 mt-10"> Recent Transactions</p>

        <div className="mt-5 ml-14 md:ml-0">
          {recentTransactions.map((item) => {
            const isoDate = new Date(item.userSpentDate);
            const simpleDateString = isoDate.toISOString().split("T")[0]; //speating date from datetimestamp

            return (
              <TractionCard
                category={item.category.name}
                key={item._id}
                icon={<img height={30} width={30} 
                src={FILEPATH+item.category.icon} />}
                title={item.title}
                date={simpleDateString}
                value={item.Amount}
                isIncome={item.isIncome}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
