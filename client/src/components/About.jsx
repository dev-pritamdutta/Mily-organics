import React from "react";
import "animate.css";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.hairoil})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[#000000b7]"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-5xl px-6 md:px-12 text-center text-gray-200">
        <h1 className="text-7xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight animate__animated animate__fadeInDown animate__slow">
          Pure Care, <br /> Naturally Delivered
        </h1>

        <p className="text-xl sm:text-2xl text-gray-200 mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          Discover high-quality, natural personal care products — from
          nourishing oils to refreshing face washes and gentle soaps.
        </p>

        
      </div>
    </div>
  );
};

export default About;
