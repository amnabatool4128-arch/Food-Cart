import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/CartSlice";


const Cart = ({ showCart, setShowCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  let subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  let deliveryFee = 50;
  let taxes = (subtotal * 2) / 100;
  let total = Math.floor(subtotal + deliveryFee + taxes);

  return (
    <div
      className={`w-full max-w-[440px] h-[100vh] top-0 right-0 bg-white shadow-xl flex flex-col fixed ${
        showCart ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      {/* Header */}
      <header className="w-full h-[80px] flex items-center justify-between px-10 bg-green-400 border-b">
        <span className="text-white text-2xl font-bold">Your Cart</span>

        <RxCross2
          onClick={() => setShowCart(false)}
          className="w-8 h-8 text-green-400 cursor-pointer bg-white hover:text-green-600 rounded-full shadow-xl"
        />
      </header>

      <div className="overflow-y-auto flex-1">
        {cart.length > 0 ? (
          <>
            {/* Cart Items */}
            {cart.map((item, index) => (
              <div
                key={index}
                className="w-full h-[120px] shadow-lg p-2 flex justify-between"
              >
                <div className="w-[60%] h-full flex gap-5">
                  {/* Image */}
                  <div className="w-[60%] h-full overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="w-[40%] h-full flex flex-col gap-3">
                    <div className="text-lg font-semibold text-gray-600">
                      {item.name}
                    </div>

                    {/* Quantity */}
                    <div className="w-[110px] h-[50px] bg-green-400 flex rounded-lg overflow-hidden shadow-lg border-2 hover:border-green-400">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="w-[30%] bg-white hover:bg-gray-200 text-2xl font-semibold flex items-center justify-center"
                      >
                        -
                      </button>

                      <span className="w-[40%] flex justify-center items-center text-white font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="w-[30%] bg-white hover:bg-gray-200 font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price & Delete */}
                <div className="flex flex-col items-end gap-6">
                  <span className="text-xl text-green-400 font-semibold">
                    Rs {item.price * item.qty}/-
                  </span>

                  <FaRegTrashAlt
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-green-400 hover:text-red-600 cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* Subtotal Section */}
            <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 px-5 py-3">
              <div className="w-full flex justify-between">
                <span className="text-xl text-gray-600 font-semibold">
                  SubTotal
                </span>
                <span className="text-md text-green-400 font-semibold">
                  Rs {subtotal} /-
                </span>
              </div>

              <div className="w-full flex justify-between">
                <span className="text-xl text-gray-600 font-semibold">
                  Delivery Fee
                </span>
                <span className="text-md text-green-400 font-semibold">
                  Rs {deliveryFee} /-
                </span>
              </div>

              <div className="w-full flex justify-between">
                <span className="text-xl text-gray-600 font-semibold">
                  Taxes
                </span>
                <span className="text-md text-green-400 font-semibold">
                  Rs {taxes} /-
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="w-full flex justify-between mt-4 p-10">
              <span className="text-2xl text-gray-600 font-semibold">
                Total
              </span>
              <span className="text-2xl text-green-400 font-semibold">
                Rs {total} /-
              </span>
            </div>

            {/* Button */}
           <div className="w-full p-5">
              <button
  className="bg-green-400 text-white text-xl font-semibold w-full p-3 rounded-lg hover:bg-green-500 shadow-lg transition-all"
>
  Place Order
</button>
</div>
            
          </>
        ) : (
          <p className="text-2xl text-center font-semibold text-green-400 mt-10">
            Cart is Empty
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
