import { createContext,useState,useEffect,  } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const UserContext = createContext();




const userContext = ({children}) => {
     const [loading, setLoading] = useState(true);
     const userId = localStorage.getItem("userId");
     const [originalData, setOriginalData] = useState({});
    const [name, setName] = useState("");
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


      const logout = ()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setFormData({
        fullName: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
        window.location.reload();


      }
    
useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.post("http://localhost:5000/getuserss", {
            userId,
          });
          const userDetails = response.data;
          setName(userDetails.fullName);
  
          const updatedForm = {
            fullName: userDetails.fullName || "",
            phoneNumber: userDetails.phoneNumber || "",
            addressLine1: userDetails.addressLine1 || "",
            addressLine2: userDetails.addressLine2 || "",
            city: userDetails.city || "",
            state: userDetails.state || "",
            zipCode: userDetails.postalCode || "",
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
  return (
    <div>
      <UserContext.Provider value={[originalData,formData,setFormData,setOriginalData,loading,logout,name]}> 
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default userContext
