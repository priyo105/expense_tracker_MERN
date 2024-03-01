import React from "react";

export default function FormInput({title,setonChange,placeholder}) {
  return (
    <div className="mt-10 w-2/3 md:w-1/3">
      <p className="font-poppins font-bold"> {title}</p>
      <input
        onChange={(event) => {
            setonChange(event.target.value);
        }}
        placeholder={placeholder}
        className="border rounded p-2 mt-3 w-full"
      ></input>
    </div>
  );
}
