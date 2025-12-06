import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import JoinGraceRouteCard from "../components/JoinUsCard";
import { Helmet } from "react-helmet";

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full"
      >
        <h3 className="text-base font-semibold text-gray-800 text-left">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-gray-500"
        >
          +
        </motion.span>
      </button>

      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "How do I buy a property with Grace Route Limited?",
      answer:
        "Start by browsing our available listings or contacting one of our agents. We will guide you through property inspections, negotiations, and completing all necessary paperwork until you officially own your property.",
    },
    {
      question: "How do I sell my property with Grace Route Limited?",
      answer:
        "Selling your property is simple. Reach out to our sales team, and we will evaluate your home, list it on our platforms, and connect you with verified buyers. We also handle marketing and negotiations to get you the best value.",
    },
    {
      question: "Does Grace Route Limited provide property valuation services?",
      answer:
        "Yes, we offer property valuation to help you understand the current market value of your home before selling or renting.",
    },
    {
      question: "Can I get financing assistance through Grace Route Limited?",
      answer:
        "We work with trusted financial institutions to connect our clients with mortgage and financing options that best suit their needs.",
    },
    {
      question: "Why should I choose Grace Route Limited?",
      answer:
        "We combine local expertise, professional guidance, and strong market presence to make your real estate journey seamless, whether buying, selling, or investing.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>FAQs – Grace Route Ltd</title>
        <meta
          name="description"
          content="Find answers to common questions about buying property, selling property, land banking and more at Grace Route Ltd."
        />
      </Helmet>
      <section className=" bg-gray-50">
        <HeroSection
          title="FAQ"
          sub_title="Got Questions?"
          highlight=" We’ve Got Answers"
          quote="At Grace Route Limited, we believe that buying or selling a property should
    be simple, transparent, and stress-free. Our FAQ section is designed to give
    you clarity and confidence every step of the way."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/services_f1kdbd.png"
        />
        <div className="max-w-5xl mx-auto px-4 mt-12 mb-12">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-gray-800 mb-4 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          {/* Section Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Welcome to our FAQ section where we answer common questions about
            our services, buying, and selling process. This will give you better
            insight into what we do at Grace Route Limited.
          </motion.p>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
        <JoinGraceRouteCard />
      </section>
    </>
  );
}

export default FAQ;
