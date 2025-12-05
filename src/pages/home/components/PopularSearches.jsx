import React from "react";

const categories = [
  {
    id: 1,
    title: "Lands",
    image: "https://res.cloudinary.com/dtzesgkf0/image/upload/lands_gc3trk.jpg",
  },
  {
    id: 2,
    title: "Duplex",
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/duplex_xfjt8q.jpg",
  },
  {
    id: 3,
    title: "Bungalow",
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/Bungalow_bftpkw.jpg",
  },
  {
    id: 4,
    title: "Terraced Duplex",
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/terraced_duplex_geq54o.jpg",
  },
  {
    id: 5,
    title: "Block of Flats",
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/block_of_flats_ugu3hj.jpg",
  },
  {
    id: 6,
    title: "Semi-detached Duplex",
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/semi-detached_ud4oka.jpg",
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
