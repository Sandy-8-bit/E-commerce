import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem("userId");

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const addCart = async () => {
    try {
      await axios.post("http://localhost:5000/addCart", {
        userId: userId,
        productId: id
      });
      alert("Added");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {product ? (
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex justify-between">
          <div className="flex flex-col gap-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                    selectedImage === img ? 'ring-2 ring-black' : ''
                  }`}
                />
              ))}
            </div>
          <div className='h-[400px]'>
          <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full  object-cover rounded-xl transition duration-300"
            />
          </div>
            
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <p className="text-sm text-gray-600">
                ({product.reviews?.length || 0} reviews)
              </p>
            </div>
            <div className="flex gap-4 items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-600">${product.price}</h2>
              {product.oldPrice && (
                <h3 className="text-gray-400 text-xl line-through">${product.oldPrice}</h3>
              )}
              {product.oldPrice && (
                <span className="text-red-500 font-medium">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Size selection */}
            <div className="mb-4">
              <p className="mb-2 font-medium">Choose Size:</p>
              <div className="flex gap-3">
                {["Small", "Medium", "Large", "X-Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-full px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-lg"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-lg"
                >
                  +
                </button>
              </div>
              <button onClick={addCart} className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}

      {/* Reviews */}
      {product?.reviews && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Rating & Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.user.slice(0, 6)}...
                  </span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
