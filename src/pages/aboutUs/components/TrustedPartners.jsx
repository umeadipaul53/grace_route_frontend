import React from "react";

const partners = [
  {
    id: 1,
    name: "Partner 1",
    logo: "https://res.cloudinary.com/dtzesgkf0/image/upload/arnold_vaovzq.png",
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "https://res.cloudinary.com/dtzesgkf0/image/upload/arnold_vaovzq.png",
  },
  {
    id: 3,
    name: "Partner 3",
    logo: "https://res.cloudinary.com/dtzesgkf0/image/upload/MILLENIUM_CITY_fck7l6.png",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "https://res.cloudinary.com/dtzesgkf0/image/upload/NEDKINGS_rcf1ug.jpg",
  },
  {
    id: 5,
    name: "Partner 5",
    logo: "https://res.cloudinary.com/dtzesgkf0/image/upload/peak_value_h4scmu.jpg",
  },
];

const TrustedPartners = () => {
  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Trusted <span className="text-amber-600">Partners</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We are honored to collaborate with world-class organizations that
          share our values of trust, integrity, and innovation.
        </p>
      </div>

      {/* Marquee Effect */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee space-x-16">
          {partners.concat(partners).map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:h-16 object-contain filter grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
