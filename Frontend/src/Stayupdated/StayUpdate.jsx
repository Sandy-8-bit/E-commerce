import React, { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const StayUpdate = () => {
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendMail = async () => {
    if (!mail) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const post = await axios.post("http://localhost:5000/sendMail", {
        email: mail,
      });

      setMessage("Subscribed successfully! 🎉");
      setTimeout(() => {
        setMail("");
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to subscribe. Try again.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="bg-black flex justify-between px-[30px] md:px-[64px] py-[36px] rounded-[28px] flex-wrap gap-5">
        <div className="w-[551px]">
          <h2
            className="text-[40px] font-[700] Intergal-cf text-white"
            style={{ fontSize: "clamp(24px, 2.5vw, 40px)" }}
          >
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>
        <div className="w-[350px] flex flex-col justify-between gap-[20px]">
          <div className="w-full relative">
            <input
              type="email"
              className="w-full bg-white pl-12 pr-4 py-3 rounded-[62px] border border-gray-300 focus:outline-none focus:ring-2 placeholder:text-[16px] focus:ring-black-500"
              placeholder="Enter Your Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              disabled={loading}
            />
            <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="w-full">
            <button
              className={`bg-white px-4 w-full py-3 text-[16px] font-[500] text-black rounded-[62px] hover:scale-110 transform duration-300 cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={sendMail}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe to Newsletter"}
            </button>
          </div>
          {message && (
            <p className="text-white text-center text-sm mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StayUpdate;
