import React from "react";
import { motion } from "framer-motion"; // ✅ import motion

const Values = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
            About <span className="text-gold-three">Grace Route Limited</span>
          </h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            At <span className="font-semibold">Grace Route</span>, quality is
            not just a standard; it’s our promise. We remain steadfast in
            delivering excellence, empowering individuals, and creating
            opportunities that make real estate ownership easier, smarter, and
            within reach.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-amber-600 text-xl">🏆</span> Our Goal
              </h4>
              <p className="text-gray-600">
                Our goal goes beyond making homeownership a reality — we are
                committed to making the journey simple, accessible, and
                rewarding for everyone. By combining innovation with
                consistency, we provide reliable solutions that redefine
                property ownership.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-amber-600 text-xl">✨</span> Network
                marketing edge
              </h4>
              <p className="text-gray-600">
                As pioneers in real estate network marketing, our pathway
                connects people, opportunities, and solutions — ensuring
                sustainable growth and ownership success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/webaliser-_TPTXZd9mOo-unsplash.jpg"
            alt="Modern House"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
