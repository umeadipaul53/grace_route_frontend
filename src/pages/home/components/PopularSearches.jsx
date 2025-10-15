import React from "react";

const categories = [
  {
    id: 1,
    title: "Lands",
    image: "/lands.jpeg",
  },
  {
    id: 2,
    title: "Duplex",
    image: "/duplex.jpg",
  },
  {
    id: 3,
    title: "Bungalow",
    image: "/Bungalow.jpg",
  },
  {
    id: 4,
    title: "Terraced Duplex",
    image: "/terraced_duplex.jpg",
  },
  {
    id: 5,
    title: "Block of Flats",
    image: "/block_of_flats.jpeg",
  },
  {
    id: 6,
    title: "Semi-detached Duplex",
    image: "/semi-detached.jpg",
  },
];

const PopularSearches = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
        Our Deals
      </h2> */}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            {/* Title */}
            <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold text-lg tracking-wide">
              {cat.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSearches;
