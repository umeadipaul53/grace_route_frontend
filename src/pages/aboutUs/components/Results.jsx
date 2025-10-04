import React from "react";
import { motion } from "framer-motion";
import Heading from "../../../components/Heading";

const results = [
  {
    id: 1,
    title: "Market Trends & Analysis",
    desc: "Stay ahead with real-time insights on property values, neighborhood growth, and investment opportunities to make smarter buying and selling decisions.",
  },
  {
    id: 2,
    title: "Personalized Property Recommendations",
    desc: "Get curated suggestions based on your preferences, lifestyle, and budget — ensuring you find the right property faster.",
  },
  {
    id: 3,
    title: "Transparent Investment Insights",
    desc: "Access clear breakdowns of costs, ROI potential, and long-term value so you invest with confidence and peace of mind.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Results = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
        >
          <Heading text="Insights You Gain" />
        </motion.h2>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {results.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Number Circle */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-600 text-white text-xl font-bold mx-auto mb-6">
                {item.id}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
