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
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];


function CustomizedYLabel(){
    return(
        <div style={{width:1000}}>
            <p>Baalchoda</p>
        </div>
    )
}

export default function MonthWiseLineChart() {
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
          "/analytics/getMonthWiseData?category=Shopping&dateRange=Monthly&userId=" +
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
        name: helper.getMonthNameFromIndex(item._id.month) + `(${item._id.year})`,
        uv: item.totalSpending,
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
        <YAxis label={<CustomizedYLabel />} />
 
        <Tooltip content={"SADASDA"} />
        <Legend />

        <Line
          type="monotone"
          dataKey="uv"
          activeDot={{ r: 8 }}
          stroke="red"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
