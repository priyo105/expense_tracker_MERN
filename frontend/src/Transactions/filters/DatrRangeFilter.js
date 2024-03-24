import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import Toast, { showToast } from "../../utils/Toast";
import { useDispatch } from "react-redux";
import { updateDateRange } from "../../redux/DashBoardSelectedDateRangeSlice";

export default function DatrRangeFilter() {
  const [selectedFirstDate, setSelectedFirstDate] = useState("");
  const [seoectEndingDate, setSelectedEndingDate] = useState("");
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (selectedFirstDate === "" || seoectEndingDate === "") {
      showToast("Please Select dates");
    } else {
      dispatch(
        updateDateRange({
          startDate: selectedFirstDate,
          endDate: seoectEndingDate,
        })
      );
    }
  };

  const handleReset = () => {
    setSelectedFirstDate("");
    setSelectedEndingDate("");
    dispatch(
      updateDateRange({
        startDate: undefined,
        endDate: undefined,
      })
    );
  };
  return (
    <div>
      <Toast />
      <div className="border w-60 mt-4 p-2 ">
        <DatePicker
          className="relative w-56 w-5"
          placeholderText="Select Starting Date"
          icon={<AiOutlineCalendar color="black" width={30} height={30} />}
          selected={selectedFirstDate}
          onChange={(date) => setSelectedFirstDate(date)}
        />
      </div>

      <div className="border w-60 mt-4 p-2 ">
        <DatePicker
          className="relative w-56 w-5"
          placeholderText="Select Ending Date"
          icon={<AiOutlineCalendar color="black" width={30} height={30} />}
          selected={seoectEndingDate}
          onChange={(date) => setSelectedEndingDate(date)}
        />
      </div>

      <div className="flex flex-row">
        <button
          onClick={handleButtonClick}
          className="bg-green-500 text-white p-3 rounded-lg mt-5 ml-10"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white p-3 rounded-lg mt-5 ml-10"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
