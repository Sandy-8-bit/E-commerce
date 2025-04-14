import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Phone,
  MapPin,
  Building,
  Flag,
  Mail,
  Save,
  Loader2,
  Upload,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import multiavatar from "@multiavatar/multiavatar";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getuserss", {
          userId,
        });
        const userDetails = response.data;

        const updatedForm = {
          fullName: userDetails.fullName || "",
          phoneNumber: userDetails.phoneNumber || "",
          addressLine1: userDetails.addressLine1 || "",
          addressLine2: userDetails.addressLine2 || "",
          city: userDetails.city || "",
          state: userDetails.state || "",
          zipCode: userDetails.zipCode || "",
          country: userDetails.country || "",
        };

        setFormData(updatedForm);
        setOriginalData(updatedForm);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
        toast.error("Failed to load profile.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasChanged = Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );

    if (!hasChanged && !avatar) {
      toast("No changes made.", { icon: "ℹ️" });
      return;
    }

    setSaving(true);

    try {
      const cleanedData = { ...formData, userId };
      Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key] === "") delete cleanedData[key];
      });

      // Simulate avatar upload
      if (avatar) {
        const formDataImage = new FormData();
        formDataImage.append("avatar", avatar);
        formDataImage.append("userId", userId);

        await axios.post("http://localhost:5000/upload-avatar", formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Avatar uploaded!");
      }

      const response = await axios.put(
        "http://localhost:5000/details",
        cleanedData
      );
      const updatedForm = {
        fullName: response.data.fullName || "",
        phoneNumber: response.data.phoneNumber || "",
        addressLine1: response.data.addressLine1 || "",
        addressLine2: response.data.addressLine2 || "",
        city: response.data.city || "",
        state: response.data.state || "",
        zipCode: response.data.postalCode || "",
        country: response.data.country || "",
      };

      toast.success("Profile updated successfully!");
      setOriginalData(updatedForm);
      setFormData(updatedForm);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case "fullName":
        return <User size={20} className="text-indigo-500" />;
      case "phoneNumber":
        return <Phone size={20} className="text-indigo-500" />;
      case "addressLine1":
      case "addressLine2":
        return <MapPin size={20} className="text-indigo-500" />;
      case "city":
        return <Building size={20} className="text-indigo-500" />;
      case "state":
        return <MapPin size={20} className="text-indigo-500" />;
      case "zipCode":
        return <Mail size={20} className="text-indigo-500" />;
      case "country":
        return <Flag size={20} className="text-indigo-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
        {/* Left Panel */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center py-12 px-6 lg:col-span-1">
          <div className="relative">
            <label htmlFor="avatar-upload" className="cursor-pointer group">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center py-12 px-6 lg:col-span-1">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: multiavatar(formData.fullName || "User"),
                    }}
                  />
                </div>
                <h2 className="mt-4 text-2xl font-semibold">
                  {formData.fullName || "Your Name"}
                </h2>
                <p className="text-sm text-indigo-100 mt-1">Personal Info</p>
              </div>
            </label>
      
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:col-span-2 p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Profile
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {Object.keys(formData).map((field) => (
              <div key={field} className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <div className="flex items-center border rounded-lg p-2 shadow-sm focus-within:ring-2 ring-indigo-400 bg-white">
                  <span className="mr-2">{getFieldIcon(field)}</span>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
            ))}

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={saving}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
                }`}
              >
                {saving ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
