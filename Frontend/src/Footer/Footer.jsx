import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-10 py-10 bg-gray-200">
      <div className="flex  justify-between px-[20px] md:px-[100px] gap-5 flex-wrap">
        <div className="flex flex-col gap-6 justify-center items-center"> 
          <div>
          <h2 className="font-bold text-black text-[clamp(1.5rem,4vw,2rem)] mr-4">
          SHOP.CO
        </h2>
          </div>
          <div className=" md:w-[248px]">
            <p>
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
          </div>
          <div>
            <img src="./Social.png" alt="logo" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[16px] font-[500]">
            <p>Company</p>
          </div>
          <div className="text-[16px] font-[200] flex flex-col gap-3">
            <p className="cursor-pointer">About</p>
            <p className="cursor-pointer">Features</p>
            <p className="cursor-pointer">Works </p>
            <p className="cursor-pointer">Career </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[16px] font-[500]">
            <p>HELP MENU</p>
          </div>
          <div className="text-[16px] font-[200] flex flex-col gap-3">
            <p>Customer Support</p>
            <p>Delivery Details</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[16px] font-[500]">
            <p>Resources</p>
          </div>
          <div className="text-[16px] font-[200] flex flex-col gap-3">
            <p>Free eBooks</p>
            <p>Development Tutorial</p>
            <p>How to - Blog</p>
            <p>Youtube Playlist</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[16px] font-[500]">
            <p>FAQ</p>
          </div>
          <div className="text-[16px] font-[200] flex flex-col gap-3">
            <p>Account</p>
            <p>Manage Deliveries</p>
            <p>Orders</p>
            <p>Payments</p>
          </div>
        </div>
      </div>
      <hr className="mx-[20px] md:mx-[100px]"/>
      <div className="flex md:justify-between px-[20px] md:px-[100px] flex-wrap gap-5 items-center justify-center">
        <div>
            <p className="text-grey">© 2000-2021, All rights reserved</p>
        </div>

        <div className="flex gap-2 ">
            <div>
              <img src="./Visa.png" alt="logo"  className=" scale-3d hover:scale-110 transform duration-300"/> 
            </div>
            <div>
              <img src="./Visa.png" alt="logo"  className=" scale-3d hover:scale-110 transform duration-300"/> 
            </div>
            <div>
              <img src="./Visa.png" alt="logo" className=" scale-3d hover:scale-110 transform duration-300" /> 
            </div>
            <div>
              <img src="./Visa.png" alt="logo" className=" scale-3d hover:scale-110 transform duration-300" /> 
            </div>
        </div>


      </div>
    </div>
  );
};

export default Footer;
