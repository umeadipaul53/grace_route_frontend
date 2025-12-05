import React from "react";
import {
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  BanknotesIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    id: 1,
    title: "Exceptional Quality & Craftsmanship",
    description:
      "Our properties are meticulously designed and constructed using premium materials, ensuring durability and aesthetic distinction.",
    icon: StarIcon,
  },
  {
    id: 2,
    title: "Prime & Strategic Locations",
    description:
      "We carefully select locations in highly sought-after areas with excellent infrastructure, driving strong economic value.",
    icon: MapPinIcon,
  },
  {
    id: 3,
    title: "Innovative Sustainability",
    description:
      "We integrate advanced eco-friendly technologies and sustainable practices to promote environmental responsibility.",
    icon: CheckCircleIcon,
  },
  {
    id: 4,
    title: "Tailored & Accessible Payment Options",
    description:
      "We make homeownership easier with flexible payment options designed around your financial needs.",
    icon: BanknotesIcon,
  },
  {
    id: 5,
    title: "Client-Focused Service & Clarity",
    description:
      "Our experienced professionals ensure transparent processes and personalized support at every stage.",
    icon: UsersIcon,
  },
  {
    id: 6,
    title: "Robust Investment Potential",
    description:
      "We provide properties that consistently retain and grow in value, offering strong long-term returns.",
    icon: ChartBarIcon,
  },
];

const WhyUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://res.cloudinary.com/dtzesgkf0/image/upload/WhatsApp_Image_2025-12-02_at_2.26.49_PM_3_wvthsj.jpg"
            alt="Modern House"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h4 className="text-[#B8860B] font-semibold uppercase tracking-wide">
            Why Choose Us
          </h4>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            You Should Choose{" "}
            <span className="text-[#B8860B]">Grace Route Limited</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl">
            Grace Route Limited is dedicated to realizing your homeownership
            aspirations through innovative, sustainable, and client-focused real
            estate solutions.
          </p>

          {/* Features */}
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start space-x-4">
                <feature.icon className="w-8 h-8 text-[#B8860B] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
