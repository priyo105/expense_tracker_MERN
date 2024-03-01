import React, { useEffect, useState } from "react";
import NavBar from "../Home/NavBar";
import SideBar from "../Home/SideBar";
import RightSideContnent from "../Home/RightSideContnent";
import TractionCard from "../Components/TransactionCard";
import Cookies from "js-cookie";
import { APIURL, FILEPATH } from "../Constants/Api";
import { useSelector, useDispatch } from "react-redux";

export default function Transactions() {
  const [transactionsByDate, setTransactionsByDate] = useState({});
  const userId = useSelector((state) => state.loginInfo.userid);

  const getTransactions = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(APIURL + "/expenses?userId="+userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);

      // Organize transactions by date
      const organizedTransactions = {};

      result.forEach((item) => {
        const isoDate = new Date(item.userSpentDate);
        const simpleDateString = isoDate.toISOString().split("T")[0]; //speating date from datetimestamp

        if (!organizedTransactions[simpleDateString]) {
          //check if the date exists in the array
          organizedTransactions[simpleDateString] = []; //it creates an empty array  --
        }

        organizedTransactions[simpleDateString].push(item);
      });

      setTransactionsByDate(organizedTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-4 mb-32">
        <SideBar />

        <div className=" md:col-span-2">
          <div className="ml-10 mt-28 md:mt-5">
            <h2 className="font-poppins font-bold text-xl md:text-2xl mb-10">Transactions</h2>
            {Object.entries(transactionsByDate).map(([date, transactions]) => (
              <div>
                <h2 className="mt-4 mb-2 font-poppins font-bold text-xs text-purple-800">
                  {date}
                </h2>
                {transactions.map((item) => (
                  <TractionCard
                    category={item.category.name}
                    key={item._id}
                    icon={
                      <img height={30} width={30} src={FILEPATH+item.category.icon} />
                    }
                    title={item.title}
                    date={date}
                    value={item.Amount}
                    isIncome={item.isIncome}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
