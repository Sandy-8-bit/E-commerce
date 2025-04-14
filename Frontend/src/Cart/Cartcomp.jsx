import React from "react";


const Cartcomp = ({ product, handleRemove, handleQuantityChange }) => {
  const { _id, title, images, category, brand, price } = product.productId;

  return (
    <div className="flex items-center gap-4 border-b py-4 w-full">

      
      <div className="flex justify-center items-center" style={{ width: "clamp(80px, 20vw, 124px)" }}>
        <img
          src={images[0]}
          alt={title}
          className="w-full h-auto object-contain"
        />
      </div>

      
      <div className="flex flex-1 justify-between items-center">
       
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-black" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
              {title}
            </h2>
            <p className="text-gray-500" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
              {category}
            </p>
            <p className="text-gray-500" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
              {brand}
            </p>
          </div>
          <h2 className="font-bold text-black mt-2" style={{ fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)" }}>
            ₹{price}
          </h2>
        </div>

        <div
          className="flex flex-col items-end justify-between"
          style={{
            gap: "clamp(0.5rem, 1.5vw, 1rem)",
            width: "clamp(140px, 25vw, 255px)",
            height: "clamp(90px, 20vw, 125px)"
          }}
        >
          <button onClick={() => handleRemove(_id)}>
            <img
              src="./Delete.png"
              alt="Delete"
              style={{ width: "clamp(18px, 3vw, 24px)", height: "clamp(18px, 3vw, 24px)" }}
              className="hover:scale-110 transform duration-300 cursor-pointer"
            />
          </button>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-3xl bg-gray-300 text-white"
            style={{
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              padding: "clamp(0.3rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)",
            }}
          >
            <img
              src="./Min.svg"
              onClick={() => handleQuantityChange(_id, product.quantity - 1)}
              className="cursor-pointer"
              alt="Minus"
              style={{ width: "clamp(14px, 2vw, 16px)" }}
            />
            {product.quantity}
            <img
              src="/Add.png"
              onClick={() => handleQuantityChange(_id, product.quantity + 1)}
              className="cursor-pointer"
              alt="Plus"
              style={{ width: "clamp(14px, 2vw, 16px)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartcomp;
