import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import RightSideContnent from "./RightSideContnent";
import { APIURL } from "../Constants/Api.js";
//importing context

import { useDispatch } from "react-redux";
import { updateUserId } from "../redux/LoginInfoSlice.js";
import { updateDateRange } from "../redux/DashBoardSelectedDateRangeSlice.js";
import { fetchToken } from "./Apis/FetchTokenApi.js";

export default function Home() {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const location = useLocation();

  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ID = queryParams.get("data");
    setId(ID);

    fetchToken(ID)
      .then((response) => {
        setToken(response.token);
        Cookies.set("token", response.token);
        console.log("xxxxtoken", Cookies.get("token"));
      })
      .finally(() => setLoading(false));
  }, []);

  const dispatch = useDispatch();

  //get ID from URL

  //updating redux
  dispatch(updateDateRange("This Month"));
  dispatch(updateUserId(id));

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-4 ">
        <SideBar />

        <div className=" md:col-span-2">
          {/* //Home Containers */}

          {!loading && <Dashboard />}
        </div>
        <div className=" md:col-span-1 ">
          {!loading && <RightSideContnent />}
        </div>
      </div>
    </div>
  );
}
