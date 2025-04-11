import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // import Link

const SingleProduct = ({ product, index, renderStars, isCartPage = false }) => {
  const actualProduct = product.productId || product;
  const userId = localStorage.getItem("userId");

  const removeCart = async () => {
    try {
      await axios.delete("http://localhost:5000/removeCart", {
        data: {
          userId: userId,
          productId: actualProduct._id
        }
      });

      window.location.reload(); 
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const addCart = async () => {
    try {
      await axios.post("http://localhost:5000/addCart", {
        userId: userId,
        productId: actualProduct._id
      });
      alert("Added");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div className="w-[300px] rounded-[20px] flex flex-col gap-3 p-4 shadow-md bg-white">
        <Link to={`/product/${actualProduct._id}`}>
          <div className="h-[300px] w-full rounded-[20px] overflow-hidden cursor-pointer">
            <img
              src={actualProduct.images?.[0]}
              alt={actualProduct.title}
              className="h-full w-full object-cover rounded-[20px] transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-900 text-[20px] font-bold">{actualProduct.title}</h3>
            <div className="flex gap-2 flex-col md:flex-row items-center">
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
        </Link>

        {/* Buttons should not be inside the Link */}
        {isCartPage ? (
          <button
            onClick={removeCart}
            className="cursor-pointer mt-3 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition duration-300"
          >
            ❌ Remove from Cart
          </button>
        ) : (
          <button
            onClick={addCart}
            className="cursor-pointer mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition duration-300"
          >
            ➕ Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
