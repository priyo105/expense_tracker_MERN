import React from "react";
import NavBar from "../Home/NavBar";
import SideBar from "../Home/SideBar";
import Select from "react-select";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { APIURL } from "../Constants/Api";
import Cookies from "js-cookie";
import Toast, { showToast } from "../utils/Toast";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/counterSlicetest.js";

function AddExpense() {
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [expense, setExpense] = useState("");

  const userId = useSelector((state) => state.loginInfo.userid);

  useEffect(() => {});
  const fetchCategories = async () => {
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
      // setCategories(result);
      const spinnerObjects = [];
      result.map((item) => {
        spinnerObjects.push({ value: item._id, label: item.name });
      });

      console.log("spinner", spinnerObjects);
      setOptions(spinnerObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const saveExpense = async () => {
    validateInput();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  async function saveExpenseToDB() {
    const token = Cookies.get("token");
    const bodyParams = {
      title: title,
      category: selectedCategory,
      userId: userId,
      Amount: expense,
      userSpentDate: date,
      isIncome: false,
    };

    try {
      const response = await fetch(APIURL + "/expense/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyParams),
      });

      if (!response.ok) {
        showToast("Network Response was not Ok");
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);

      if (response.status === 201) {
        showToast(result.message, "success");
        empty();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validateInput = async () => {
    if (!title) {
      showToast("Title is required !", "error");
    } else if (!selectedCategory) {
      showToast("Please Select Categories", "error");
    } else if (!date) {
      showToast("Date is Required", "error");
    } else if (!expense) {
      showToast("Expense is Required", "error");
    } else {
      saveExpenseToDB();
    }
  };

  const empty = () => {
    setTitle("");
    setSelectedCategory("");
    setDate("");
    setExpense("");
  };

  return (
    <div>
      <NavBar />
      <Toast />

      <div className="grid grid-cols-1 md:grid-cols-4 ">
        <SideBar />

        <div className=" md:col-span-2">
          {/* //Home Containers */}

          <div className="h-20 w-60 z-0 mt-40 md:mt-0 ml-20">
            <h1 className="font-mono text-lg font-bold">Add Expense</h1>

            <div className="mt-10">
              <p className="font-poppins font-bold"> Title</p>
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                placeholder="Enter Title"
                className="border rounded p-2 mt-3 w-full"
              ></input>
            </div>

            <div className="mt-5">
              <p className="font-poppins font-bold"> Category</p>
              <Select
                options={options}
                onChange={(selectedOption) => {
                  console.log(selectedOption);
                  setSelectedCategory(selectedOption.value);
                }}
                className="mt-5   relative"
              />
            </div>

            <div className="mt-5 z-0">
              <p className="font-poppins font-bold"> Date</p>

              <div className="w-full border p-2 mt-4  relative">
                <DatePicker
                  className="relative w-56 "
                  icon={
                    <AiOutlineCalendar color="black" width={30} height={30} />
                  }
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>

              <div className="mt-10">
                <p className="font-poppins font-bold"> Amount Spent</p>
                <input
                  value={expense}
                  type="number"
                  placeholder="Enter Amount Spent (£)"
                  className="border rounded p-2 mt-3 w-full"
                  onChange={(event) => setExpense(event.target.value)}
                ></input>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    saveExpense();
                  }}
                  className="mt-10 bg-black text-white px-5 py-2 rounded-md font-bold"
                >
                  {" "}
                  Add{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=" md:col-span-1 "></div>
      </div>
    </div>
  );
}

export default AddExpense;
