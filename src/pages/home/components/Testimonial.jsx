import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Chinedu Okafor",
    role: "Entrepreneur",
    text: "Grace Route Limited made my dream of owning a home in Lagos a reality. From the first consultation to the final paperwork, their team was transparent, professional, and supportive. I never had to worry about hidden costs or delays. Truly reliable!",
    image: "/testimonial5.jpeg",
  },
  {
    name: "Frank Chibuzor",
    role: "Trader",
    text: "As a first-time buyer, I was nervous about investing in property. Grace Route patiently guided me through every step, answered all my questions, and helped me secure a safe and affordable plot in Anambra. I feel secure knowing I made the right choice.",
    image: "/testimonial3.jpg",
  },
  {
    name: "Grace Daniel",
    role: "Banker",
    text: "What impressed me most was their integrity. In a market where trust is often lacking, Grace Route stands out. They delivered exactly what they promised, and my family is now settled in a beautiful home in Awka. Highly recommended.",
    image: "/testimonial.jpeg",
  },
  {
    name: "Ngozi Eze",
    role: "Business woman",
    text: "Investing in real estate used to feel complicated, but Grace Route made it simple. Their team handled everything smoothly and gave me clear updates. Today, my property investment is already appreciating in value. I couldn’t be happier",
    image: "/testimonial4.jpeg",
  },
  {
    name: "Emmanuel Osy",
    role: "Engineer",
    text: "From professionalism to customer care, Grace Route Properties is top-notch. They helped me acquire land in Isu aniocha without stress, and even supported me with the building process. I recommend them to anyone serious about safe real estate investment in Nigeria.",
    image: "/testimonial2.jpeg",
  },
];

const Testimonial = () => {
  return (
    <section className="relative w-full py-20">
      {/* Faint Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60"
          alt="background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Background split (left transparent, right subtle overlay) */}
      <div className="absolute inset-0 grid grid-cols-5">
        <div className="col-span-2 bg-transparent"></div>
        <div className="col-span-3 bg-yellow-900 dark:bg-gray-800/80"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Top Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-green-950 font-semibold mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-light dark:text-white">
              What our clients says..
            </h2>
          </div>

          {/* Navigation Arrows */}
          {/* <div className="flex space-x-3">
            <div className="swiper-button-prev !static !w-12 !h-12 flex items-center justify-center rounded-full bg-yellow-500 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer">
              <span className="text-lg text-gray-700 dark:text-white">‹</span>
            </div>
            <div className="swiper-button-next !static !w-12 !h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer">
              <span className="text-lg text-white">›</span>
            </div>
          </div> */}
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 5000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col h-full relative"
              >
                {/* Background watermark quote */}
                <div className="absolute -top-6 -right-6 text-[80px] text-gray-100 dark:text-gray-700 opacity-30 select-none">
                  “
                </div>

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed relative z-10">
                  “{testimonial.text}”
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
