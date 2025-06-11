import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();
  return (
    <div className="py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-medium text-center my-10 text-[#2f4738]">
        Shop By Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[4/3]"
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            {/* Image Container */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.text}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Category Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white mb-2">
                {category.text}
              </h3>
              <p className="text-sm text-gray-200">Shop Now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
