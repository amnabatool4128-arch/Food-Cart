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
      className={`w-full sm:max-w-[400px] md:max-w-[500px] h-screen top-0 right-0 bg-white shadow-xl flex flex-col fixed ${
        showCart ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      {/* Header */}
      <header className="w-full h-[70px] flex items-center justify-between px-4 sm:px-6 md:px-10 bg-green-400 border-b">
        <span className="text-white text-xl sm:text-2xl font-bold">
          Your Cart
        </span>

        <RxCross2
          onClick={() => setShowCart(false)}
          className="w-7 h-7 sm:w-8 sm:h-8 text-green-400 cursor-pointer bg-white hover:text-green-600 rounded-full shadow-xl"
        />
      </header>

      <div className="overflow-y-auto flex-1 px-2 sm:px-4">
        {cart.length > 0 ? (
          <>
            {/* Cart Items */}
            {cart.map((item, index) => (
              <div
                key={index}
                className="w-full min-h-[120px] shadow-lg p-2 flex flex-col sm:flex-row gap-3 justify-between rounded-lg"
              >
                {/* Left */}
                <div className="w-full sm:w-[60%] flex gap-3">
                  {/* Image */}
                  <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[100px] overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="text-md sm:text-lg font-semibold text-gray-600">
                      {item.name}
                    </div>

                    {/* Quantity */}
                    <div className="w-[100px] h-[40px] sm:w-[110px] sm:h-[45px] bg-green-400 flex rounded-lg overflow-hidden shadow-lg border-2 hover:border-green-400">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="w-[30%] bg-white hover:bg-gray-200 text-lg font-semibold flex items-center justify-center"
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

                {/* Price + Delete */}
                <div className="flex sm:flex-col justify-between items-end gap-3">
                  <span className="text-lg sm:text-xl text-green-400 font-semibold">
                    Rs {item.price * item.qty}/-
                  </span>

                  <FaRegTrashAlt
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-green-400 hover:text-red-600 cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* Subtotal */}
            <div className="w-full border-t-2 border-b-2 border-gray-300 mt-5 flex flex-col gap-2 px-3 sm:px-5 py-3">
              <div className="flex justify-between">
                <span className="text-lg sm:text-xl text-gray-600 font-semibold">
                  SubTotal
                </span>
                <span className="text-green-400 font-semibold">
                  Rs {subtotal} /-
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-lg sm:text-xl text-gray-600 font-semibold">
                  Delivery Fee
                </span>
                <span className="text-green-400 font-semibold">
                  Rs {deliveryFee} /-
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-lg sm:text-xl text-gray-600 font-semibold">
                  Taxes
                </span>
                <span className="text-green-400 font-semibold">
                  Rs {taxes} /-
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="w-full flex justify-between mt-3 px-4 sm:px-6">
              <span className="text-xl sm:text-2xl text-gray-600 font-semibold">
                Total
              </span>
              <span className="text-xl sm:text-2xl text-green-400 font-semibold">
                Rs {total} /-
              </span>
            </div>

            {/* Button */}
            <div className="w-full p-4 sm:p-5">
              <button className="bg-green-400 text-white text-lg sm:text-xl font-semibold w-full p-3 rounded-lg hover:bg-green-500 shadow-lg transition-all">
                Place Order
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl sm:text-2xl text-center font-semibold text-green-400 mt-10">
            Cart is Empty
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
