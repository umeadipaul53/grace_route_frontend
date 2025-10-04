import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const coreValues = [
  {
    id: 1,
    title: "Integrity",
    description:
      "We are committed to honesty and transparency in every transaction, ensuring our clients can trust us with their most valuable investments.",
  },
  {
    id: 2,
    title: "Excellence",
    description:
      "We strive for the highest standards in service, property solutions, and customer experience, delivering value that exceeds expectations.",
  },
  {
    id: 3,
    title: "Innovation",
    description:
      "We embrace modern real estate practices, technology, and smart solutions to provide clients with efficient and future-ready investments.",
  },
  {
    id: 4,
    title: "Customer-Centricity",
    description:
      "Our clients are at the heart of everything we do. We listen, understand, and tailor our services to meet their unique needs.",
  },
  {
    id: 5,
    title: "Sustainability",
    description:
      "We promote long-term growth and responsible property development, ensuring our projects benefit both our clients and the community.",
  },
];

const CoreValuesSlide = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-950">
          Our Core Values
        </h2>
        <p className="mt-2 text-green-950">
          Our core values that keep us consistent in quality service delivery.
        </p>

        <div className="mt-10">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={20}
            freeMode={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={4000} // slower = smoother continuous scroll
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {coreValues.map((value) => (
              <SwiperSlide key={value.id}>
                <div className="bg-white shadow-md rounded-xl p-6 text-left border border-gray-100 hover:shadow-xl transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                      {value.id}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {value.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSlide;
