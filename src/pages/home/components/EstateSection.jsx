import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MapPin, Home } from "lucide-react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getEstates } from "../../../reducers/estateReducer";

export default function EstateSection() {
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state) => state.estate);

  useEffect(() => {
    dispatch(getEstates());
  }, [dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
        Featured Estates
      </h2>

      {loading ? (
        <p className="text-center py-10">Loading Estates...</p>
      ) : items?.length === 0 ? (
        <p className="text-center text-gray-500">No estates available.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {items?.map((estate, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full h-120">
                  <img
                    src={estate?.images?.[0]?.url}
                    alt={estate?.images?.[0]?.public_id}
                    className="w-full h-full object-contain rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-semibold">{estate?.name}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">
                      Price per Plot
                    </span>
                    <span className="font-semibold text-blue-600">
                      ₦{estate?.pricePerPlot?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Home size={15} />
                      Plot Size: {estate?.plotSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {estate?.location?.city}, {estate?.location?.state}
                    </span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
