// BuyerGuide.jsx
import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import { Helmet } from "react-helmet";

/**
 * Pure React component styled with Tailwind.
 * - Add this file to src/components/BuyerGuide.jsx
 * - Ensure Tailwind is configured in your project.
 */

const SLIDES = [
  {
    id: 1,
    title: "Submit Your Property Details",
    text: "Fill out the property submission form by providing accurate information such as property type, location, price, and description. Upload clear images and necessary documents to help us evaluate your listing.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/submit_details_jtebc0.png",
  },
  {
    id: 2,
    title: "Property Verification and Review",
    text: "Once we receive your submission, our verification team reviews all details and documents to ensure the property is legitimate, properly owned, and free from disputes.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/verify-property_qdlddk.jpg",
  },
  {
    id: 3,
    title: "Approval and Listing",
    text: "After successful verification, your property is approved and officially added to Grace Route Limited’s property listings, making it visible to thousands of potential buyers on our platform.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/approval_listing_g3dhb3.jpg",
  },
  {
    id: 4,
    title: "Buyer Interest and Negotiation",
    text: "When an interested buyer makes an inquiry or purchase request, our sales team facilitates communication, ensuring a transparent and professional negotiation process between both parties.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/buyers_rbws10.png",
  },
  {
    id: 5,
    title: "Agreement and Transaction Finalization",
    text: "Once both parties agree on the sale terms and price, we formalize the agreement. All transactions are processed securely through Grace Route Limited’s trusted payment channels.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/agreement_udcdcy.jpg",
  },
  {
    id: 6,
    title: "Seller Payment and Deal Closure",
    text: "After the buyer completes payment, the company remits the agreed sale amount to the seller. All documentation and closing processes are completed to ensure a smooth and lawful transfer.",
    img: "https://res.cloudinary.com/dtzesgkf0/image/upload/payment_closure_rlzmtx.jpg",
  },
];

function SellProperty() {
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
    <>
      <Helmet>
        <title>Sell Your Property – Grace Route Ltd</title>
        <meta
          name="description"
          content="Sell your land or property easily with Grace Route Ltd. We offer transparent valuation, listing and sales services across Nigeria."
        />
      </Helmet>
      <div>
        <HeroSection
          title="Sell Property"
          sub_title="Unlock the True Value "
          highlight="of Your Property"
          quote="Your property is more than a space — it’s an opportunity waiting to be maximized."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/services_f1kdbd.png"
        />
        <main className="max-w-6xl mx-auto px-6 py-12 text-slate-900">
          {/* HERO / Slider */}
          <section className="mb-16">
            {/* Top Welcome Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Welcome to our Seller's Guide
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Selling your property can be one of the most rewarding decisions
                you’ll ever make. With the right guidance and the support of a
                trusted real estate partner, you can attract genuine buyers and
                get the best value for your property. This guide walks you
                through each step with confidence and transparency.
              </p>
              <a
                href="#"
                className="inline-block mt-6 px-6 py-3 text-base md:text-lg rounded-md font-semibold bg-gradient-to-r from-sky-700 to-sky-500 text-white shadow hover:opacity-90 transition"
              >
                List your property
              </a>
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
                    Listing your property, Step by Step
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
              Top Tips for Listing your property
            </h3>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed mb-6 text-justify">
              The process of selling your property can feel overwhelming, but
              with the right resources, it doesn’t have to be. We are here to
              make your journey from “For Sale” to “Sold” as smooth and
              successful as possible. Here are three tips to make the most of
              the agent-client relationship.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-white rounded-lg shadow overflow-hidden border">
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dtzesgkf0/image/upload/patience_ymqwff.jpg"
                    alt="Find the Right Agent"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold font-sans">Be Patient.</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    The time it takes to sell a property can vary based on
                    market conditions, but no matter how fast or slow the sale
                    moves, avoid entering into negotiations with buyers whom you
                    aren't sure of their source of funds. Some patience and due
                    diligence on your side will help ensure you reach your
                    home-selling goals.
                  </p>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow overflow-hidden border">
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dtzesgkf0/image/upload/your_part_bdp2cg.jpg"
                    alt="Communicate"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold font-sans">Do Your Part.</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Why try to do it all yourself, when you can hire a
                    professional company with the experience and expertise to do
                    it for you? However, when you hire a company like us, don’t
                    leave it all up to them. As a seller, you’ll have a number
                    of personal responsibilities to manage to help make your
                    experience a success.
                  </p>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow overflow-hidden border">
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dtzesgkf0/image/upload/ready_erxmaq.png"
                    alt="Trust the Process"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold font-sans">Be Ready.</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Your property should be ready when buyers are. It’s best not
                    to request a 24-hour notice or let your phone or emails go
                    unanswered. It’s recommended that the seller leave the home
                    during showings. Buyers appreciate space and may feel
                    uncomfortable sharing their thoughts if you’re present.
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* Tools Section (Image 1 for background/visual) */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              Marketing Your Property
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-lg p-5 shadow border">
                  <h4 className="font-semibold">Online Listing</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Showcase your property with an online listing that
                    highlights key details and includes high-quality images.
                    These listings instantly grab potential buyers’ attention
                    and make your property stand out.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow border">
                  <h4 className="font-semibold">
                    Advanced Marketing Strategies
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Reach more buyers with Grace Route’s cutting-edge digital
                    marketing tools. With targeted ads and online strategies,
                    your property will get maximum visibility to drive traffic
                    and generate interest.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow border">
                  <h4 className="font-semibold">
                    Leverage the Grace Route Network.
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">
                    You’re not alone, and neither are we. Tap into the power of
                    the Grace Route network. With one of the largest networks of
                    agents in the country, word of mouth, online marketing, and
                    advertising opportunities will help get your property the
                    attention it deserves.
                  </p>
                </div>
              </div>

              <aside className="bg-gradient-to-br from-sky-800 to-sky-700 text-white rounded-lg p-5 shadow-lg flex flex-col items-center justify-center">
                <div className="w-full h-50 mb-4 overflow-hidden rounded-md">
                  <img
                    src="https://res.cloudinary.com/dtzesgkf0/image/upload/here_q20yre.jpg"
                    alt="Tools visual"
                    className="object-cover w-full h-full"
                  />
                </div>

                <h4 className="font-semibold text-lg">We're Here For You.</h4>
                <p className="mt-2 text-sm text-white/90 text-center">
                  A Grace Route agent can help eliminate the guesswork of your
                  real estate transaction. With this experienced professional on
                  one hand, and our comprehensive Grace Route Property Seller’s
                  Guide on the other, you’ll be well prepared to navigate the
                  market and sell your home quickly and confidently.
                </p>

                <a
                  href="#find-agent"
                  className="mt-4 inline-block px-4 py-2 bg-white text-sky-700 rounded-md font-medium"
                >
                  JOIN US
                </a>
              </aside>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default SellProperty;
