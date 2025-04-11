import React, { useState } from "react";

const Cartcomp = ({ product, handleRemove }) => {

  const [count,setcount]=useState(1)
  return (
    <div className="flex items-center gap-4 border-b py-4 w-full">
      {/* Image */}
      <div className="flex justify-center items-center" style={{ width: "clamp(80px, 20vw, 124px)" }}>
        <img
          src={product.productId.images[0]}
          alt={product.productId.title}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 justify-between items-center">
        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h2
              className="font-bold text-black"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
            >
              {product.productId.title}
            </h2>
            <p
              className="text-gray-500"
              style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
            >
              {product.productId.category}
            </p>
            <p
              className="text-gray-500"
              style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
            >
              {product.productId.brand}
            </p>
          </div>
          <h2
            className="font-bold text-black mt-2"
            style={{ fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)" }}
          >
            ${product.productId.price}
          </h2>
        </div>

        {/* Delete + Qty */}
        <div
          className="flex flex-col items-end justify-between"
          style={{ gap: "clamp(0.5rem, 1.5vw, 1rem)", width: "clamp(140px, 25vw, 255px)", height: "clamp(90px, 20vw, 125px)" }}
        >
          <button onClick={() => handleRemove(product.productId._id)}>
            <img
              src="./Delete.png"
              alt="Delete"
              style={{ width: "clamp(18px, 3vw, 24px)", height: "clamp(18px, 3vw, 24px)" }}
              className="hover:scale-110 transform duration-300 cursor-pointer"
            />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-3xl bg-gray-300 text-white"
            style={{
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              padding: "clamp(0.3rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)",
            }}
          >
            <img src="./Min.svg" onClick={() => setcount(count-1)} className="cursor-pointer" alt="Plus" style={{ width: "clamp(14px, 2vw, 16px)" }} />
            {count}
            <img src="/Add.png" onClick={()=>setcount(count+1)} className="cursor-pointer" alt="Minus" style={{ width: "clamp(14px, 2vw, 16px)" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartcomp;
