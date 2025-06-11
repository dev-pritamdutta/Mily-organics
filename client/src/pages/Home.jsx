import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";
import Collection from "../components/Collection";

const Home = () => {
  return (
    <div className="min-h-screen container mx-auto bg-[#f1eee8]">
      <MainBanner/> {/* Full-width */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Categories />
        <BestSeller />
        <Collection />
        <BottomBanner />
        <NewsLetter />
      </div>
    </div>
  );
};

export default Home;
