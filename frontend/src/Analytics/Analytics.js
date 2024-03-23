import React, { useState } from "react";
import RightSideContnent from "../Home/RightSideContnent";
import SideBar from "../Home/SideBar";
import NavBar from "../Home/NavBar";
import PieChartGraph from "./CategoryWisePieChart";
import CategoryWiseBarChart from "./CategoryWiseBarChart";
import MonthWiseLineChart from "./MonthWiseLineChart";
import MonthWiseLineTotalIncomehart from "./MonthWiseLineTotalIncomehart";
import DateRangePickerDropDownSelect from "../Components/DateRangePickerDropDownSelect";

export default function Analytics() {
  const [rangeSelect, setRangeSelect] = useState("This Month");

  const setDateRangeSelector = (val) => {
    setRangeSelect(val);
  };
  return (
    <div>
      <NavBar />

      <div className="pt-32 md:pt-0  flex justify-center md:justify-end md:mr-10">
        <DateRangePickerDropDownSelect
          setDateRangeSelector={setDateRangeSelector}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 ">
        <SideBar />

        <div className="grid md:col-span-2 lg:col-span-4 lg:grid-cols-4">
          <div className="mt-24 md:mt-10 w-5/5 md:col-span-2  lg:col-span-2 lg:mt-6  h-4/5">
            <h1 className="text-center pt-4 font-poppins font-semibold">
              Category Wise Expense Breakdown
            </h1>

            <div className="w-full h-full">
              <PieChartGraph selectedDateRange={rangeSelect} />
            </div>
          </div>

          <div className="mt-10 md:mt-10 w-5/5 md:col-span-3  lg:col-span-2 lg:mt-6 lg:mr-20  h-4/5">
            <h1 className="text-center pt-4 font-poppins font-semibold mb-10 sm">
              Category Wise Expense Breakdown
            </h1>

            <div className="w-full h-full">
              <CategoryWiseBarChart selectedDateRange={rangeSelect} />
            </div>
          </div>

          <div className="mt-10 md:mt-10 w-5/5 md:col-span-3  lg:col-span-2 lg:mt-6 lg:mr-20  h-4/5">
            <h1 className="text-center pt-4 font-poppins font-semibold mb-10 sm">
              Month Wise Expenses (6 months)
            </h1>

            <div className="w-full h-full">
              <MonthWiseLineChart />
            </div>
          </div>

          <div className="mt-10 md:mt-10 w-5/5 md:col-span-3  lg:col-span-2 lg:mt-6 lg:mr-20  h-4/5">
            <h1 className="text-center pt-4 font-poppins font-semibold mb-10 sm">
              Month Wise Expenses (6 months)
            </h1>

            <div className="w-full h-full">
              <MonthWiseLineTotalIncomehart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
