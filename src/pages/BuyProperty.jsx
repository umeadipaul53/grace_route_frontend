// BuyerGuide.jsx
import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";

/**
 * Pure React component styled with Tailwind.
 * - Add this file to src/components/BuyerGuide.jsx
 * - Ensure Tailwind is configured in your project.
 */

const SLIDES = [
  {
    id: 1,
    title: "Browse and Select Your Dream Property",
    text: "Explore our wide range of verified properties across different locations. Whether you’re looking for land, an apartment, or a luxury home, simply select the property that suits your budget and lifestyle.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/browser_property_e6l66f.jpg",
  },
  {
    id: 2,
    title: "Submit a Purchase Request",
    text: "Once you’ve chosen a property, send a purchase request through our platform. Provide your details and preferred property, and our team will instantly receive your purchase order for processing.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/request_form_nx6e5n.jpg",
  },
  {
    id: 3,
    title: "Schedule an Inspection",
    text: "Before making any commitment, you’ll be invited for a physical or virtual inspection of the property. This allows you to confirm the property’s features, location, and authenticity with full transparency.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/land-inspection_k6frxo.jpg",
  },
  {
    id: 4,
    title: "Consultation and Agreement",
    text: "Our sales team will discuss your chosen property in detail — including documentation, pricing, and available payment plans. Once both parties agree on the terms, we proceed to the next step.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/consultation_m1ex9i.jpg",
  },
  {
    id: 5,
    title: "Make Secure Payment",
    text: "After final confirmation, payment is made only to Grace Route Limited’s official corporate account. This ensures full accountability and protection for your investment.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/payment_udvnge.jpg",
  },
  {
    id: 6,
    title: "Documentation and Property Handover",
    text: "Once payment is verified, we prepare and sign all relevant legal documents such as the Deed of Assignment and Allocation Letter. The property ownership is then officially transferred to you.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/documentation_agcfxx.png",
  },
];

function BuyProperty() {
  const [slideIndex, setSlideIndex] = useState(0); // zero-based index; default showing slide 5 (index 4)
  const slidesCount = SLIDES.length;

  function prevSlide() {
    setSlideIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
  }
  function nextSlide() {
    setSlideIndex((prev) => (prev + 1) % slidesCount);
  }
  function goTo(idx) {
    setSlideIndex(idx);
  }

  return (
    <div>
      <HeroSection
        title="Buy Property"
        sub_title="Find Your Perfect property"
        highlight="with Grace Route Limited"
        quote="Every great story begins at home. Let Grace Route Limited guide you to a property that matches your dreams, lifestyle, and future — where comfort meets lasting value."
        backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/services_f1kdbd.png"
      />
      <main className="max-w-6xl mx-auto px-6 py-12 text-slate-900">
        {/* HERO / Slider */}
        <section className="mb-16">
          {/* Top Welcome Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Welcome to our Buyer's Guide
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Buying any property can be one of the most exciting experiences of
              your life. With the right support and the help of a trusted agent,
              you'll make the most informed decisions. This guide walks you
              through each step with confidence.
            </p>
            <Link
              to="/property-listing"
              className="inline-block mt-6 px-6 py-3 text-base md:text-lg rounded-md font-semibold bg-gradient-to-r from-sky-700 to-sky-500 text-white shadow hover:opacity-90 transition"
            >
              Buy a Property
            </Link>
          </div>

          {/* Slider Section */}
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image & Text */}
            <div className="md:flex md:items-stretch">
              {/* Dynamic Image */}
              <div className="md:w-1/2 relative">
                <img
                  src={SLIDES[slideIndex].img}
                  alt={SLIDES[slideIndex].title}
                  className="w-full h-72 md:h-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Slide Text */}
              <div className="p-8 md:w-1/2 flex flex-col justify-center bg-white">
                <div className="text-sky-700 uppercase text-sm font-semibold tracking-wide">
                  Buying a property, Step by Step
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">
                  {SLIDES[slideIndex].title}
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  {SLIDES[slideIndex].text}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 border text-lg font-bold"
                    aria-label="Previous slide"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextSlide}
                    className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 border text-lg font-bold"
                    aria-label="Next slide"
                  >
                    →
                  </button>

                  <span className="ml-4 text-sm text-slate-500 font-medium">
                    {slideIndex + 1} / {slidesCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section (Image 2 used for thumbnails) */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">
            Top Tips for Working With us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-lg shadow overflow-hidden border">
              <div className="h-60 w-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dtzesgkf0/image/upload/properties_scjhae.png"
                  alt="Find the Right Agent"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold font-sans">Find the Right Property</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Research properties in our property page, read descriptions
                  and recommendations. Once it fits your budget and investment
                  plans, go for it.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow overflow-hidden border">
              <div className="h-60 w-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dtzesgkf0/image/upload/communicate_gfrxwg.png"
                  alt="Communicate"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold font-sans">Communicate</h2>
                <p className="mt-2 text-sm text-slate-600">
                  You can always communicate with us about your interests and
                  budgets, we have your interest at heart and will always refer
                  you on the best deal that will suit your budget and future
                  plans. Always communicate effectively about budgets,
                  timelines, and property-hunting goals.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow overflow-hidden border">
              <div className="h-60 w-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dtzesgkf0/image/upload/trust_process_at5mvx.jpg"
                  alt="Trust the Process"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold font-sans">Trust the Process</h4>
                <p className="mt-2 text-sm text-slate-600">
                  This may be your first time buying a property — ask questions,
                  rely on our expert experience, and trust the process.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Tools Section (Image 1 for background/visual) */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">
            Tools to Help You Find Your Property
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-5 shadow border">
                <h4 className="font-semibold">
                  Find a Home Using Our Interactive Map Search
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  Location plays an important role in the property-buying
                  process. Use the map search to view properties located in or
                  near the areas you love.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow border">
                <h4 className="font-semibold">Get to Know the Neighborhood</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Learn about communities on any listing page — local population
                  breakdowns, school ratings, nearby services, and more.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow border">
                <h4 className="font-semibold">
                  Create an Account on Our Website
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  Sign up to save searches, receive real-time property alerts,
                  and favorite homes you love.
                </p>
              </div>
            </div>

            <aside className="bg-gradient-to-br from-sky-800 to-sky-700 text-white rounded-lg p-5 shadow-lg flex flex-col items-center justify-center">
              <div className="w-full h-50 mb-4 overflow-hidden rounded-md">
                <img
                  src="https://res.cloudinary.com/dtzesgkf0/image/upload/here_for_you_whczr9.jpg"
                  alt="Tools visual"
                  className="object-cover w-full h-full"
                />
              </div>

              <h4 className="font-semibold text-lg">We're Here For You.</h4>
              <p className="mt-2 text-sm text-white/90 text-center">
                Buying a property can seem like a lot — but you’re not alone.
                With the right experience and tools, we can help you find the
                property of your dreams.
              </p>

              <Link
                to="/signup"
                className="mt-4 inline-block px-4 py-2 bg-white text-sky-700 rounded-md font-medium"
              >
                JOIN US
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BuyProperty;
