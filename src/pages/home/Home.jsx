import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "./components/Hero";
import { Features, AnotherFeatures } from "./components/Features";
import Testimonial from "./components/Testimonial";
import SearchSection from "./components/SearchSection";
import PropertyListing from "./components/PropertyListing";
import NewsCard from "./components/NewsCard";
import PopularSearches from "./components/PopularSearches";
import WhyUs from "./components/WhyUs";
import CoreValuesSlide from "./components/CoreValuesSlide";
import Highlights from "./components/Highlights";
import Values from "./components/Values";
import TeamMembers from "./components/TeamMembers";
import VisionMission from "./components/VisionMission";
import EstateSection from "./components/EstateSection";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 antialiased">
      <Hero />
      <Values />
      <SearchSection />
      <Features />
      <CoreValuesSlide />
      <EstateSection />
      <WhyUs />
      <Highlights />
      <PropertyListing />
      <Testimonial />
      <NewsCard />
      <PopularSearches />
    </div>
  );
}

export default Home;
