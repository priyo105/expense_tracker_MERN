import React from "react";
import { FaCheck } from "react-icons/fa";

export default function BigScreenContent() {
  return (
    <div className=" h-20 align-middle justify-end hidden xl:block">
      <div className="flex m-28">
        <img src="/expense.png" width={200} height={200} />

        <div>
          <div className="flex">
            <FaCheck className="ml-10" height={40} width={40} />
            <p className="text-[12px] font-mono text-orange-800 ml-5">
              Add Income And Expenses
            </p>
          </div>
          <div className="flex mt-10">
            <FaCheck className="ml-10" height={40} width={40} />
            <p className="text-[12px] font-mono text-red-900 ml-5">
              Reports And Analytics
            </p>
          </div>
          <div className="flex mt-10">
            <FaCheck className="ml-10" height={40} width={40} />
            <p className="text-[12px] font-mono text-red-900 ml-5">
              Future Cost Predictions
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
