import Cookies from "js-cookie";
import { APIURL } from "../../Constants/Api";

export default async function getDashboardCost(category, userId, dateRange) {
  const token = Cookies.get("token");
  console.log("baaalertoken", token);

  const URL =
    APIURL +
    "/dashboard/getMontlyData?category=" +
    category +
    "&dateRange=" +
    dateRange +
    "&userId=" +
    userId;

  console.log(URL);
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getRecentTransactions(userId) {
  const token = Cookies.get("token");
  try {
    const response = await fetch(
      APIURL + "/recentTransactions?userId=" + userId,

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
    console.log("recentTransactions", result);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getMonthlyIncome(userId, selectedDateRange) {
  console.log("FICL" + userId);
  const token = Cookies.get("token");
  try {
    const response = await fetch(
      APIURL +
        "/dashboard/getMonthlyIncome?category=Eating Out&dateRange=" +
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
    console.log("halamadrid", result);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getMonthlyExpenses(userId, selectedDateRange) {
  console.log("FICL" + selectedDateRange);
  const token = Cookies.get("token");

  try {
    const response = await fetch(
      APIURL +
        "/dashboard/getMonthlyExpenses?category=Eating Out&dateRange=" +
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
    console.log("halamadrid", result);
    return result;
  } catch (e) {
    console.log(e);
  }
}
