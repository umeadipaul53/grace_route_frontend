import React from "react";

const categories = [
  {
    id: 1,
    title: "Duplex",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Luxury Homes",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Open Houses",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Price Reductions",
    image:
      "https://images.unsplash.com/photo-1600585154154-712aa3d8b6ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Virtual Tours",
    image:
      "https://images.unsplash.com/photo-1581093588401-22e66fb3f1b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Miracle Homes",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
];

const PopularSearches = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
        Popular Searches
      </h2>

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
