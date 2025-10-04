import React from "react";
import { Lightbulb, Target } from "lucide-react";

const VisionMission = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-yellow-50 to-green-50">
      <div className="max-w-5xl mx-auto text-center px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden max-w-md mx-auto">
              {/* Overlay inside the box */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/70 via-yellow-50/60 to-transparent pointer-events-none"></div>

              {/* Card Content */}
              <div className="relative bg-white/90 rounded-2xl shadow-xl p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg">
                    <Lightbulb size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 relative z-10">
                  To redefine real estate in Nigeria by providing affordable,
                  secure, and valuable properties that empower families and
                  investors for a brighter future.
                </p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden max-w-md mx-auto">
              {/* Overlay inside the box */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/70 via-yellow-50/60 to-transparent pointer-events-none"></div>

              {/* Card Content */}
              <div className="relative bg-white/90 rounded-2xl shadow-xl p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg">
                    <Target size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 relative z-10">
                  To make property ownership accessible through innovation,
                  transparency, and dedicated customer service while creating
                  lasting value for communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
