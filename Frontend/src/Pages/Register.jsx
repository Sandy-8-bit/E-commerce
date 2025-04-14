import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    alreadylogged();
  }, []);

  const alreadylogged = async () => {
    const tokenis = localStorage.getItem("token");
    if (tokenis) {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sending request to backend...");

    try {
      const response = await axios.post("http://localhost:5000/register", { email, password, name });

      console.log("Response:", response);
      alert("Registered successfully!");
      navigate("/login");  // Redirect to login after successful registration
    } catch (error) {
      console.error("Axios Error:", error);
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gradient-to-b from-black via-[#402283] to-[#9F64DA] font-satoshi px-4 py-8">
      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-[960px] bg-black/10 backdrop-blur-[70.9px] rounded-xl overflow-hidden shadow-lg">
        {/* Left Form Section */}
        <div className="w-full md:w-[50%] p-6 sm:p-10 flex flex-col justify-center gap-6">
          <div className="text-center">
            <h2 className="text-red-500 text-3xl sm:text-4xl font-black">Welcome To Shopyfy</h2>
            <p className="text-white text-lg">Register to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-white font-medium mb-1">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="border-2 focus:text-white text-white border-white border-opacity-50 p-2 rounded-md focus:outline-none placeholder:text-white bg-transparent"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-white font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 focus:text-white text-white border-white border-opacity-50 p-2 rounded-md focus:outline-none placeholder:text-white bg-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-white font-medium mb-1">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 focus:text-white border-white text-white border-opacity-20 p-2 pr-12 rounded-md focus:outline-none text-white placeholder:text-white bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2 text-white text-sm cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="border-2 bg-white text-black w-full py-2 rounded-md font-medium hover:bg-gray-200 transition"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center text-white text-sm">
            <span>Already have an account? </span>
            <Link to="/login" className="text-red-500 underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Image Section (hidden on small screens) */}
        <div className="hidden md:block w-[50%]">
          <img
            src="./right.png"
            alt="login"
            className="w-full h-full object-cover max-h-[500px]"
          />
        </div>
      </div>

      {/* Bottom terms message */}
      <div className="text-white text-sm text-center mt-6 max-w-md px-2">
        <p>
          By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Register;
