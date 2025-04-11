import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SingleProduct from "../SingleProduct/SingleProduct";
import renderStars from "../Utils/Renderstars";


const NewArrival = () => {
  const [latest, setLatest] = useState([]); // Fix: Initialize as an array
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1); // Fix: Define page state
  const productsHere = 4;
  const navigate = useNavigate();

  const getLatestProducts = async () => {
    setLoad(true);
    try {
      const res = await axios.get("http://localhost:5000/latestProducts");
      setLatest(res.data); // Fix: Use setLatest instead of getlatest
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    getLatestProducts();
  }, []);

  const startIndex = (page - 1) * productsHere;
  const paginatedProducts = latest.slice(startIndex, startIndex + productsHere);



  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="font-[700] md:text-[48px] text-[24px] text-black-500 text-center Intergal-cf">New Arrivals</h2>
        </div>
        <div className="flex flex-col gap-6">
          <div className=" flex gap-4 justify-center md:justify-between flex-wrap">
            {paginatedProducts.map((product, index) => (
              <SingleProduct key={index} product={product} renderStars={renderStars}/>
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center">
            {startIndex + productsHere < latest.length && (
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-2 bg-white border-2 border-black cursor-pointer text-black rounded-[50px] hover:scale-110 transform duration-300"
              >
                View All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
