import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Heading from "../../../components/Heading";

const teamMembers = [
  {
    id: 1,
    name: "Chief Godwin Dike Moneke",
    title: "CEO / Managing Director",
    photoUrl:
      "https://res.cloudinary.com/dtzesgkf0/image/upload/profilepics_hiallp.jpg",
    bio: "With 20+ years in real estate leadership, Agida drives the company’s vision and growth.",
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
    <div className="relative w-full h-auto flex justify-center">
      <img
        src={member.photoUrl}
        alt={member.name}
        className="w-full max-w-sm object-contain rounded-2xl"
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
          <Heading text="Our Leadership" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet the visionary leader driving our growth, innovation, and
            commitment to excellence.
          </p>
        </div>

        {/* Grid (auto-center when only 1 member) */}
        <div
          className={`grid gap-8 justify-center 
          ${
            teamMembers.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }
        `}
        >
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
