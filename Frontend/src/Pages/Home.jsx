import React from 'react'
import Navbar from '../Navbar/Navbar'
import Login from './Login'
import Hero from "../Hero/Hero"
import Scroll from '../Scroll/Scroll'
import Browse from '../Browse/Browse'
import TopSelling from '../TopSelling/TopSelling'
import NewArrival from '../NewArrival/NewArrival'
import Happycustomer from '../Happy Customer/Happycustomer'
import StayUpdate from '../Stayupdated/StayUpdate'
import Footer from '../Footer/Footer'

const Home = () => {

  
  return (
    <div>

     <div className=' bg-[#F2F0F1]'>
     <div className=' md:px-[100px]'>
        <Hero/>

        </div>
     </div>
     <div className="scroll">
            <Scroll/>
        </div>

        <div className='px-[20px]  md:px-[100px] mt-[50px]'>
       <TopSelling/>
       </div>
       <div className='px-[20px]  md:px-[100px] mt-[50px]'>
          <NewArrival/>
       </div>
        <div className='px-[20px]  md:px-[100px] mt-[50px]'>
            <Browse/>
        </div>
        <div className='mt-[50px]  '>
        <Happycustomer/>
        </div>
        <div className=' mt-[50px]'>
            <div className='px-[20px]  md:px-[100px]'>
            <StayUpdate/>
            </div>
          <div className='mt-[50px]'>
              
      <Footer/>
          </div>
        </div>
 
      </div>
    
  )
}

export default Home
