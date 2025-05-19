import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

import { useContext } from "react";

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [originalData,formData,setFormData,setOriginalData,loading]=useContext(UserContext)


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/user/profile", { userId }, {
          headers: { "Content-Type": "application/json" },
        });

        const userDetails = {
          fullName: response.data.fullName || "",
          phoneNumber: response.data.phoneNumber || "",
          addressLine1: response.data.addressLine1 || "",
          addressLine2: response.data.addressLine2 || "",
          city: response.data.city || "",
          state: response.data.state || "",
          postalCode: response.data.postalCode || "",
          country: response.data.country || "",
          upiId: response.data.upiId || "",
        };  

        setFormData(userDetails);
        setOriginalData(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any fields changed
    const hasChanged = Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );

    if (!hasChanged) {
      alert("No changes made.");
      navigate("/");
      return;
    }

    // Prepare updated fields only
    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key] && formData[key].trim() !== "") {
        updatedFields[key] = formData[key].trim();
      }
    });

    try {
      await axios.put("http://localhost:5000/details", { ...updatedFields, userId }, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Details saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Error updating details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gradient-to-b from-black via-[#402283] to-[#9F64DA] font-satoshi px-4 py-10">
      <div className="w-full max-w-[960px] bg-black/10 backdrop-blur-[70.9px] rounded-xl shadow-lg p-6 sm:p-10 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-500 mb-6 text-center">Your Shipping Details</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { id: "fullName", label: "Full Name" },
            { id: "phoneNumber", label: "Phone Number" },
            { id: "addressLine1", label: "Address Line 1" },
            { id: "addressLine2", label: "Address Line 2" },
            { id: "city", label: "City" },
            { id: "state", label: "State" },
            { id: "postalCode", label: "Postal Code" },
            { id: "country", label: "Country" },
            { id: "upiId", label: "UPI ID" },
          ].map((field) => (
            <div key={field.id} className="flex flex-col">
              <label htmlFor={field.id} className="font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="border-2 text-white border-white border-opacity-50 p-2 rounded-md bg-transparent placeholder:text-white"
              />
            </div>
          ))}

          <div className="sm:col-span-2 flex justify-around gap-10 mt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Save Details
            </button>

            <button
              type="button"
              className="w-full sm:w-1/2 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
              onClick={() => navigate("/")}
            >
              Skip for Now
            </button>
          </div>
        </form>
      </div>

      <div className="text-white text-sm text-center mt-6 max-w-md px-2">
        <p>Make sure the details are correct to avoid delivery issues.</p>
      </div>
    </div>
  );
};

export default UserDetailsForm;
