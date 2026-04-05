import React from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import {  addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Card = ({ id, name, image, price, type }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-[300px] h-[400px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-2 hover:border-green-300 cursor-pointer">
      {/* Image */}
      <div className="w-full h-[60%] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      {/* Name */}
      <div className="text-2xl font-semibold">{name}</div>
      {/* Price & Type */}
      <div className="w-full flex justify-between items-center">
        <div className="text-lg font-semibold text-green-500">Rs {price}/-</div>

        <div className="flex items-center gap-2 text-green-500 text-lg">
          {type === "veg" ? <LuLeafyGreen /> : <GiChickenOven />}
          <span className="font-semibold">{type}</span>
        </div>
      </div>
      {/* Add To Cart */}
      
      <button
        className="bg-green-400 text-white w-full p-3 rounded-lg hover:bg-green-500 transition-all"
        onClick={() => {
          dispatch(
            addToCart({
              id,
              name,
              price,
              type,
              image,
              qty: 1,
            }),
          );
          // ✅ Toastify notification
          toast.success(`${name} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bg: "white",
          });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
