import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const slides = [
    {
      id: 1,
      img: "https://res.cloudinary.com/dtzesgkf0/image/upload/WhatsApp_Image_2025-12-02_at_2.26.49_PM_txkces.jpg",
      title: "Find Your Dream Property with Confidence",
      subtitle:
        "Explore premium properties built with integrity, quality, and timeless value.",
      cta: "Browse Listings",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dtzesgkf0/image/upload/francesca-tosolini-tHkJAMcO3QE-unsplash_thu6kl.jpg",
      title: "Secure the Future You Deserve",
      subtitle:
        "From prime locations to unbeatable returns, discover properties worth investing in.",
      cta: "About us",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/dtzesgkf0/image/upload/sean-pollock-PhYq704ffdA-unsplash_rjiihh.jpg",
      title: "Building More Than Houses, Building Communities",
      subtitle:
        "Join a trusted real estate family that puts people first and creates lasting value.",
      cta: "Get Started Today",
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/dtzesgkf0/image/upload/ferdinand-asakome-REptTTduJxY-unsplash_bdliu9.jpg",
      title: "Trusted Real Estate Experts",
      subtitle:
        "Over a decade of excellence in delivering quality real estate solutions.",
      cta: "Contact Us",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const navigate = useNavigate();

  return (
    <section className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current
              ? "opacity-100 z-20"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background */}
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover brightness-70"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-3xl md:text-6xl font-bold drop-shadow-lg leading-tight">
              {slide.title}
            </h1>
            <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md">
              {slide.subtitle}
            </p>
            <button
              onClick={() =>
                slide.cta === "Contact Us"
                  ? navigate("/contact-us")
                  : slide.cta === "Get Started Today"
                  ? navigate("/signup")
                  : slide.cta === "Browse Listings"
                  ? navigate("/property-listing")
                  : navigate("/about-us")
              }
              className="mt-6 px-6 py-3 border-2 border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500 hover:text-white transition rounded-lg font-semibold shadow-lg"
            >
              {slide.cta}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
