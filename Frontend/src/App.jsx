import './App.css';
import { Route, Routes } from 'react-router-dom';

import Cart from './Cart/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

import FullScreen from './Pages/ProductShowcase';
import Navbar from './Navbar/Navbar';
import CartProvider from './Context/CartContet';
import Cartcomp from './Cart/Cartcomp';
import ProductDetail from './ProductDetail/ProductDetail';
import UserDetailsForm from './Userdetails/UserDetailsForm';
import ProfilePage from './Profile/Profile';
import ProductShowcase from './Pages/ProductShowcase';

function App() {
  return (
    <CartProvider>
      <div  className='px-[20px] md:px-[100px]'>
        <Navbar />
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/details' element={<UserDetailsForm/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/Product" element={<ProductShowcase />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </CartProvider>
  );
}

export default App;
