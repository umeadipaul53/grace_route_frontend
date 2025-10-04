import React, { useState, useEffect } from "react";

const Hero = () => {
  const slides = [
    {
      id: 1,
      img: "/jason-dent-w3eFhqXjkZE-unsplash.jpg",
      title: "Find Your Dream Property with Confidence",
      subtitle:
        "Explore premium properties built with integrity, quality, and timeless value.",
      cta: "Browse Listings",
    },
    {
      id: 2,
      img: "/francesca-tosolini-6japTIjUQoI-unsplash.jpg",
      title: "Secure the Future You Deserve",
      subtitle:
        "From prime locations to unbeatable returns, discover properties worth investing in.",
      cta: "Book an Inspection",
    },
    {
      id: 3,
      img: "/sean-pollock-PhYq704ffdA-unsplash.jpg",
      title: "Building More Than Houses, Building Communities",
      subtitle:
        "Join a trusted real estate family that puts people first and creates lasting value.",
      cta: "Get Started Today",
    },
    {
      id: 4,
      img: "/ferdinand-asakome-REptTTduJxY-unsplash.jpg",
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
            <button className="mt-6 px-6 py-3 border-2 border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500 hover:text-white transition rounded-lg font-semibold shadow-lg">
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Indicators
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-amber-500 scale-110" : "bg-white/60"
            }`}
          />
        ))}
      </div> */}

      {/* Prev/Next Controls
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-40"
      >
        ‹
      </button>
      <button
        onClick={() =>
          setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-40"
      >
        ›
      </button> */}
    </section>
  );
};

export default Hero;
