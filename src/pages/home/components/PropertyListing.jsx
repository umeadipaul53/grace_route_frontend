import React from "react";

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9b78825?auto=format&fit=crop&w=800&q=80",
    price: "$820,000",
    address: "3400 E Janice St, Long Beach, CA 90805",
    beds: 4,
    baths: 2,
    sqft: 1200,
    badges: ["Open House", "3D Virtual Tour"],
    listedBy: "Zuma, Inc - Srdika Kilic",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    price: "$400,000",
    address: "2150 Ohio Ave Apt E, Signal Hill, CA 90755",
    beds: 1,
    baths: 1,
    sqft: 638,
    badges: ["3D Virtual Tour", "New Listing"],
    listedBy: "TNG Real Estate Consultants - Dawn Coronel",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
    price: "$1,599,000",
    address: "3835 California Ave, Long Beach, CA 90807",
    beds: 4,
    baths: 4,
    sqft: 2457,
    badges: ["New Listing"],
    listedBy: "Coldwell Banker Realty - Donna Reel",
  },
];

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Image */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-70 object-cover"
        />
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.657 0-3.09.895-3.857 2.216A4.495 4.495 0 009 3.75c-2.761 0-5 2.015-5 4.5 0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{property.price}</h3>
        <p className="text-sm text-gray-600 mt-1">{property.address}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {property.badges.map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span>{property.sqft.toLocaleString()} Sq Ft</span>
        </div>

        <p className="mt-3 text-xs text-gray-500">{property.listedBy}</p>
      </div>
    </div>
  );
};

const PropertyListing = () => {
  return (
    <section className="max-w-7xl px-6 py-16 mx-auto">
      <h2 className="text-3xl font-bold text-green-950 mb-8">
        Featured Properties
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertyListing;
