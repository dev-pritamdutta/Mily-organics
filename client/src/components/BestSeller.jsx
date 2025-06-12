import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-3 md:grid-cols-3 gap-5 md:grid-6 lg:grid-cols-4  mt-6">
        {products
          .filter(
            (product) => product.inStock && product.productType === "bestseller"
          )
          .slice(0, 8)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
