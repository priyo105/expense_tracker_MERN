import React from "react";

function DashBoardBox({ title, color, icon, value }) {
  return (
    <div className={`w-72 lg:w-56 h-20 rounded-lg flex ${color}`}>
      <div className="p-6">{icon}</div>

      <div>
        <p className="text-white text-center mt-5 font-poppins font-bold">
          {title}
        </p>

         <p className="text-white text-center font-bold font-sans">
            £ {value}.00
         </p>
      </div>
    </div>
  );
}

export default DashBoardBox;
