import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SingleProduct from '../SingleProduct/SingleProduct';
import renderStars from "../Utils/Renderstars";

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const productsPerPage = 4;
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);


  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-[700] md:text-[48px] text-[24px] text-black-500 text-center Intergal-cf">Top Selling</h2>
      </div>
      <div className="flex flex-col gap-6 ">
        <div className="  flex gap-4 justify-center md:justify-between  flex-wrap">
          {paginatedProducts.map((product,index) => (
            <SingleProduct key={index} product={product}  renderStars={renderStars} />
          ))}
        </div>

        <div className="flex justify-center">
          {startIndex + productsPerPage < products.length && (
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-2 bg-white border-2 border-black cursor-pointer  rounded-[50px] text-black  hover:scale-110 transform duration-300 "
            >
              View All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
