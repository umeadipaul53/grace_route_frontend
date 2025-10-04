import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/Button";

const SearchSection = () => {
  const [range, setRange] = useState(500000);

  return (
    <div>
      {/* 🔹 Search Section */}
      <section
        className="relative text-white py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/legal-definition-of-property.jpg')" }} // <-- replace with your image
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/80 to-green-800/80"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-center"
          >
            Find Your <span className="text-gold-400">Dream Home</span>
          </motion.h2>
          <p className="mt-4 text-center text-gray-200 text-lg max-w-2xl mx-auto">
            Discover premium properties in Lagos, Abuja, Port Harcourt & beyond
            — tailored to your lifestyle.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
          >
            <select className="border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 w-full text-gray-700">
              <option>Location</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Port Harcourt</option>
            </select>

            <select className="border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 w-full text-gray-700">
              <option>Estate</option>
              <option>Victoria Island</option>
              <option>Banana Island</option>
              <option>Asokoro</option>
            </select>

            <select className="border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 w-full text-gray-700">
              <option>Bedrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>

            <select className="border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 w-full text-gray-700">
              <option>Bathrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>

            {/* CTA Button */}
            <button className="bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-semibold p-3 transition w-full shadow-md">
              Search
            </button>
          </motion.div>

          {/* Price Range */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-sm font-medium"
          >
            <label className="block mb-2 text-gray-100 text-center md:text-left">
              Your Range:{" "}
              <span className="font-bold text-gold-400">
                ₦{(range / 1000000).toFixed(0)}M – ₦1B
              </span>
            </label>
            <input
              type="range"
              min="500000"
              max="10000000000"
              step="1000000"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              className="w-full accent-gold-500"
            />
          </motion.div>
        </div>
      </section>

      {/* 🔹 About Us Section */}
    </div>
  );
};

export default SearchSection;
