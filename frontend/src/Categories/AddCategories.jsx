import React, { useState, useEffect } from "react";
import NavBar from "../Home/NavBar";
import SideBar from "../Home/SideBar";
import { APIURL } from "../Constants/Api";
import Cookies from "js-cookie";
import FormInput from "../Components/FormInput";
import Toast, { showToast } from "../utils/Toast";

function AddCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState("");
  const token = Cookies.get("token");

  const createCategoty = async () => {
    const bodyParams = {
      name: categoryName,
      Description: description,
      colorCode: colorCode,
      status: "Active",
      isIncomeSource: checked ? true : false,
      icon: file,
    };

    try {
      const response = await fetch(APIURL + "/category/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyParams),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json().then((x) => {
        showToast("Category Created", "success");
        resetFields();
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  function resetFields() {
    setCategoryName("");
    setDescription("");
    setFile("");
    setChecked(false);
    setColorCode("");
  }

  function setDescriptionValue(des) {
    setDescription(des);
  }

  function setColorCodeValue(cl) {
    setColorCode(cl);
  }

  function handleChange(e) {
    setChecked(e.target.checked);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0].name);
  };

  const onCategorySubmit = async () => {
    if (!categoryName) {
      showToast("Category Name Required", "error");
    } else if (!file) {
      showToast("Please Upload a Icon");
    } else {
      await createCategoty();
      await uploadFile(file, APIURL + "/upload/single");

    }
  };

 async function uploadFile(file, uploadUrl) {
 

    const formData = new FormData();
    formData.append("file", file);

    // Send POST request with fetch
     await fetch(uploadUrl, {
      mode:'no-cors',
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        // throw new Error("Failed to upload file");
      }
      // return response.json();
    });
  }

  return (
    <div className="">
      <NavBar />
      <Toast />
      <div className="grid grid-cols-1 md:grid-cols-4">
        <SideBar />

        <div className="md:col-span-2 mt-28 md:mt-0  ml-10 md:ml-0 mb-28">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-10">Add Categories</h1>
          </div>

          <div className="mt-10">
            <p className="font-poppins font-bold"> Category Name</p>
            <input
              value={categoryName}
              onChange={(event) => {
                setCategoryName(event.target.value);
              }}
              placeholder="Enter Category Name"
              className="border rounded p-2 mt-3  w-2/3  md:w-1/3"
            ></input>

            <FormInput
              placeholder={"Enter Description"}
              title={"Description"}
              setonChange={setDescriptionValue}
            />
            <FormInput
              placeholder={"Enter Color Code"}
              title={"Color Code"}
              setonChange={setColorCodeValue}
            />

            <div className="mt-10 flex flex-row">
              <p className="text-black font-semibold text-xl">Is Income </p>
              <input
                value="test"
                type="checkbox"
                className="ml-10 h-7 w-7"
                onChange={handleChange}
              />
            </div>

            <div className="mt-10">
              <p className="text-black font-semibold text-xl">
                Upload Icon (64*64 or 128*128 for best resolution){" "}
              </p>
              <p>{JSON.stringify(file)}</p>
              <input type="file" onChange={handleFileChange} className="mt-5" />
            </div>
          </div>

          <div
            className="w-24 h-10 mt-10 bg-red-900 text-center p-2 text-white font-bold align-middle ml-20 hover:cursor-pointer"
            onClick={onCategorySubmit}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategories;
