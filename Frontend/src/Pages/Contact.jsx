import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    terms: false,
  });

  const [copyStatus, setCopyStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.message ||
      !formData.terms
    ) {
      alert("Please fill all fields and agree to the terms.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("", formData);
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
        terms: false,
      });
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Linkss = {
    mail : "mailto:santhoshvenugopal2004@gmail",
    phone:"9715524124"
  }

  return (
    <div>
      <div className="flex gap-[70px] justify-center flex-wrap items-center py-6 Satoshi">
        <div className="flex flex-col gap-[50px] justify-center items-center min-w-[260px]">
          <h2 className="font-[300] leading-[50px] text-[46px] md:text-[64px] text-center text-[#303030]">
            We'd Love to Hear from You!
          </h2>

          <div className="flex justify-center md:justify-between  gap-15 items-center flex-wrap self-stretch">
            <div className="flex flex-col gap-[30px] items-start w-[275px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-3 items-center">
                  <p className="font-[500] text-[20px] text-[#303030]">
                    Get in Touch with Us!
                  </p>
                  <img src="./Rightarrow.png" alt="Contact" />
                </div>
                <p className="font-[300] text-[18px] text-[#303030]">
                  We'd love to hear from you! Whether you have a question, need
                  support, or just want to share feedback, our team is here to
                  help.
                </p>
              </div>

              <div className="flex flex-col gap-[10px] text-[#303030]">
                <p className="text-[20px] font-[500]">Join Us</p>
                <div className="flex gap-5">
                  {["x2.png", "x2.png", "x2.png", "x2.png"].map(
                    (src, index) => (
                      <div
                        key={index}
                        className="cursor-pointer relative group border-2 w-[35px] h-[35px] border-[#303030] rounded-[50px] p-2 transition-all duration-300 hover:bg-black"
                      >
                        <img
                          src={src}
                          className="w-[25px] h-[25px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0"
                          alt="icon"
                        />
                        <img
                          src="White-x.png"
                          className="w-[20px] h-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          alt="hover-icon"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-[5px]">
                <p className="font-[500] text-[20px] text-[#303030]">
                  Where we are located
                </p>
                <p className="font-[400] text-[18px]">Bangalore</p>
                <p className="font-[300] text-[#303030] text-[18px] mt-[5px]">
                  VJX4+J6Q, 6th Main St, Thayappa Garden, Ranka Colony,
                  Bilekahalli, Bengaluru, Karnataka 560076
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[25px] w-[300px]"
            >
              <div className="flex flex-col gap-[35px]">
                <input
                  type="text"
                  id="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-b border-gray-300 w-full  py-2 placeholder:text-[#303030] focus:outline-none"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-b border-gray-300 w-full  py-2 placeholder:text-[#303030] focus:outline-none"
                />
                <input
                  type="text"
                  id="number"
                  placeholder="Number*"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="border-b border-gray-300 w-full  py-2  placeholder:text-[#303030] focus:outline-none"
                />
                <input
                  type="text"
                  id="message"
                  placeholder="Message*"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-b border-gray-300 w-full py-2 placeholder:text-[#303030] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="border-2 border-black border-opacity-50 p-2"
                />
                <label htmlFor="terms" className="text-[#303030]">
                  I agree to the{" "}
                  <Link to="/terms" className="underline text-[#303030]">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="text-[#303030] py-[5px] px-[25px] border-[0.5px] border-[#303030] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.29)] hover:scale-105 cursor-pointer transform duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-0.5 bg-[#303030] self-stretch hidden lg:block"></div>

        <div className="flex flex-col px-5 md:px-0 gap-[15px]">
          <div className="relative group">
            <a
              href="https://www.google.com/maps/place/Wise+Work/@12.8989817,77.6030276,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1764c7049479:0xb10c75dfc7ea70b4!8m2!3d12.8989765!4d77.6056025!16s%2Fg%2F11j_5j3v1f?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./Map.png"
                alt="map"
                draggable="false"
                className="w-full h-full hover:scale-105 cursor-pointer transform duration-300"
              />

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to open map
              </div>
            </a>
          </div>

          <div className="low flex gap-[15px] justify-between">
            <div className="contact flex flex-col gap-[10px]">
              <h3 className="font-[500] text-[20px] text-[#303030]">
                Contacts
              </h3>
              <div className="text-[#3E3E3E] text-[18px] flex flex-col gap-[5px]">
                <p
                  className="cursor-pointer"
                  onClick={() => window.location.href = Linkss.mail}
                >
                  WiseWok@gmail.com
                </p>
                <p
                  className="cursor-pointer"
                >
                  +91 123456789
                </p>
                {copyStatus && <p className="text-green-500">{copyStatus}</p>}
              </div>
            </div>

            <div className="hors flex flex-col gap-[10px]">
              <h3 className="font-[500] text-[20px] text-[#303030]">
                Working Hours
              </h3>
              <p className="text-[18px] text-[#3E3E3E]">9:00AM - 6:00PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
