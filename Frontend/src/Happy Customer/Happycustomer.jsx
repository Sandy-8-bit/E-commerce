import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Happycustomer = () => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]); // Changed data to products to store product list

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 420; // Adjust based on card width + gap
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getComments"); // Endpoint to fetch products
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col w-full px-[20px]  md:px-[100px] gap-5 overflow-hidden">
      <div className="flex w-full justify-between">
        <h2 className="text-black font-[700] Intergal-cf md:text-[48px] text-[24px]">
          Our Happy Customers
        </h2>
        <div className="flex gap-4 items-center">
          <div
            className="hover:scale-130 transition-all duration-300 cursor-pointer "
            onClick={() => handleScroll("left")}
          >
            <img src="/Arrow-left.png" alt="left arrow" />
          </div>
          <div
            className="hover:scale-130 transition-all duration-300 cursor-pointer"
            onClick={() => handleScroll("right")}
          >
            <img src="/Arrow-right.png" alt="right arrow" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden ">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-scroll no-scrollbar scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="py-[28px] px-[32px] min-w-[350px] max-w-[450px]  h-[240px] rounded-[20px] border border-black-500 flex flex-col gap-4 "
            >
              <img src="./fivestar.png" alt="star" className="h-10 w-60" />
              <h3 className="text-black-500 text-[20px] font-[500]">{product.title}</h3>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <p key={review._id} className="text-[16px] overflow-x-scroll no-scrollbar text-black font-[400]">
                    {review.comment}
                  </p>
                ))
              ) : (
                <p className="text-[16px] text-black font-[400]">
                  No reviews yet.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Happycustomer;
