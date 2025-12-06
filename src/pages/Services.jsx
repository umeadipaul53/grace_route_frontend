import React from "react";
import { Building2, Home, Users, Map, BookOpen, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import { Helmet } from "react-helmet";

const services = [
  {
    title: "Real Estate Sales & Marketing",
    description:
      "We specialize in connecting clients with prime real estate opportunities. Whether you're buying, selling, or investing, Grace Route Limited provides expert market insights, seamless transactions, and trustworthy guidance to help you secure valuable properties with confidence.",
    icon: <Home className="w-12 h-12 text-[#B8860B]" />,
    image: "https://res.cloudinary.com/dtzesgkf0/image/upload/pro_yebwcc.avif",
  },
  {
    title: "Property Development & Management",
    description:
      "From design to delivery, we transform land into thriving communities. Our property development and management services ensure that every project meets the highest standards of quality, sustainability, and profitability for our clients and partners.",
    icon: <Building2 className="w-12 h-12 text-[#B8860B]" />,
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/92725248_opg4b0.jpg",
  },
  {
    title: "Land Investment Advisory",
    description:
      "We help investors make informed decisions with expert land valuation, documentation, and acquisition support. Grace Route Limited ensures transparency and growth-focused investments that yield excellent returns in Nigeria’s competitive property market.",
    icon: <Map className="w-12 h-12 text-[#B8860B]" />,
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/photo-1505693416388-ac5ce068fe85_buluxe.avif",
  },
  {
    title: "Training & Empowerment",
    description:
      "We believe in empowering individuals through knowledge. Our training programs are designed to equip aspiring real estate professionals and investors with practical industry insights, sales mastery, and long-term wealth creation strategies.",
    icon: <BookOpen className="w-12 h-12 text-[#B8860B]" />,
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/Real-Estate-Training-in-Nigeria_ux3gdu.jpg",
  },
  {
    title: "Seminars & Strategic Partnerships",
    description:
      "Through seminars, networking events, and collaborations, we build connections that drive real growth. Grace Route Limited partners with developers, investors, and organizations to foster innovation and excellence in the real estate industry.",
    icon: <Megaphone className="w-12 h-12 text-[#B8860B]" />,
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/consultm1_smyfbm.png",
  },
  {
    title: "Client Support & Consultancy",
    description:
      "We provide tailored consultancy services that ensure every client receives personalized advice and end-to-end support. From documentation to due diligence, we make your property journey smooth, secure, and rewarding.",
    icon: <Users className="w-12 h-12 text-[#B8860B]" />,
    image:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/realtor-chatting-with-potential-home-buyers-1024x559_mgbwhu.jpg",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>
          Our Services – Property Sales, Estate Development & Management
        </title>
        <meta
          name="description"
          content="Explore our real estate services including buying and selling property, facility management, estate development, land banking and property investment."
        />
      </Helmet>
      <div>
        <HeroSection
          title="Our Services"
          sub_title="What we "
          highlight="offer"
          quote="At Grace Route Limited, we don’t just offer real estate services — we deliver lasting value, trusted partnerships, and opportunities that help our clients achieve their dreams with confidence and class."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/services_f1kdbd.png"
        />
        <section className="py-20 bg-gray-50 dark:bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-green-950 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Our Services
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 mx-auto mb-16 rounded-full"></div>

            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-10 ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Image Section */}
                  <div className="md:w-1/2 overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[400px] object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="md:w-1/2">
                    <div className="flex items-center mb-4">
                      {service.icon}
                      <h3 className="ml-4 text-2xl font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-800 leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
