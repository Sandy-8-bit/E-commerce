import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import multiavatar from "@multiavatar/multiavatar";
import { CartContext } from "../Context/CartContet";  // double-check spelling of CartContet vs CartContext
import { UserContext } from "../Context/userContext";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [cartCount]= useContext(CartContext)
  const [,,,,,,name] = useContext(UserContext);
  const [profile, setProfile] = useState("");
  const [,,,,,logout] = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpenMobile, setProfileOpenMobile] = useState(false);
  const [profileOpenDesktop, setProfileOpenDesktop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [,setCartCount] = useContext(CartContext);

  // Hide Navbar on specific routes
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/details"
  ) {
    return null;
  }

  // Scroll helper: scrolls to section or navigates home and then scrolls
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

  // Search products by title (case-insensitive)
const search = async () => {
  const word = searchTerm.toLowerCase();
  try {
    const res = await axios.get(
      `http://localhost:5000/products/search-title/${word}`
    );
    if (!res.data || res.data.length === 0) {
      setSearchResults([]); // empty array means no results
    } else {
      setSearchResults(res.data);
    }
  } catch (error) {
    console.error("Search error:", error);
    setSearchResults([]);
  }
};



  // Debounce search input
  useEffect(() => {
    if (searchTerm.length < 3) {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Fetch user profile picture if token exists
  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setName("");
      setProfile("");
    }
  }, [token]);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.profilepic);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  return (
    <div className="w-full px-4 py-3 flex flex-col gap-4 border-b border-gray-200 relative">
      {/* Top Navbar */}
      <div className="flex flex-wrap justify-between items-center md:justify-start md:gap-6">
        <h2 className="font-bold text-black text-[clamp(1.5rem,4vw,2rem)] mr-4">
          SHOP.CO
        </h2>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-500 text-[clamp(0.8rem,1.5vw,1rem)]">
          {["home", "top-selling", "new-arrivals", "contact"].map((section) => (
            <p
              key={section}
              className="cursor-pointer hover:underline hover:underline-offset-1 text-gray-500 transform duration-1000"
              onClick={() => scrollToSection(section)}
            >
              {section.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </p>
          ))}
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2 flex-1 relative">
          <img src="./Search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="border-none outline-none w-full ml-2 text-[clamp(0.8rem,1.5vw,1rem)]"
          />

          {/* Search Results Dropdown */}
          {/* Search Results Dropdown */}
{searchTerm.length >= 3 && (
  <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-lg w-full z-50 max-h-60 overflow-y-auto">
    {searchResults.length > 0 ? (
      searchResults.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
          onClick={() => {
            setSearchResults([]);
            setSearchTerm("");
          }}
        >
          {product.title}
        </Link>
      ))
    ) : (
      <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
    )}
  </div>
)}
        </div>

        {/* Right Side Icons */}
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

          {/* Profile Avatar Desktop */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => name && setProfileOpenDesktop(true)}
            onMouseLeave={() => setProfileOpenDesktop(false)}
            onClick={() => navigate("/profile")}
          >
            {token && name ? (
              <div
                className="w-[clamp(28px,3vw,36px)] h-[clamp(28px,3vw,36px)] cursor-pointer"
                dangerouslySetInnerHTML={{ __html: multiavatar(name) }}
              />
            ) : (
              <img
                src="./Profile.png"
                alt="profile"
                className="w-[clamp(28px,3vw,36px)] h-[clamp(28px,3vw,36px)] rounded-full object-cover"
              />
            )}

            {/* Dropdown menu */}
            {profileOpenDesktop && token && (
              <div className="absolute right-0 mt-2 top-5 bg-white shadow-md rounded-lg p-3 z-20 w-[160px] text-sm">
                {name && <p className="text-gray-800 font-medium truncate">{name}</p>}
                <button
                  onClick={logout}
                  className="text-red-500 mt-2 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Profile Avatar Mobile */}
          <div className="relative md:hidden">
            <div
              className="w-[40px] h-[40px] cursor-pointer"
              onClick={() => token && setProfileOpenMobile(!profileOpenMobile)}
            >
              {token && name ? (
                <div dangerouslySetInnerHTML={{ __html: multiavatar(name) }} />
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
                {name && <p className="text-gray-800 font-medium truncate">{name}</p>}
                <button
                  onClick={logout}
                  className="text-red-500 mt-2 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* User Name Desktop */}
          {name && (
            <p className="hidden md:block text-gray-700 text-[clamp(0.75rem,2.5vw,1rem)] truncate max-w-[100px]">
              {name}
            </p>
          )}

          {/* Logout Button Desktop */}
          {token && (
            <button
              onClick={logout}
              className="hidden md:block border border-gray-300 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}

          {/* Hamburger Menu Mobile */}
          <div className="md:hidden">
            <button
              className="text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden flex items-center border-2 border-gray-300 rounded-3xl px-3 py-2 w-full relative">
        <img src="./Search.png" alt="search" className="w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="border-none outline-none w-full ml-2 text-sm"
        />
       {searchTerm.length >= 3 && (
  <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-lg w-full z-50 max-h-60 overflow-y-auto">
    {searchResults.length > 0 ? (
      searchResults.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
          onClick={() => {
            setSearchResults([]);
            setSearchTerm("");
          }}
        >
          {product.title}
        </Link>
      ))
    ) : (
      <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
    )}
  </div>
)}

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 md:hidden text-gray-600 text-[clamp(0.75rem,3vw,1rem)] px-1">
          {["home", "top-selling", "new-arrivals", "contact"].map((section) => (
            <p
              key={section}
              className="cursor-pointer hover:underline hover:underline-offset-1"
              onClick={() => {
                setMenuOpen(false);
                scrollToSection(section);
              }}
            >
              {section.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </p>
          ))}
          {!token && (
            <>
              <Link
                to="/login"
                className="cursor-pointer hover:underline hover:underline-offset-1"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="cursor-pointer hover:underline hover:underline-offset-1"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
          {token && (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
