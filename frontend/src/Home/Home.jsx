import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import RightSideContnent from "./RightSideContnent";

//importing context

import { useDispatch } from "react-redux";
import { updateUserId } from "../redux/LoginInfoSlice.js";
import { updateDateRange } from "../redux/DashBoardSelectedDateRangeSlice.js";

export default function Home() {
  const dispatch = useDispatch();

  //GET TOKEN FROM COKKIE -----  (FROM GOOGLE AUTH)
  console.log(Cookies.get("token"));
  // const { id,setId } = useContext(AppItems);

  //get ID from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ID = queryParams.get("data");

  //updating redux
  dispatch(updateDateRange("This Month"));
  dispatch(updateUserId(ID));

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-4 ">
        <SideBar />

        <div className=" md:col-span-2">
          {/* //Home Containers */}

          <Dashboard />
        </div>
        <div className=" md:col-span-1 ">
          <RightSideContnent />
        </div>
      </div>
    </div>
  );
}
