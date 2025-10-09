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

function Home() {
  const featuredProperties = [
    {
      id: 1,
      title: "Sunset Villa",
      location: "Malibu, CA",
      price: "$3,250,000",
      beds: 4,
      baths: 3,
      area: "3,400 sqft",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Modern Townhome",
      location: "Brooklyn, NY",
      price: "$1,125,000",
      beds: 3,
      baths: 2,
      area: "1,800 sqft",
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Lakeside Retreat",
      location: "Lake Tahoe, NV",
      price: "$2,450,000",
      beds: 5,
      baths: 4,
      area: "4,500 sqft",
      img: "https://images.unsplash.com/photo-1505692794400-0e3b6d8a9a5b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Downtown Penthouse",
      location: "San Francisco, CA",
      price: "$4,900,000",
      beds: 2,
      baths: 2,
      area: "2,100 sqft",
      img: "https://images.unsplash.com/photo-1542317854-6e4d3b7cbd7d?auto=format&fit=crop&w=1200&q=80",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 antialiased">
      <Hero />
      <Values />
      <SearchSection />
      <VisionMission />
      <Features />
      <CoreValuesSlide />
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
