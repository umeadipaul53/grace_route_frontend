import React from "react";
import Heading from "../../../components/Heading";

const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 mt-16 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <Heading text="About Grace Route Limited" />

          <p className="mt-4 text-slate-600 leading-relaxed">
            At Grace Route Limited, we don’t just sell properties — we create
            experiences that last a lifetime. Built on a foundation of trust,
            excellence, and innovation, we redefine what real estate means by
            combining local market expertise with world-class service standards.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Our award-winning team brings together decades of combined
            experience, delivering a rare blend of insight, negotiation mastery,
            and personalized care. From your very first consultation to closing
            and beyond, we are committed to guiding you with clarity,
            confidence, and dedication.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            At Grace Route Limited, every client is unique, and so is every
            journey. Whether you’re buying your first home, investing in
            high-value properties, or searching for a luxury villa that matches
            your lifestyle, our mission is to make the process seamless,
            rewarding, and tailored entirely to you.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            With innovative marketing strategies, a client-first approach, and a
            reputation built on results, Grace Route Limited continues to set
            the benchmark for real estate excellence. More than properties, we
            deliver peace of mind, value, and long-lasting relationships.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 text-center">
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="text-2xl font-bold text-indigo-600">500+</h4>
              <p className="text-sm text-slate-500">Homes Sold</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="text-2xl font-bold text-indigo-600">98%</h4>
              <p className="text-sm text-slate-500">Client Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://res.cloudinary.com/dqzsdgugd/image/upload/v1716806487/LCRNG%20IMAGES/AboutHeroImg1_e4n7qw.png"
            alt="team at work"
            className="w-full h-[28rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
