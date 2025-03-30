import React from 'react'
import Navbar from '../Navbar/Navbar'
import Login from './Login'
import Hero from "../Hero/Hero"
import Scroll from '../Scroll/Scroll'

const Home = () => {
  return (
    <div>
      <div className='px-[100px]'>
      <Navbar/>
      </div>
     <div className=' bg-[#F2F0F1]'>
     <div className='px-[100px]'>
        <Hero/>

        </div>
        <div className="scroll">
            <Scroll/>
        </div>
     </div>
    
      </div>
    
  )
}

export default Home
