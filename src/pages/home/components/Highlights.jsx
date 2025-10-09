import React from "react";
import { Home, Map, Key, BarChart3, Building2, Handshake } from "lucide-react";

const highlights = [
  {
    id: 1,
    icon: <Home className="w-8 h-8 text-[#B8860B]" />,
    title: "Property Sales",
    desc: "We make owning a home simple, transparent, and stress-free. Whether you’re buying your first house or upgrading to a bigger space, we provide verified properties with complete documentation and guide you through every step until you get your keys.",
    img: "/property-sales.jpg",
  },
  {
    id: 2,
    icon: <Map className="w-8 h-8 text-[#B8860B]" />,
    title: "Land Acquisition",
    desc: "Secure your future with safe and verified land investments. We offer plots in prime locations across Nigeria, with proper titles and documentation. From residential to commercial land, we help you avoid land fraud and ensure a smooth acquisition process.",
    img: "/Land-Acquisition.jpg",
  },
  {
    id: 3,
    icon: <Key className="w-8 h-8 text-[#B8860B]" />,
    title: "Rentals & Leasing",
    desc: "Looking for a place to rent? We connect clients with affordable and well-managed apartments, houses, and commercial spaces. Our rental process is fast, reliable, and designed to match you with the right property at the right budget.",
    img: "/rentals-leasing.jpg",
  },
  {
    id: 4,
    icon: <BarChart3 className="w-8 h-8 text-[#B8860B]" />,
    title: "Real Estate Investment",
    desc: "Grow your wealth through smart real estate investments. From buying and reselling properties to land banking and rental income opportunities, we provide expert guidance on high-return investment options tailored to your financial goals.",
    img: "/real-estate-investment.jpg",
  },
  {
    id: 5,
    icon: <Building2 className="w-8 h-8 text-[#B8860B]" />,
    title: "Property Management",
    desc: "We take the stress out of managing properties. From rent collection and tenant management to maintenance and facility supervision, we ensure your property remains profitable, well-maintained, and hassle-free.",
    img: "/property-management.jpg",
  },
  {
    id: 6,
    icon: <Handshake className="w-8 h-8 text-[#B8860B]" />,
    title: "Real Estate Consultancy",
    desc: "Our consultancy service helps clients make informed real estate decisions. Whether you’re a first-time buyer, investor, or developer, we provide expert advice on property trends, market analysis, and strategic opportunities to maximize your returns.",
    img: "/culsultancy.jpg",
  },
];

const Highlights = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#fdfcfb] via-[#e7d07c] to-[#a8e6cf]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Our Services
          </h2>
          <p className="mt-4 text-gray-600">
            With transparency and professionalism, we make your journey to
            owning or investing in property seamless and rewarding.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-70 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
