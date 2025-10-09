import React from "react";
import { Search, Heart } from "lucide-react";

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    address: "95 ALDER CT, LONDON, KY 40744",
    price: "$249,900",
    beds: 3,
    baths: 2,
    area: "1,896 Sq Ft",
    agent: "CENTURY 21 Advantage Realty",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
    address: "673 SUBLIMITY SCHOOL RD, LONDON, KY 40744",
    price: "$180,000",
    beds: 2,
    baths: 1,
    area: "1,058 Sq Ft",
    agent: "CENTURY 21 Advantage Realty",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    address: "112 GRAY BIRD LANE, LONDON, KY 40741",
    price: "$309,900",
    beds: 3,
    baths: 2,
    area: "1,570 Sq Ft",
    agent: "Sallie Davidson, Realtors",
  },
];

const PropertyListing = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* 🔍 Sticky Search + Filter Section */}
        <div className="sticky top-0 bg-white z-30 border-b shadow-sm pb-3 mb-8">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-3 mb-4 border rounded-lg shadow-sm p-2">
            <input
              type="text"
              placeholder="Search by city, neighborhood, or ZIP code"
              className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <select className="border rounded-md px-4 py-2 text-gray-700">
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-gray-700">
              <option>Home Type</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-gray-700">
              <option>Price</option>
            </select>
            <select className="border rounded-md px-4 py-2 text-gray-700">
              <option>Bed/Bath</option>
            </select>
            <button className="border rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
              Filters
            </button>
            <label className="flex items-center gap-2 text-gray-600 ml-auto">
              <input type="checkbox" className="w-4 h-4" />
              Show Map
            </label>
          </div>
        </div>

        {/* 🏠 Results Header */}
        <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-6">
          <p>
            <span className="font-medium">
              London, KY Homes for Sale and Real Estate
            </span>
          </p>
          <p>
            Sort:{" "}
            <span className="font-medium text-gray-800">Newest first</span> |
            367 results
          </p>
        </div>

        {/* 🧱 Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.address}
                  className="w-full h-52 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full shadow">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  New Listing
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {property.price}
                </h3>
                <p className="text-gray-800 text-sm">{property.address}</p>

                <div className="flex text-gray-600 text-sm gap-4 mt-2">
                  <p>{property.beds} Beds</p>
                  <p>{property.baths} Baths</p>
                  <p>{property.area}</p>
                </div>

                <p className="text-xs text-gray-500 pt-2 border-t mt-3">
                  Listing by {property.agent}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 📄 Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Previous
          </button>
          <button className="px-3 py-1.5 border border-blue-600 bg-blue-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListing;
