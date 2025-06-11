import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="bg-white w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            className="w-full h-64 object-fill group-hover:scale-105 transition duration-500"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="p-4 border-t">
          <p className="text-gray-500 text-sm mb-1">{product.category}</p>
          <p className="text-gray-800 font-medium text-base line-clamp-2 min-h-[50px]">
            {product.name}
          </p>


          <div
            className="flex items-center justify-between mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-lg font-medium text-[var(--color-primary)]">
                {currency}
                {product.offerPrice}
                <span className="text-sm text-gray-400 line-through ml-2">
                  {currency}
                  {product.price}
                </span>
              </p>
            </div>

            <div className="text-[var(--color-primary)]">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/40 px-4 h-[34px] rounded-full cursor-pointer hover:bg-[var(--color-primary)]/20 transition-colors"
                  onClick={() => addToCart(product._id)}
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart_icon"
                    className="w-4 h-4"
                  />
                  <span>Add</span>
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 h-[34px] bg-[var(--color-primary)]/10 rounded-full select-none px-2">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full hover:text-[var(--color-primary)]"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full hover:text-[var(--color-primary)]"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
