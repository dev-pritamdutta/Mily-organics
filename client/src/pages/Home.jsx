import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";
import Collection from "../components/Collection";

const Home = () => {
  return (
    <div className="mt-10 min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <MainBanner  />
      <Categories />
      <BestSeller />
      <Collection/>
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
