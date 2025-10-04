import React from "react";

const partners = [
  {
    id: 1,
    name: "Partner 1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    id: 3,
    name: "Partner 3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Amazon_logo.svg",
  },
  {
    id: 5,
    name: "Partner 5",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    id: 6,
    name: "Partner 6",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
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
