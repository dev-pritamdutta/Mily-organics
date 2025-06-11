import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const PRODUCTS_PER_PAGE = 8;

const Collection = () => {
  const { products } = useAppContext();
  const collectionProducts = products.filter((product) => product.inStock);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(collectionProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = collectionProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="mt-16">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl md:text-3xl font-medium text-[#2f4738]">
          Our Collection
        </h2>
        <div className="w-20 h-0.5 bg-[#2f4738] rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-full ${
                page === i + 1
                  ? "bg-[#2f4738] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } transition`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Collection;
