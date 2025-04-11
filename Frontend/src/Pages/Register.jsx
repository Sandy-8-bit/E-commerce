import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name , setname] = useState("")
  const [loading, setLoading] = useState(false);


    useEffect(()=>{
      alreadylogged();
    } ,[])
      const alreadylogged = async ()=>{
          const tokenis = localStorage.getItem("token")
          if(tokenis){
              navigate("/")
  
          }
      }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log("Sending request to backend...");
  
    try {
      const response = await axios.post("http://localhost:5000/register", { email, password , name });
  
      console.log("Response:", response);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Axios Error:", error);
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-b from-black via-[#402283] to-[#9F64DA] font-satoshi">
      <div className="flex flex-col justify-center items-center w-full md:max-w-[960px] p-4 ">
        <div className="content flex rounded-[9px] bg-black/10 backdrop-blur-[70.9px] px-2 py-8 md:p-10 shadow-lg gap-4 md:gap-0 md:flex-row justify-center items-center w-full h-full md:h-[500px] overflow-hidden relative">
          <div className="top-1 w-full p-[26px] flex flex-col justify-between">
            <div className="w-full flex items-center flex-col">
            <h2 className="text-red-500 text-[clamp(1.75rem,5vw,2.5rem)] font-black">
  Welcome To Shopyfy
</h2>

              <p className="text-white text-[18px]">Register  to your login</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              {/* name input */}
            <div className="flex flex-col">
                <label htmlFor="Name" className="text-white font-medium mb-1">Name</label>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter your email"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="border-2 focus:text-white text-white border-white border-opacity-50 p-2 rounded-md focus:outline-none placeholder:text-white"
                />
              </div>


              {/* Email Input */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 focus:text-white text-white border-white border-opacity-50 p-2 rounded-md focus:outline-none placeholder:text-white"
                />
              </div>

              {/* Password Input with Show/Hide */}
              <div className="flex flex-col relative">
                <label htmlFor="password" className="text-white font-medium mb-1">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 focus:text-white border-white text-white border-opacity-20 p-2 pr-12 rounded-md focus:outline-none text-white placeholder:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-1 -translate-y-1/2 text-white text-sm cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="border-2 bg-white text-black w-full py-2 rounded-md font-medium"
                  disabled={loading}
                >
                  {loading ? "Signning in..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="flex gap-1 items-center justify-center">
              <p>Already having an account?</p>
              <Link to="/login" className="text-red-500 cursor-pointer">Sign In</Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="top-2 hidden md:block">
            <img src="./right.png" alt="login" className="h-[500px]" />
          </div>
        </div>

        {/* Footer */}
        <div className="bottom w-full flex justify-center items-center text-white mt-4">
          <p>
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
