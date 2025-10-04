import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react"; // social icons
import Heading from "../../../components/Heading";

const teamMembers = [
  {
    id: 1,
    name: "Agida Oladipo",
    title: "Managing Director / CEO",
    photoUrl: "/team_1_1.jpg",
    bio: "With 20+ years in real estate leadership, Agida drives the company’s vision and growth.",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Femi Mabawonku",
    title: "Chief Financial Officer",
    photoUrl: "/team_1_2.jpg",
    bio: "Femi leads strategic finance, ensuring stability and sustainable expansion.",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Alonge Taiwo",
    title: "Deputy Managing Director",
    photoUrl: "/team_1_5.png",
    bio: "Taiwo oversees daily operations and drives organizational excellence.",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Grace Odu",
    title: "Head of Marketing",
    photoUrl: "https://via.placeholder.com/400x400.png?text=Grace+Odu",
    bio: "Grace manages brand growth, digital strategy, and customer engagement.",
    linkedin: "#",
  },
];

const TeamCard = ({ member }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ duration: 0.3 }}
    className="relative bg-white rounded-2xl shadow-md overflow-hidden group"
  >
    {/* Image */}
    <div className="relative w-full h-64">
      <img
        src={member.photoUrl}
        alt={member.name}
        className="w-full h-full object-cover"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center p-4">
        <p className="text-sm text-gray-200 text-center">{member.bio}</p>
      </div>
    </div>

    {/* Content */}
    <div className="p-5 text-center">
      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
      <p className="text-sm text-gray-500">{member.title}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Linkedin size={18} />
        </a>
      )}
    </div>
  </motion.div>
);

const TeamMembers = () => {
  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading text="Our Management Team" />

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet the visionary leaders driving our growth, innovation, and
            commitment to excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
