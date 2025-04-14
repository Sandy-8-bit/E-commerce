import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import multiavatar from "@multiavatar/multiavatar";
import { CartContext } from "../Context/CartContet";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [cartCount]= useContext(CartContext)
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpenMobile, setProfileOpenMobile] = useState(false);
  const [profileOpenDesktop, setProfileOpenDesktop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on specific pages where the navbar shouldn't be shown
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/details"
  ) {
    return null;
  }

  // Scroll to the section of the page
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const elementAfter = document.getElementById(id);
        if (elementAfter) {
          elementAfter.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

 

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setName("");
      setProfile("");
    }
  }, [token]);

  // Log the user out
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setName("");
    setProfile("");
    setCartCount(0);
    navigate("/login");
  };

  // Fetch user data after login
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

  // This function will be called after adding/removing products from the cart to update the count
  const updateCartCount = () => {
    fetchCartCount();
  };

  return (
    <div className="w-full px-4 py-3 flex flex-col gap-4 border-b border-gray-200">
      {/* Top Navbar */}
      <div className="flex flex-wrap justify-between items-center md:justify-start md:gap-6">
        <h2 className="font-bold text-black text-[clamp(1.5rem,4vw,2rem)] mr-4">
          SHOP.CO
        </h2>

        {/* Menu Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-500 text-[clamp(0.8rem,1.5vw,1rem)]">
          <p
            className="cursor-pointer hover:underline hover:underline-offset-1 text-gray-500 transform duration-1000"
            onClick={() => scrollToSection("home")}
          >
            Home
          </p>
          <p
            className="cursor-pointer hover:underline hover:underline-offset-1 text-gray-500 transform duration-1000"
            onClick={() => scrollToSection("top-selling")}
          >
            On Sale
          </p>
          <p
            className="cursor-pointer hover:underline hover:underline-offset-1 text-gray-500 transform duration-1000"
            onClick={() => scrollToSection("new-arrivals")}
          >
            New Arrivals
          </p>
          <p className="cursor-pointer hover:underline hover:underline-offset-1 text-gray-500 transform duration-1000">
            Brands
          </p>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2 flex-1">
          <img src="./Search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            className="border-none outline-none w-full ml-2 text-[clamp(0.8rem,1.5vw,1rem)]"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:ml-auto relative">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src="./Cart.png"
              alt="cart"
              className="w-[clamp(20px,3vw,28px)] h-[clamp(20px,3vw,28px)] cursor-pointer"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Avatar (Desktop hover) */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => name && setProfileOpenDesktop(true)}
            onMouseLeave={() => setProfileOpenDesktop(false)}
            onClick={() => navigate("/profile")}
          >
            {token && name ? (
              <div
                className="w-[clamp(28px,3vw,36px)] h-[clamp(28px,3vw,36px)] cursor-pointer"
                dangerouslySetInnerHTML={{
                  __html: multiavatar(name),
                }}
              />
            ) : (
              <img
                src="./Profile.png"
                alt="profile"
                className="w-[clamp(28px,3vw,36px)] h-[clamp(28px,3vw,36px)] rounded-full object-cover"
              />
            )}

            {/* Show dropdown only if logged in */}
            {profileOpenDesktop && token && (
              <div className="absolute right-0 mt-2 top-5 bg-white shadow-md rounded-lg p-3 z-20 w-[160px] text-sm">
                {name && (
                  <p className="text-gray-800 font-medium truncate">{name}</p>
                )}
                <button
                  onClick={logout}
                  className="text-red-500 mt-2 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Profile Avatar (Mobile tap) */}
          <div className="relative md:hidden">
            <div
              className="w-[40px] h-[40px] cursor-pointer"
              onClick={() => token && setProfileOpenMobile(!profileOpenMobile)}
            >
              {token && name ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: multiavatar(name),
                  }}
                />
              ) : (
                <img
                  src="./Profile.png"
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>

            {profileOpenMobile && token && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-3 z-20 w-[160px] text-sm">
                {name && (
                  <p className="text-gray-800 font-medium truncate">{name}</p>
                )}
                <button
                  onClick={logout}
                  className="text-red-500 mt-2 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Name (Desktop) */}
          {name && (
            <p className="hidden md:block text-gray-700 text-[clamp(0.75rem,2.5vw,1rem)] truncate max-w-[100px]">
              {name}
            </p>
          )}

          {/* Logout Button (Desktop) */}
          {token && (
            <button
              onClick={logout}
              className="hidden md:block border-2 px-3 py-1 rounded-lg text-sm hover:scale-105 transition"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-3 text-gray-600 md:hidden">
          <Link to="/" className="hover:text-black">
            Shop
          </Link>
          <p className="cursor-pointer hover:text-black">On Sale</p>
          <p className="cursor-pointer hover:text-black">New Arrivals</p>
          <p className="cursor-pointer hover:text-black">Brands</p>
        </div>
      )}

      {/* Search Bar (Mobile) */}
      <div className="md:hidden w-full">
        <div className="flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2">
          <img src="./Search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            className="border-none outline-none w-full ml-2 text-[clamp(0.8rem,1.5vw,1rem)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
