import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SingleProduct from "../SingleProduct/SingleProduct";
import renderStars from "../Utils/Renderstars";
import { CartContext } from "../Context/CartContet";


const NewArrival = () => {

  const [,,,,,,,latest] = useContext(CartContext)
  const productsHere = 4;
  const navigate = useNavigate();
  const [page,setpage] = useState(1)

 

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

         
          <div className="flex justify-center">
            {startIndex + productsHere < latest.length && (
              <button
                onClick={() => navigate("/Product")}
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
