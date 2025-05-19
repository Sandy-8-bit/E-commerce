import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { MessageSquare } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { CartContext } from "../Context/CartContet";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(5); // Default rating is 5
  const [isCommenting, setIsCommenting] = useState(false);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const[,,,addCart] = useContext(CartContext);

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
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };



  const handleCommentSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/addComment/${id}`, {
        comment: userComment,
        rating: userRating,
        userId: userId,
        name: userName,
      });
      toast.success("Comment added successfully!");
      setUserComment(""); // Clear the input after submission
      setIsCommenting(false); // Close the comment box
      getProduct(); // Refresh the product to show the new comment
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };




  return (
    <div>
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {product ? (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                      selectedImage === img ? "ring-2 ring-black" : ""
                    }`}
                  />
                ))}
              </div>
              <div className="h-[400px]">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-xl transition duration-300"
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <p className="text-sm text-gray-600">
                  ({product.reviews?.length || 0} reviews)
                </p>
              </div>
              <div className="flex gap-4 items-center mb-4">
                <h2 className="text-2xl font-semibold text-green-600">
                  ${product.price}
                </h2>
                {product.oldPrice && (
                  <h3 className="text-gray-400 text-xl line-through">
                    ${product.oldPrice}
                  </h3>
                )}
                {product.oldPrice && (
                  <span className="text-red-500 font-medium">
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    % off
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>

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
                <button
                  onClick={()=>addCart(id)}
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}

        {isCommenting && (
          <div className="fixed inset-0 backdrop-blur-sm z-[100] bg-opacity-40 flex justify-center items-center px-4">
            <div className="px-6 py-3 border w-[1000px]  rounded-lg shadow-sm bg-white">
              <div className="flex items-end justify-end w-full">
                <p
                  className="cursor-pointer"
                  onClick={() => setIsCommenting(false)}
                >
                  Close
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Write a Comment
                  </h3>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex gap-2 items-center">
                    <span>Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={userRating === star}
                          onChange={() => setUserRating(star)}
                          className="hidden"
                        />
                        <span
                          className={`text-lg ${
                            userRating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <input
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
                className="w-full p-4 border rounded-lg resize-none mb-4"
              />

              <div className="w-full justify-center flex">
                <button
                  onClick={handleCommentSubmit}
                  className=" text-black border-1 border-black-400 px-6 py-2 rounded-[9px] justify-center hover:bg-gray-900 hover:text-white hover:scale-110 transform-3d duration-300 cursor-pointer transition"
                >
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
        )}

{product?.reviews && (
  <div className="mt-16">
    <div className="flex justify-between">
      <h2 className="text-2xl font-semibold mb-6">Rating & Reviews</h2>
      <div className="flex items-center gap-3 justify-center">
        <MessageSquare className="w-6 h-6 text-blue-500" />
        <h2
          onClick={() => setIsCommenting(true)}
          className="text-xl font-semibold cursor-pointer text-black"
        >
          Write a Comment
        </h2>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {(showAllReviews ? product.reviews : product.reviews.slice(0, 4)).map(
        (review) => (
          <div
            key={review._id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-800">
                {(review.name ? review.name.slice(0, 6) : "User") + "..."}
              </span>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-xs text-gray-400 mt-2">
              Posted on {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        )
      )}
    </div>

    {product.reviews.length > 4 && (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowAllReviews((prev) => !prev)}
          className="text-black-300 cursor-pointer font-medium hover:underline"
        >
          {showAllReviews ? "Show Less" : "Show More"}
        </button>
      </div>
    )}
  </div>
)}

      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
