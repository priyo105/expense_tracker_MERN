import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SideBar() {
  const userId = useSelector((state) => state.loginInfo.userid);

  return (
    <div>
      <div className="h-96 hidden md:block md:col-span-1 md:ml-10 lg:ml-28">
        <Link to={`/home?data=${userId}`}>
          <p className="font-poppins text-[12px] mt-10 w-28 hover:bg-slate-200">
            Home
          </p>
        </Link>

        <Link to="/categories">
          <p className="font-poppins text-[12px] mt-10 w-16 hover:bg-slate-200">
            Categories
          </p>
        </Link>

        <Link to="/transactions">
          <p className="font-poppins text-[12px] mt-10 w-28 hover-bg-slate-200">
            Transactions
          </p>
        </Link>

        <Link to="/income">
          <p className="font-poppins text-[12px] mt-10 w-28 hover:bg-slate-200">
            Add Income
          </p>
        </Link>

        <Link to="/addexpense">
          <p className="font-poppins text-[12px] mt-10 w-28 hover:bg-slate-200">
            Add Expenses
          </p>
        </Link>

        <Link to="/analytics">
          <p className="font-poppins text-[12px] mt-10 w-36 hover:bg-slate-200">
            Reports And Analytics
          </p>
        </Link>

        {/* <Link to="/future-predictions">
          <p className="font-poppins text-[12px] mt-10 w-28 hover:bg-slate-200">
            Future Predictions
          </p>
        </Link> */}
      </div>
    </div>
  );
}

export default SideBar;
