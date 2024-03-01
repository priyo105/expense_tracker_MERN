import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MobileToggleSidebar({ toggle }) {
  const userId = useSelector((state) => state.loginInfo.userid);
  return (
    <div>
      <div
        className={toggle ? "h-[1500px]  w-60  z-50 fixed bg-white " : "hidden"} >
        <div className="ml-10">
          <Link to={`/home?data=${userId}`}>
            <p className="font-poppins text-[12px] mt-20">Home</p>
          </Link>
          <Link to="/categories">
            <p className="font-poppins text-[12px] mt-10">Categories</p>
          </Link>
          <Link to="/transactions">
            <p className="font-poppins text-[12px] mt-10">Transactions</p>
          </Link>
          <Link to="/income">
            <p className="font-poppins text-[12px] mt-10">Add Income</p>
          </Link>
          <Link to="/addexpense">
            <p className="font-poppins text-[12px] mt-10">Add Expenses</p>
          </Link>
          <Link to="/analytics">
            <p className="font-poppins text-[12px] mt-10">
              Reports And Analytics
            </p>
          </Link>
          <Link to="/predictions">
            <p className="font-poppins text-[12px] mt-10">Future Predictions</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileToggleSidebar;
