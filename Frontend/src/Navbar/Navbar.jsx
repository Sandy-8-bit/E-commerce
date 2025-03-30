import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      getUserData();

    }
  }, [token]);


  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setName(response.data.user.name);
      setProfile(response.data.profilepic); 

    
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };


  return (
    <div className="w-full flex flex-row items-center gap-[40px] px-4 py-2">
      {/* Logo Section */}
      <div>
        <img src="./Logo.png" alt="logo" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-row gap-4 items-center text-gray-500 text-[16px]">
        <Link to="/cart" className={`cursor-pointer ${location.pathname === "/cart" ? "text-blue-500" : ""}`}>
          <p>Shop</p>
        </Link>
        <p className="cursor-pointer">On sale</p>
        <p className="cursor-pointer">New Arrivals</p>
        <p className="cursor-pointer">Brands</p>
      </div>

      {/* Search Bar */}
      <div className="flex-1">
        <div className="flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2">
          <img src="./Search.png" alt="search" />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full ml-2"
            value={search}
             crossOrigin="anonymous"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cart & Profile */}
      <div className="flex gap-3 items-center justify-end">
        <Link to="/cart">
          <img src="./Cart.png" alt="cart" className="cursor-pointer" />
        </Link>
        {profile ? (
          <img
            src={profile}
            alt="profile"
            className="cursor-pointer w-7 h-7 rounded-full object-cover"
            onError={(e) => (e.target.src = "./Profile.png")} // Fallback if image fails
          />
        ) : (
          <img src="./Profile.png" alt="profile" className="cursor-pointer w-7 h-7 rounded-full object-cover" />
        )}
        {name && <p className="text-gray-700 font-medium">{name}</p>}
      </div>
    </div>
  );
};

export default Navbar;
