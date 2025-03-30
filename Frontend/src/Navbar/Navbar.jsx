import React, { useState } from "react";
import { Link ,useLocation } from "react-router-dom";

const Navbar = (props) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  return (
    <div className="w-full flex flex-row items-center gap-[40px] px-4 py-2">
      {/* Logo Section */}
      <div>
        <img src="./Logo.png" alt="logo" className="" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-row gap-4 items-center text-gray-500 text-[16px]">
        <Link to="/cart" className={`cursor-pointer ${location.pathname === "/cart" ? "text-blue-500" : ""}`}> <p >Shop</p></Link>
        <p className="cursor-pointer">On sale</p>
        <p className="cursor-pointer">New Arrivals</p>
        <p className="cursor-pointer">Brands</p>
      </div>

      {/* Search Bar */}
      <div className="flex-1">
        <div className="flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2">
          <img src="./Search.png" alt="search" className="" />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full ml-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cart & Profile */}
      <div className="flex gap-4 items-center justify-end">
        <Link to="/cart">
          <img src="./Cart.png" alt="cart" className="cursor-pointer " />
        </Link>
        <img src="./Profile.png" alt="profile" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
