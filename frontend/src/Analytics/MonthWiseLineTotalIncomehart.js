import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { APIURL } from "../Constants/Api";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import helperFunction from "../helpers/helper";



export default function MonthWiseLineTotalIncomehart() {
  const [categories, setCategories] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const userId = useSelector((state) => state.loginInfo.userid);
  var helper = new helperFunction();

  useEffect(() => {
    const token = Cookies.get("token");
    fetchChatData(token);
  }, []);

  const fetchChatData = async (token) => {
    try {
      const response = await fetch(
        APIURL +
          "/analytics/getMonthWiseIncome?category=Shopping&dateRange=Monthly&userId=" +
          userId,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("monthwisedata" + JSON.stringify(result));
      setCategories(result);

      const formattedData = result.map((item) => ({
        name:
          helper.getMonthNameFromIndex(item._id.month) + `(${item._id.year})`,
        uv: item.totalIncome,
      }));

      setFormattedData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  />

        <Tooltip content={"SADASDA"} />
        <Legend />

        <Line
          type="monotone"
          dataKey="uv"
          activeDot={{ r: 8 }}
          stroke="#097969"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
