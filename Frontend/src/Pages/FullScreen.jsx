import React from 'react'
import Navbar from '../Navbar/Navbar'

const FullScreen = () => {
  return (
  <div>
      <div className='px-[20px]  md:px-[100px]'>
      <Navbar/>
    </div>
    <hr></hr>
    <div className='flex gap-3'>
      <div className='flex flex-col justify-between'>
        <div className='flex h-[150px] w-[160px] bg-black'>

        </div>
        <div className='flex h-[150px] w-[160px] bg-blue-500'>

        </div>
        <div className='flex h-[150px] w-[160px] bg-black'>

        </div>
      </div>
      <div className='w-[444px] h-[530px] bg-black'>

      </div>
      <div>
        <div> <h2>One Life Graphic T-shirt</h2></div>
        <div><p>Ratings</p></div>
        <div>
          <div>price</div>
          <div>oldprice</div>
          <div>-percentage</div>
        </div>
        <div><p>This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p></div>
        <div className='w-full h-[1px] bg-black'>line</div>
        <div>
          <div>select Colors</div>
          <div></div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
  )
}

export default FullScreen
