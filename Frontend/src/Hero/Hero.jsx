import React from "react";
import {useNavigate} from "react-router-dom"

const Hero = () => {

  const navigate = useNavigate();
  return (
    <div className="flex justify-center md:bg-[url('./Hero.svg')] items-center bg-cover bg-center px-4 md:px-0">
      <div className="left flex flex-col gap-7 py-[50px]  w-full">
        <div className="w-full md:w-[540px]">
          <h1 className="text-black-500 text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-tight md:leading-[64px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
        </div>
        <div className="para w-full md:w-[570px]">
          <p className="text-black-500 text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[22px]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
        </div>
        <div className="button">
          <button onClick={()=> navigate("/Product")} className="py-3 hover:scale-3d hover:transform-3d hover:duration-300 hover:scale-105 cursor-pointer px-10 sm:py-4 sm:px-[54px] text-white rounded-full bg-black text-sm sm:text-base">
            Shop Now
          </button>
        </div>

        <div className="plus flex flex-wrap  sm:flex-row gap-6 sm:gap-10">
          <div className="plus1 flex flex-col gap-2">
            <div className="top1">
              <h2 className="font-bold text-black-500 text-[32px] sm:text-[40px]">
                200+
              </h2>
            </div>
            <div className="bottom1">
              <p className="font-normal text-black-300 text-[14px] sm:text-[16px]">
                International Brands
              </p>
            </div>
          </div>
          <div className="plus2 flex flex-wrap justify-center items-center flex-col gap-2">
            <div className="top2">
              <h2 className="font-bold text-black-500 text-[32px] sm:text-[40px]">
                2000+
              </h2>
            </div>
            <div className="bottom2">
              <p className="font-normal text-black-300 text-[14px] sm:text-[16px]">
                High-Quality Products
              </p>
            </div>
          </div>
          <div className="plus3 flex flex-col gap-2">
            <div className="top3">
              <h2 className="font-bold text-black-500 text-[32px] sm:text-[40px]">
                20000+
              </h2>
            </div>
            <div className="bottom3">
              <p className="font-normal text-black-300 text-[14px] sm:text-[16px]">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
