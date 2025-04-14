import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Login from './Login';
import Hero from "../Hero/Hero";
import Scroll from '../Scroll/Scroll';
import Browse from '../Browse/Browse';
import TopSelling from '../TopSelling/TopSelling';
import NewArrival from '../NewArrival/NewArrival';
import Happycustomer from '../Happy Customer/Happycustomer';
import StayUpdate from '../Stayupdated/StayUpdate';
import Footer from '../Footer/Footer';
const Home = () => {
  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  return (
    <div>
      <div className='bg-[#F2F0F1]'>
        <div id='home' className='md:px-[100px]'>
          <Hero />
        </div>
      </div>

      <div className="scroll">
        <Scroll />
      </div>

      <div id="top-selling" className='px-[20px] md:px-[100px] mt-[50px]'>
        <TopSelling />
      </div>

      <div id="new-arrivals" className='px-[20px] md:px-[100px] mt-[50px]'>
        <NewArrival />
      </div>

      <div id="browse" className='px-[20px] md:px-[100px] mt-[50px]'>
        <Browse />
      </div>

      <div id="customers" className='mt-[50px]'>
        <Happycustomer />
      </div>

      <div className='mt-[50px]'>
        <div className='px-[20px] md:px-[100px]'>
          <StayUpdate />
        </div>
        <div className='mt-[50px]'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
