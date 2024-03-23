import React, { PureComponent, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { APIURL } from "../Constants/Api";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartGraph({ selectedDateRange }) {
  const [categories, setCategories] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const userId = useSelector((state) => state.loginInfo.userid);

  useEffect(() => {
    const token = Cookies.get("token");
    fetchChatData(token, selectedDateRange);
  }, [selectedDateRange]);

  const fetchChatData = async (token) => {
    try {
      const response = await fetch(
        APIURL +
          "/analytics/getCategoryWiseData?category=Shopping&dateRange=" +
          selectedDateRange +
          "&userId=" +
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
      console.log("result" + JSON.stringify(result));
      setCategories(result);

      const formattedData = result.map((item) => ({
        name: item._id,
        value: item.totalSpending,
      }));
      setFormattedData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={100} height={100}>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            console.log("handling label?");
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            // eslint-disable-next-line
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            // eslint-disable-next-line
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="#8884d8"
                fontSize={10}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {formattedData[index].name} ({value})
              </text>
            );
          }}
          values="awedawe"
          outerRadius={120}
          dataKey="value"
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
