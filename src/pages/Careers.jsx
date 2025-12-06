import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  ArrowRight,
  Users,
  HeartHandshake,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import JoinGraceRouteCard from "../components/JoinUsCard";
import { Helmet } from "react-helmet";

const jobOpenings = [
  {
    id: 1,
    title: "Real Estate Sales Executive",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Connect clients with premium properties while ensuring seamless, transparent transactions that uphold our brand’s trusted reputation.",
  },
  {
    id: 2,
    title: "Marketing & Social Media Strategist",
    location: "Remote / Hybrid",
    type: "Full-time",
    description:
      "Create and execute impactful campaigns that tell our brand story and showcase our exclusive property listings to a global audience.",
  },
  {
    id: 3,
    title: "Administrative Assistant",
    location: "Abuja, Nigeria",
    type: "Full-time",
    description:
      "Provide exceptional organizational and communication support to our growing team, helping us maintain excellence across operations.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers at Grace Route Ltd</title>
        <meta
          name="description"
          content="Join Grace Route Ltd and build a career in real estate, sales, estate management and property development. Explore open positions and opportunities."
        />
      </Helmet>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <HeroSection
          title="Career"
          sub_title="Build Your Career"
          highlight="with Grace Route Limited"
          quote="Join a team where innovation, excellence, and integrity define the
        future of real estate."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/career_yzxy5e.png"
        />

        {/* Company Overview Section */}
        <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Build a Rewarding Career with Grace Route Limited
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Grace Route Limited offers exceptional opportunities for
              professional advancement and personal growth. As a leading,
              award-winning real estate and property investment company, we take
              pride in being the employer of choice for both fresh graduates and
              experienced professionals across diverse fields within our
              operations.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              At Grace Route Limited, every candidate is given an equal
              opportunity to succeed — free from discrimination, favoritism, or
              bias. Our selection process is strictly merit-driven, ensuring
              fairness, transparency, and excellence at every stage of
              recruitment.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We are deeply committed to nurturing talent through structured
              training programs focused on professional development, leadership,
              entrepreneurship, and personal growth. Our goal is to cultivate an
              innovation-driven work environment where ideas flourish,
              creativity is valued, and employees are empowered to turn
              imagination into reality.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you are passionate about shaping the future of real estate and
              align with Grace Route Limited’s core values of excellence,
              integrity, and innovation, we invite you to join our team — where
              your skills, ambition, and potential will find limitless
              opportunities to grow.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:w-1/2"
          >
            <img
              src="https://res.cloudinary.com/dtzesgkf0/image/upload/istockphoto-1178153976-612x612_tzntzf.jpg"
              alt="Team working together"
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
        </section>

        {/* Job Openings */}
        <section className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900/50">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Current <span className="text-[#B8860B]">Openings</span>
          </motion.h2>

          <div className="max-w-5xl mx-auto grid gap-8">
            {jobOpenings.map((job, i) => (
              <motion.div
                key={job.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white dark:bg-gray-950 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-800 transition"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{job.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1 space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                      <span>• {job.type}</span>
                    </div>
                  </div>
                  <a
                    href="#apply"
                    className="mt-2 md:mt-0 inline-flex items-center gap-2 bg-[#B8860B] hover:bg-amber-700 text-white px-6 py-2.5 rounded-full font-medium transition"
                    disabled
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        <JoinGraceRouteCard />
        {/* CTA Section */}
        <section className="relative py-24 text-center bg-gradient-to-br from-[#B8860B] via-amber-700 to-[#B8860B] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]"></div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            className="relative z-10 px-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Let’s Build the Future of Real Estate — Together
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-amber-100">
              Don’t see a role that fits? We’re always open to meeting
              exceptional talent who shares our vision.
            </p>
            <a
              href="mailto:careers@gracerouteltd.com"
              className="inline-block bg-white text-amber-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Send Your CV
            </a>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Careers;
