import React from "react";
import Select from "react-dropdown-select";

const options = [
  {
    id: 1,
    name: "This Month",
  },
  {
    id: 2,
    name: "Last Week",
  },
  {
    id: 3,
    name: "Last Month",
  },

  {
    id: 4,
    name: "Last 2 Months",
  },
  {
    id: 5,
    name: "Last 3 Months",
  },

  {
    id: 6,
    name: "Last 6 Months",
  },

  {
    id: 7,
    name: "Last 12 Months",
  },
];

function DateRangePickerDropDownSelect({ setDateRangeSelector }) {
  return (
    <div>
      <Select
        options={options}
        labelField="name"
        style={{ width: 200, color: "black" }}
        placeholder="Select Dateframe"
        valueField="id"
        onChange={(values) => setDateRangeSelector(values[0].name)}
      />
      ;
    </div>
  );
}

export default DateRangePickerDropDownSelect;
