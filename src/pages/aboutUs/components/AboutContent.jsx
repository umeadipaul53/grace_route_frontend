import React from "react";
import { Award, Users, Building2, Target, Eye, Star } from "lucide-react";

const aboutContent = {
  about: `Grace Route is a trusted real estate development company dedicated to creating premium, sustainable, and accessible housing solutions. With a commitment to integrity, innovation, and excellence, we aim to redefine the real estate experience for our clients and stakeholders.`,
  milestones: [
    { id: 1, number: "8+", label: "Awards", icon: Award },
    { id: 2, number: "1.1k+", label: "Happy Clients", icon: Users },
    { id: 3, number: "1.2k+", label: "Projects Completed", icon: Building2 },
  ],
  mission: `We are committed to using innovation and integrity in delivering high-end residential and commercial properties, making quality housing accessible to all.`,
  vision: `To become the most successful real estate company, providing innovative, accessible, and sustainable housing solutions for stakeholders.`,
  values: ["Integrity", "Innovation", "Customer Satisfaction", "Excellence"],
};

const AboutContent = () => {
  return (
    <div className="space-y-20 py-16">
      {/* About Section */}

      {/* Milestones */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {aboutContent.milestones.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.id}
                  className="p-6 rounded-xl bg-white shadow hover:shadow-xl transition"
                >
                  <Icon className="w-10 h-10 mx-auto text-amber-600" />
                  <div className="text-4xl font-extrabold text-amber-600 mt-4">
                    {m.number}
                  </div>
                  <div className="mt-2 text-gray-600 font-medium">
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition">
          <Target className="w-10 h-10 text-amber-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {aboutContent.mission}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition">
          <Eye className="w-10 h-10 text-amber-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-700 leading-relaxed">{aboutContent.vision}</p>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;
