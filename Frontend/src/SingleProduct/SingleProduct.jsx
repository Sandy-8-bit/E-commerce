import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = ({ product, index, renderStars, isCartPage = false }) => {
  const actualProduct = product.productId || product;
  const userId = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);

  const removeCart = async () => {
    try {
      await axios.delete("http://localhost:5000/removeCart", {
        data: {
          userId,
          productId: actualProduct._id,
        },
      });
      toast.info("❌ Removed from cart!");
      window.location.reload();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const addCart = async () => {
    try {
      await axios.post("http://localhost:5000/addCart", {
        userId,
        productId: actualProduct._id,
      });
      toast.success("🛒 Added to cart!");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

  
      <div className="w-[300px] rounded-[20px] flex flex-col gap-3 p-4 shadow-md bg-white">
        <Link to={`/product/${actualProduct._id}`}>
          <div className="h-[300px] w-full rounded-[20px] overflow-hidden cursor-pointer">
            <img
              src={actualProduct.images?.[0]}
              alt={actualProduct.title}
              className="h-full w-full object-cover rounded-[20px] transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-gray-900 text-[20px] font-bold">{actualProduct.title}</h3>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="flex">{renderStars(actualProduct.rating)}</div>
            <p className="text-gray-600 text-sm">
              {actualProduct.rating} / 5 ({actualProduct.reviews?.length || 0} reviews)
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <h3 className="text-gray-900 text-[24px] font-bold">${actualProduct.price}</h3>
            {actualProduct.oldPrice && (
              <h3 className="text-gray-500 text-[20px] font-semibold line-through">
                ${actualProduct.oldPrice}
              </h3>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-3 justify-center flex-wrap">
          {isCartPage ? (
            <button
              onClick={removeCart}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm"
            >
              ❌ Remove
            </button>
          ) : (
            <>
              <button
                onClick={addCart}
                className="px-4 py-2 border border-black text-black rounded-[9px] text-sm hover:bg-black hover:text-white transition"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-sm border border-black text-black rounded-[9px] hover:bg-black hover:text-white transition"
              >
                👁️ Quick View
              </button>
            </>
          )}
        </div>
      </div>

 
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-[100] bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white rounded-[20px] max-w-[600px] w-full p-6 relative shadow-lg animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={actualProduct.images?.[0]}
                alt={actualProduct.title}
                className="w-full md:w-[250px] h-[250px] object-cover rounded-[15px]"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-[22px] font-bold text-gray-900">{actualProduct.title}</h2>
                <div className="flex">{renderStars(actualProduct.rating)}</div>
                <p className="text-gray-700">{actualProduct.description || 'No description available.'}</p>
                <div className="flex gap-2 items-center">
                  <span className="text-[20px] font-bold text-black">${actualProduct.price}</span>
                  {actualProduct.oldPrice && (
                    <span className="text-gray-400 line-through">${actualProduct.oldPrice}</span>
                  )}
                </div>
                <button
                  onClick={addCart}
                  className="mt-2 px-4 py-2 bg-black text-white rounded-[10px] hover:bg-gray-800 transition"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
