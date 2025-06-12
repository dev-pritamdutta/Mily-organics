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
        className="bg-[#f9f7f2] w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            className="w-full h-64 object-cover group-hover:scale-105 transition duration-500 rounded-t-md"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Info */}
        <div className="p-4 border-t">
          <p className="text-gray-800 font-semibold text-base line-clamp-2 min-h-[30px] mb-1">
            {product.name}
          </p>
          <p className="text-gray-500 text-sm mb-3 ">
            {product.description.length > 90
              ? product.description.slice(0, 90) + "..."
              : product.description}
          </p>

          <div
            className="flex items-center justify-between mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-xl font-semibold text-[#d3762f]">
                {currency}
                {product.offerPrice}
                <span className="text-sm text-gray-400 line-through ml-2 font-normal">
                  {currency}
                  {product.price}
                </span>
              </p>
            </div>

            <div className="text-[var(--color-primary)]">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 px-4 py-1.5 rounded-full cursor-pointer hover:bg-[var(--color-primary)]/20 transition-colors text-sm"
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
