import React from "react";

const Hero = () => {
  return (
    <div className="flex bg-[url('./Hero.svg')] bg-cover bg-center ">
      <div className="left flex flex-col gap-7  py-[50px]">
        <div className=" w-[540px]">
          <h1 className=" text-black-500 text-[64px] font-bold leading-[64px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
        </div>
        <div className="para  w-[570px]">
          <p className=" text-black-500 text-[16px] font-normal leading-[22px]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
        </div>
        <div className="button  ">
          <button className="py-4 px-[54px] text-white rounded-[64px] bg-black">
            Shop Now
          </button>
        </div>

        <div className="plus flex gap-10">
          <div className="plus1 flex flex-col gap-2">
            <div className="top1">
              <h2 className="font-bold text-black-500 text-[40px]">200+</h2>
            </div>
            <div className="bottom1">
              <p  className="font-normal text-black-300 text-[16px]">International Brands</p>
            </div>
          </div>
          <div className="plus2 plus1 flex flex-col gap-2">
            <div className="top2">
              <h2 className="font-bold text-black-500 text-[40px]">2000+</h2>
            </div>
            <div className="bottom2">
              <p  className="font-normal text-black-300 text-[16px]">High-Quality Products</p>
            </div>
          </div>
          <div className="plus3  flex flex-col gap-2">
            <div className="top2">
              <h2 className="font-bold text-black-500 text-[40px]">20000+</h2>
            </div>
            <div className="bottom3">
              <p  className="font-normal text-black-300 text-[16px]">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
