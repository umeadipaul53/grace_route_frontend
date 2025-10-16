import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const ComparableListings = ({ property }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-slate-100"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-slate-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Sliding container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 scroll-smooth no-scrollbar"
        whileTap={{ cursor: "grabbing" }}
      >
        {property.map((c, i) => (
          <motion.div
            key={i}
            className="min-w-[260px] bg-white rounded-lg shadow overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={c.images[0].url}
              alt={c.images[0].public_id}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <div className="text-sm text-slate-500">{c.property_name}</div>
              <div className="font-semibold mt-1">
                ₦{c.price.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {c.bedrooms} • {c.unitsNumber} units • {c.plotArea}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ComparableListings;
