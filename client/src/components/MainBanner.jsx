import React from "react";
import { assets } from "../assets/assets";
import soap from "../assets/soap3.jpg";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <main className="flex h-screen flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 ">
      {/* Left Text Section */}
      <div className="max-w-lg max-md:mt-7 animate-fade-in-up ">
        <h1 className="font-bold text-5xl md:text-6xl text-black leading-tight">
          Glow Naturally with{" "}
          <span className="text-[var(--color-primary)]">
            Skincare You Can Trust
          </span>
        </h1>
        <p className="mt-6 text-gray-500 text-sm sm:text-base">
          Discover the power of nature in every drop — from gentle soaps to
          refreshing facewashes and nourishing hair oils.
        </p>

        {/* Buttons */}
        <div className="flex items-center mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>

      {/* Right Image Section */}
      <img
        className="w-96 md:w-2/5 rounded-2xl scale-x-[-1] max-md:mt-10 animate-fade-in"
        src={soap}
        alt="natural soap"
      />
    </main>
  );
};

export default MainBanner;

/*
<div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full  md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-centre md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
          Freshness You Can Trust,Savings You will Love!
        </h1>

        <div className="flex items-centre mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-centre gap-2 px-7 md:px-9 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to={"/products"}
            className="group hidden md:flex items-centre gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>

*/
