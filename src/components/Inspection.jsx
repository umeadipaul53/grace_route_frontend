import React from "react";

const Inspection = () => {
  return (
    <section className="relative w-full bg-green-950 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10">
        {/* Left / Text block */}
        <div className="text-center md:text-left flex-1">
          <h4 className="text-sm font-medium text-amber-400 uppercase">
            Book an Inspection
          </h4>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-white">
            Let’s Go Inspect Your New Property
          </h2>
          <p className="mt-2 text-lg font-semibold text-white">
            Whatsapp us on:{" "}
            <a
              href="tel:+2347079534899"
              className="underline hover:text-amber-300"
            >
              +234 707 953 4899
            </a>
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            Call us on:{" "}
            <a
              href="tel:+2347077777426"
              className="underline hover:text-amber-300"
            >
              +234 707 777 7426
            </a>
          </p>
        </div>

        {/* Right / Image */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dtzesgkf0/image/upload/inspection_yxuqkm.png"
            alt="Agent Thumbs Up"
            className="w-32 md:w-100 object-contain"
          />
        </div>
      </div>
      {/* Optional bottom accent / stripe */}
      <div className="h-2 bg-gold w-full"></div>
    </section>
  );
};

export default Inspection;
