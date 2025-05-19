import "./App.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./Cart/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Navbar/Navbar";
import CartProvider from "./Context/CartContet";
import ProductDetail from "./ProductDetail/ProductDetail";
import UserDetailsForm from "./Userdetails/UserDetailsForm";
import ProfilePage from "./Profile/Profile";
import ProductShowcase from "./Pages/ProductShowcase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "./Context/userContext";

function App() {
  return (
    <UserContext>

    
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="px-[20px] md:px-[100px]">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details" element={<UserDetailsForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Product" element={<ProductShowcase />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </CartProvider>
    </UserContext>
  );
}

export default App;
