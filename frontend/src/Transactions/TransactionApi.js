// api.js

import Cookies from "js-cookie";
import { APIURL } from "../Constants/Api";

const getTransactions = async (
  userId,
  filterCategory,
  setTransactionsByDate,
  startDate,
  endDate
) => {
  const token = Cookies.get("token");
  try {
    const response = await fetch(
      APIURL +
        "/expenses?userId=" +
        userId +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate,
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

    //filter from checkbox categories
    let filteredArray = result.filter((obj) =>
      filterCategory.includes(obj.category.name)
    );
    if (filterCategory.length === 0) {
      filteredArray = result;
    }

    console.log(startDate);

    // Organize transactions by date
    const organizedTransactions = {};

    filteredArray.forEach((item) => {
      const isoDate = new Date(item.userSpentDate);
      const simpleDateString = isoDate.toISOString().split("T")[0]; //splliting date from datetimestamp

      if (!organizedTransactions[simpleDateString]) {
        //check if the date exists in the array
        organizedTransactions[simpleDateString] = []; //it creates an empty array  --
      }

      organizedTransactions[simpleDateString].push(item);
    });

    setTransactionsByDate(organizedTransactions);
  } catch (error) {
    console.log(error);
  }
};

export default getTransactions;
