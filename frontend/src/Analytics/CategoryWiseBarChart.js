import React, { PureComponent, useEffect } from "react";
import { APIURL } from "../Constants/Api";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BarChart,
  Bar,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#4CAF50",
  "#9C27B0",
  "#FF5722",
  "#607D8B",
  "#E91E63",
  "#2196F3",
  "#795548",
  "#FF9800",
  "#9E9E9E",
  "#673AB7",
  "#3F51B5",
  "#FFC107",
  "#00BCD4",
  "#CDDC39",
  "#FFEB3B",
  "#8BC34A",
];
const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
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

export default function CategoryWiseBarChart({selectedDateRange}) {
  const [categories, setCategories] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const userId = useSelector((state) => state.loginInfo.userid);

  useEffect(() => {
    const token = Cookies.get("token");
    fetchChatData(token);
  }, [selectedDateRange]);

  const fetchChatData = async (token) => {

    try {
      const response = await fetch(
        APIURL +
          "/analytics/getCategoryWiseData?category=Shopping&dateRange="+selectedDateRange+"&userId="+userId,
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
      console.log("result" + JSON.stringify(result));
      setCategories(result);

      const formattedData = result.map((item) => ({
        name: item._id,
        uv: item.totalSpending,
      }));
      setFormattedData(formattedData);
    console.log(formattedData)

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv">
          {formattedData.map((entry, index) => (
            <Cell cursor="pointer" fill={COLORS[index]} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
