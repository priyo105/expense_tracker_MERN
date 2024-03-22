import React, { useState, useEffect } from "react";
import NavBar from "../Home/NavBar";
import SideBar from "../Home/SideBar";
import { APIURL } from "../Constants/Api";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CategoryList = (props) => {
  return (
    <div className="flex justify-between">
      <div className="flex mt-5">
        <p className="mr-5  text-sm">{props.index + 1}.</p>

        <div
          className={`bg-[${props.item.colorCode}] w-4 h-4 rounded-full mr-5`}
        ></div>
        <h1 className="font-poppins font-semibold text-neutral-600 text-[11px] md:text-[14px] w-24">
          {props.item.name}
        </h1>
      </div>

      <div className="flex">
        <h1 className="mr-10 mt-5 w-5 text-[11px]  md:text-[14px]">
          {props.item.status}
        </h1>

        {props.item.status == "Active" ? (
          <div className={`bg-green-500 w-3 h-3 rounded-full mr-5 mt-6`}></div>
        ) : (
          <div className={`bg-red-500 w-3 h-3 rounded-full mr-5 mt-6`}></div>
        )}
      </div>

      <div className="flex">
        <img
          src={`/${props.item.icon}`}
          width={25}
          height={25}
          alt=""
          className="mr-5 mt-5"
        />

        <AiOutlineDelete className="mt-6 mr-2" size={20} />
      </div>
    </div>
  );
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const navigate = useNavigate();

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
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIncomeCategories = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(APIURL + "/category/salary", {
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
      setIncomeCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchIncomeCategories();
  }, []);

  return (
    <div className="">
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-4">
        <SideBar />

        <div className="md:col-span-2 mt-28 md:mt-0  ml-10 md:ml-0 mb-28">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-10">Categories</h1>
            <button
              onClick={() => navigate("/addCategory")}
              className="text-sm bg-green-500 text-white px-5 rounded h-10 m-5 border border-black hover:bg-green-950"
            >
              Add
            </button>
          </div>

          <h1 className="font-bold  text-xs mt-10 lg:mt-5 lg:text-xl mb-10">
            {" "}
            Expense Categories
          </h1>
          {categories.map((item, index) => {
            return <CategoryList item={item} index={index} />;
          })}

          <h1 className="font-bold  text-xs mt-10 lg:mt-20 lg:text-xl mb-10">
            {" "}
            Income Categories
          </h1>
          {incomeCategories.map((item, index) => {
            return <CategoryList item={item} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
