import React from 'react';
import './Scroll.css'; // We’ll define the animation here

const Scroll = () => {
  return (
    <div className="overflow-hidden bg-black  h-[70px] md:h-[110px] flex items-center">
      <div className="scroll-track flex gap-30 animate-scroll w-max px-10">
        {/* Duplicate logos to ensure smooth looping */}
        {Array(30).fill([
          './Zara.png',
          './verase.png',
          './clavin.png',
          './parada.png',
          './gucci.png'
        ]).flat().map((src, index) => (
          <div key={index} className="image min-w-[100px]">
            <img src={src} alt="brand" className="h-[70px] w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scroll;
