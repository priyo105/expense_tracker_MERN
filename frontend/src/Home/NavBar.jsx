import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillNotification, AiOutlineNotification } from "react-icons/ai";
import InputWithIcons from "../Components/InputWithIcons";
import MobileToggleSidebar from "./MobileToggleSidebar";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="bg-white w-full h-24 fixed md:relative z-50">
      <div className="flex mt-10 ml-10 mr-10 justify-evenly gap-10">
        <img
          src="/menu.png"
          width={30}
          height={15}
          className="block md:hidden"
          onClick={() => {
            toggle == false ? setToggle(true) : setToggle(false);
          }}
        />

        <h1 className="font-bold font-poppins">Tracker</h1>

        <div className="flex">
          <FaSearch className="mr-2 mt-1 " />
          <input
            placeholder="Search"
            className="border-b-2 p-0.5 outline-none w-20 md:w-32"
          />
        </div>

        <div className="flex">
          <AiOutlineNotification className="mr-2 mt-1" />
          <p className="hidden md:block">Notification</p>
        </div>
      </div>
     
     <MobileToggleSidebar toggle={toggle} />
   
    </nav>
  );
}

export default NavBar;
