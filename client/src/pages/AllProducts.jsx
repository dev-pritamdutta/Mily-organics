import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  useEffect(() => {
    let temp = [...products];

    // Apply search filter
    if (searchQuery.length > 0) {
      temp = temp.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "alphabet":
        temp.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "lowToHigh":
        temp.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "bestseller":
        temp = temp.filter((p) => p.productType === "bestseller");
        break;
      default:
        break;
    }

    setFilteredProducts(temp);
  }, [products, searchQuery, sortOption]);

  return (
    <div className="mt-16 min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-[var(--color-primary)] rounded-full"></div>
      </div>
      <div className="my-4">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mt-4 w-36  text-left py-1  border bg-gray-100 border-gray-300 rounded text-sm"
        >
          <option value="default">default</option>
          <option value="alphabet">Alphabetically (A-Z)</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="bestseller">Best Sellers Only</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-4 mt-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
