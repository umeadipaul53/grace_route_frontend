import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

const newsItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80",
    title: "U.S. Market Update: New Listings on the Rise Heading into Summer",
    date: "June 18, 2025",
    category: "Market Trends",
    excerpt:
      "Explore comprehensive data on new listings, home prices, and time spent on market in the latest REMAX National Housing Report for May 2025.",
    link: "#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
    title: "Grace Route Expands Into New Cities Across Nigeria",
    date: "July 02, 2025",
    category: "Company News",
    excerpt:
      "Our expansion continues as we bring affordable housing solutions to more communities nationwide.",
    link: "#",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80",
    title:
      "The Future of Real Estate: Digital Transformation in Property Sales",
    date: "July 10, 2025",
    category: "Insights",
    excerpt:
      "Learn how technology is reshaping real estate transactions and improving customer experience.",
    link: "#",
  },
];

const NewsCard = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Grace Route News
      </h2>

      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="rounded-2xl overflow-hidden shadow-md"
      >
        {newsItems.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="bg-white flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-3/5 w-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Content with motion */}
              <motion.div
                className="p-6 md:p-8 flex flex-col justify-center md:w-2/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                key={news.id} // forces re-animation on slide change
              >
                <motion.p
                  className="text-sm text-amber-600 font-semibold tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {news.category}
                </motion.p>

                <motion.h3
                  className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 leading-snug"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  {news.title}
                </motion.h3>

                <motion.p
                  className="mt-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  {news.date}
                </motion.p>

                <motion.p
                  className="mt-4 text-gray-600 text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {news.excerpt}
                </motion.p>

                <motion.a
                  href={news.link}
                  className="mt-6 inline-block text-amber-600 font-medium hover:underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  Read Post →
                </motion.a>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsCard;
