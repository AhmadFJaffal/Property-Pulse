import React from "react";
import Hero from "@/components/main_elements/Hero";
import InfoBoxes from "@/components/home/InfoBoxes";
import HomeProperties from "@/components/home/HomeProperties";
import FeaturedProperties from "@/components/featured_properties/FeaturedProperties";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
