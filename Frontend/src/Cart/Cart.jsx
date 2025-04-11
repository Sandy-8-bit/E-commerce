import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cartcomp from '../Cart/Cartcomp';
import renderStars from '../Utils/Renderstars';
import StayUpdate from '../Stayupdated/StayUpdate';
import Footer from '../Footer/Footer';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const userId = localStorage.getItem("userId");

  const getCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${userId}`);
      console.log("Cart Response:", res.data);

      if (res.data && Array.isArray(res.data.products)) {
        setCartProducts(res.data.products);
      } else {
        setCartProducts([]);
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
      setCartProducts([]);
    }
  };

  const removeAllCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/deleteallcart", { userId });

      if (response.status === 200) {
        alert("🛒 All items removed from cart!");
        window.location.reload();
      } else {
        alert("Something went wrong while removing items.");
      }
    } catch (error) {
      console.error("Error removing all items from cart:", error);
      alert("❌ Failed to remove all items from cart.");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete("http://localhost:5000/removeCart", {
        data: {
          userId,
          productId,
        },
      });

      if (response.status === 200) {
        setCartProducts((prev) =>
          prev.filter((item) => item.productId._id !== productId)
        );
      } else {
        alert("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("❌ Failed to remove the item from cart.");
    }
  };

  const subtotal = cartProducts.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  const totalDiscount = cartProducts.reduce((acc, item) => {
    return acc + (item.productId.oldPrice - item.productId.price) * item.quantity;
  }, 0);

  const total = subtotal;

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }} className="font-[700] text-[48px] text-black-500 text-center Intergal-cf">Your Cart</h2>
          <p
            className="text-red-600 cursor-pointer"
            style={{ fontSize: 'clamp(0.8rem, 2vw, 1.2rem)' }}
            onClick={removeAllCart}
          >
            Clear
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="w-full border border-gray-300 rounded-2xl px-4 py-4 max-h-[500px] overflow-auto">
            {cartProducts.length > 0 ? (
              cartProducts.map((product, index) => (
                <Cartcomp key={index} product={product} handleRemove={handleRemoveItem} />
              ))
            ) : (
              <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}>No items in your cart.</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full border border-gray-300 rounded-2xl px-4 py-4 flex flex-col gap-4">
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }} className="font-bold">Order Summary</h2>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}>Subtotal</p>
                <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}>Discount</p>
                <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }} className="text-green-600">
                  - ${totalDiscount.toFixed(2)}
                </p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <p style={{ fontSize: 'clamp(1rem, 2.8vw, 1.4rem)' }}>Total</p>
                <p style={{ fontSize: 'clamp(1rem, 2.8vw, 1.4rem)' }}>${(total - totalDiscount).toFixed(2)}</p>
              </div>
            </div>

            <button className="bg-black w-full text-white py-2 rounded" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}>
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
