import './App.css';
import { Route, Routes } from 'react-router-dom';

import Cart from './Cart/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Contacts from './Pages/Contacts';
import FullScreen from './Pages/FullScreen';
import Navbar from './Navbar/Navbar';
import CartContet from './Context/CartContet';
import Cartcomp from './Cart/Cartcomp';
import ProductDetail from './ProductDetail/ProductDetail';

function App() {
  return (
    <CartContet>
      <div className='px-[20px] md:px-[100px]'>
        <Navbar />
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/Product" element={<FullScreen />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </CartContet>
  );
}

export default App;
