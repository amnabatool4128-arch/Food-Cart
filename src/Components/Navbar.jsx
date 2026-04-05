import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { dataContext } from "../Context/UserContext";
import { SiFoodpanda } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { TbShoppingBag } from "react-icons/tb";
import { food_items } from "../assets/food";

const Navbar = () => {
  let{input, setInput, setCate, setShowCart} = useContext(dataContext);
  const [active, setActive] = useState(false);
  
  const iconRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconRef.current && !iconRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  useEffect(() => {
    let newlist = food_items.filter((item) =>
      item.food_name.includes(input) || item.food_name.toLowerCase().includes(input.toLowerCase()),
    );

    setCate(newlist);
  }, [input, setCate]);
  const items = useSelector((state) => state.cart);
  
  
  return (
    <section className="w-full h-[100px] flex items-center justify-between px-5 md:px-12 pt-8
    ">
      {/* Logo */}
      <div className="flex items-center justify-center w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white rounded-xl shadow-xl cursor-pointer ">
        <SiFoodpanda className="w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]  text-green-500" />
      </div>
      {/* Search Box */}
      <form className="w-[45%] h-[50px] md:w-[70%] h-[50px] bg-white rounded-xl px-4 
      lg:px-5 flex items-center shadow-xl gap-3" onSubmit={(e) => e.preventDefault()}  >
        <input
          type="text"
          autoComplete="off"
          placeholder="Search for food..."
          className="w-full outline-none bg-transparent text-sm md:text-[20px]"
          onChange={(e)=>setInput(e.target.value)} value={input}
        />
        <div
          ref={iconRef}
          onClick={() => setActive(true)}
          className={`flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 
  ${active ? "w-10 h-10 bg-green-500" : "w-6 h-6 lg:w-8 lg:h-8 bg-green-400"}`}
        >
          <IoIosSearch className="text-white text-xl" />
        </div>
      </form>
      <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white flex items-center
       justify-center rounded-xl shadow-xl relative"onClick={()=>{
        setShowCart(true)
       }}
      
       >
        <span className="absolute top-0 right-2 text-xs font-bold text-white rounded-full w-4 h-4 flex items-center justify-center bg-green-500 ">
          {items.length}
        </span>
        <TbShoppingBag className="w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] text-green-500 cursor-pointer" />
      </div>
    </section>
  );
};

export default Navbar;
