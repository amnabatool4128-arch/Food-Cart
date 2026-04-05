import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Categories from "../Category";
import Card from "../Components/Card";
import { food_items } from "../assets/food";
import { dataContext } from "../Context/UserContext";
import Cart from "../Components/Cart";
import { PiSmileySadBold } from "react-icons/pi";

const Home = () => {
  let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext);

  function filter(category) {
    if (category === "All") {
      setCate(food_items);
    } else {
      // ✅ FIX: case-insensitive match
      let newList = food_items.filter(
        (item) => item.food_category.toLowerCase() === category.toLowerCase(),
      );
      setCate(newList);
    }
  }

  return (
    <div className="bg-green-100 w-full min-h-screen">
      <Navbar />

      {/* Categories */}
      {!input && (
        <div className="flex flex-wrap items-center justify-center gap-5 w-full mt-6">
          {Categories.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-[140px] h-[140px] bg-white gap-5 text-lg text-gray-600 font-semibold rounded-lg shadow-xl hover:bg-green-300 hover:text-white cursor-pointer transition-all duration-300"
              onClick={() => filter(item.name)}
            >
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      )}

      {/* Cards */}
      {cate && cate.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center w-full gap-5 px-5 mt-10 mb-10">
          {cate.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              name={item.food_name}
              image={item.food_image}
              price={item.price}
              type={item.food_type}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-center mt-10 text-2xl font-semibold text-green-500">
          No Dish Found
          <PiSmileySadBold />
        </div>
      )}

      {/* Cart */}
      <Cart showCart={showCart} setShowCart={setShowCart} />
    </div>
  );
};

export default Home;
