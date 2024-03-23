import React, { useEffect, useState } from "react";
import NavBar from "../Home/NavBar";
import SideBar from "../Home/SideBar";
import TractionCard from "../Components/TransactionCard";
import { useSelector } from "react-redux";
import TransactionFilter from "./TransactionFilter";
import getTransactions from "./TransactionApi";
import { FILEPATH } from "../Constants/Api";
export default function Transactions() {
  const [transactionsByDate, setTransactionsByDate] = useState({});
  const userId = useSelector((state) => state.loginInfo.userid);
  const filterCategory = useSelector(
    (state) => state.categoryFilter.categories
  );

  const startDate = useSelector(
    (state) => state.dateFilter.dateRange.startDate
  );
  const endDate = useSelector((state) => state.dateFilter.dateRange.endDate);

  useEffect(() => {
    getTransactions(
      userId,
      filterCategory,
      setTransactionsByDate,
      startDate,
      endDate
    );
  }, [userId, filterCategory, startDate]);

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-4 mb-32">
        <SideBar />

        <div className=" md:col-span-2">
          <div className="ml-10 mt-28 md:mt-5">
            <h2 className="font-poppins font-bold text-xl md:text-2xl mb-10">
              Transactions
            </h2>
            {Object.entries(transactionsByDate).map(([date, transactions]) => (
              <div key={date}>
                <h2 className="mt-4 mb-2 font-poppins font-bold text-xs text-purple-800">
                  {date}
                </h2>
                {transactions.map((item) => (
                  <TractionCard
                    category={item.category.name}
                    key={item._id}
                    icon={
                      <img
                        alt=""
                        height={30}
                        width={30}
                        src={FILEPATH + item.category.icon}
                      />
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

        <div className="hidden md:block md:col-span-1">
          <TransactionFilter key={0} />
        </div>
      </div>
    </div>
  );
}
