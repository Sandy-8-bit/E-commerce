import React from "react";
import { Link } from "react-router-dom";

const Browse = () => {
  return (
    <div className="bg-[#f0f0f0] p-6 rounded-[40px] flex flex-col gap-[20px] font-[Integral CF]">
      <div className="w-full flex justify-center items-center">
      <h2
  className="text-black font-[700] Intergal-cf"
  style={{ fontSize: 'clamp(20px, 2.5vw, 48px)' }}
>
          BROWSE BY DRESS STYLE
        </h2>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex gap-10 flex-wrap">
          <div className="bg-[url('./formals.png')] bg-cover bg-no-repeat flex-2 h-[289px] rounded-[20px] transition-transform duration-300 hover:scale-105 ">
            <div className="inside p-[40px] ">
              <p className="text-[36px] font-[500]">Casuals</p>
            </div>
          </div>
          <div className="bg-[url('./casuals.png')]  bg-cover bg-no-repeat h-[289px]  flex-1 rounded-[20px] transition-transform duration-300 hover:scale-105 ">
            <div className="inside p-[40px] ">
              <p className="text-[36px] font-[500]">Formal</p>
            </div>
          </div>
        </div>
        <div className="flex gap-10 flex-wrap">
          <div className="bg-[url('./Gym.png')]  bg-cover bg-no-repeat h-[289px] flex-1 rounded-[20px] transition-transform duration-300 hover:scale-105">
            <div className="inside p-[40px]">
              <p className="text-[36px] font-[500]">Gym</p>
            </div>
          </div>

          <div className="bg-[url('/Party.svg')] bg-cover bg-no-repeat h-[289px] rounded-[20px] flex-2 transition-transform duration-300 hover:scale-105">
            <div className="inside p-[40px]">
              <p className="text-[36px] font-[500]">Party</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
