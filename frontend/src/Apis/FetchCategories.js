import Cookies from "js-cookie";
import { APIURL } from "../Constants/Api";
export const fetchCategories = async () => {
  const token = Cookies.get("token");

  try {
    const response = await fetch(APIURL + "/category/all", {
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
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
