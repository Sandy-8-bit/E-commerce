import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setName("");
      setProfile("");
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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
    <div className="w-full px-4 py-3 flex flex-col gap-4 border-b border-gray-200">
      {/* Top Navbar */}
      <div className="flex flex-wrap justify-between items-center md:justify-start md:gap-6">
        {/* Logo */}
        <h2 className="font-bold text-black text-[clamp(1.5rem,4vw,2rem)] mr-4">
          SHOP.CO
        </h2>

        {/* Menu Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-500 text-[clamp(0.8rem,1.5vw,1rem)]">
          <Link
            to="/"
            className={`cursor-pointer ${
              location.pathname === "/cart" ? "text-blue-500" : ""
            }`}
          >
            Shop
          </Link>
          <p className="cursor-pointer">On Sale</p>
          <p className="cursor-pointer">New Arrivals</p>
          <p className="cursor-pointer">Brands</p>
        </div>

        {/* Search bar (only visible in desktop inline) */}
        <div className="hidden md:flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2 flex-1">
          <img src="./Search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            className="border-none outline-none w-full ml-2 text-[clamp(0.8rem,1.5vw,1rem)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Right Side (Cart, Profile, Name, Logout) */}
        <div className="flex items-center gap-3 md:ml-auto relative">
          {/* Cart */}
          <Link to="/cart">
            <img
              src="./Cart.png"
              alt="cart"
              className="w-[clamp(20px,3vw,28px)] h-[clamp(20px,3vw,28px)] cursor-pointer"
            />
          </Link>

          {/* Profile Image */}
          <div className="relative">
            <img
              src={profile || "./Profile.png"}
              alt="profile"
              className="w-[clamp(20px,3vw,28px)] h-[clamp(20px,3vw,28px)] rounded-full object-cover cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
              onError={(e) => (e.target.src = "./Profile.png")}
            />

            {/* Profile Dropdown (Mobile Only) */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-3 z-20 w-[160px] md:hidden text-sm">
                {name && (
                  <p className="text-gray-800 font-medium truncate">
                    {name}
                  </p>
                )}
                {token && (
                  <button
                    onClick={logout}
                    className="text-red-500 mt-2 hover:underline"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Name (Desktop Only) */}
          {name && (
            <p className="hidden md:block text-gray-700 text-[clamp(0.75rem,2.5vw,1rem)] truncate max-w-[100px]">
              {name}
            </p>
          )}

          {/* Logout Button (Desktop Only) */}
          {token && (
            <button
              onClick={logout}
              className="hidden md:block border-2 px-3 py-1 rounded-lg text-sm hover:scale-105 transition"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <img
              src="./Menu.png"
              alt="menu"
              className="w-6 h-6 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-3 text-gray-600 md:hidden">
          <Link to="/" className="hover:text-black">Shop</Link>
          <p className="cursor-pointer hover:text-black">On Sale</p>
          <p className="cursor-pointer hover:text-black">New Arrivals</p>
          <p className="cursor-pointer hover:text-black">Brands</p>
          {token && !profileOpen && (
            <button
              onClick={logout}
              className="border-2 px-3 py-1 rounded-lg w-fit text-sm hover:scale-105 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Search Bar for Mobile (below everything) */}
      <div className="md:hidden w-full">
        <div className="flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2">
          <img src="./Search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            className="border-none outline-none w-full ml-2 text-[clamp(0.8rem,1.5vw,1rem)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
