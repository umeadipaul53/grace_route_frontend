import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import JoinGraceRouteCard from "../components/JoinUsCard";
import { sendContactMessage } from "../reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../toastContext/useToast";
import { Helmet } from "react-helmet";

function Contact() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    if (!form.subject.trim())
      e.subject = "Please enter subject of your message.";
    if (!form.message.trim()) e.message = "Please write a message.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    setStatus({ loading: true, success: null, message: "" });
    try {
      const result = await dispatch(sendContactMessage(form)).unwrap();
      showToast(result.message, "success");
      setStatus({
        loading: false,
        success: true,
        message: "Message sent successfully.",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Sending message failed",
        "error"
      );
      setStatus({
        loading: false,
        success: false,
        message: err.message || "Error occurred.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Grace Route Ltd</title>
        <meta
          name="description"
          content="Contact Grace Route Ltd for inquiries on property sales, land banking, estate development and investment opportunities. We are here to help."
        />
      </Helmet>
      <div>
        <HeroSection
          title="Contact Us"
          sub_title="Let's Build"
          highlight="Your Future Together"
          quote="We’re here to help you find the property that feels like home — contact us today to take the next step."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/career_yzxy5e.png"
        />

        <div className="bg-gray-50 py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Get In Touch
              </h1>
              <div className="w-32 h-1 mx-auto bg-gradient-to-r from-[#D4AF37] via-[#C5A572] to-[#B8860B] rounded-full"></div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              {/* Left - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl shadow-xl p-10 border border-transparent hover:border-[#C5A572] transition"
              >
                <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Message
                    </label>
                    <textarea
                      rows="5"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status.loading}
                    className="w-full bg-gradient-to-r from-[#D4AF37] via-[#C5A572] to-[#B8860B] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
                  >
                    {status.loading ? "Sending..." : "Send Message"}
                  </motion.button>

                  <AnimatePresence>
                    {status.message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-5 p-4 rounded-lg text-sm ${
                          status.success
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>

              {/* Right - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
                    Our Contact Information
                  </h3>
                  <ul className="space-y-6 text-neutral-700 text-base">
                    {[
                      {
                        icon: <FaMapMarkerAlt />,
                        title: "Address",
                        detail:
                          "House 1, Ground Floor Emenike Iykepac Street Behind Meal Dorm Resturant Okpuno Awka South",
                      },
                      {
                        icon: <FaEnvelope />,
                        title: "Email",
                        detail: (
                          <a
                            href="mailto:info@gracerouteltd.com"
                            className="text-[#B8860B] hover:underline"
                          >
                            info@gracerouteltd.com
                          </a>
                        ),
                      },
                      {
                        icon: <FaPhoneAlt />,
                        title: "Whatsapp Line",
                        detail: (
                          <a
                            href="tel:+2347079534899"
                            className="text-[#B8860B] hover:underline"
                          >
                            +234 707 953 4899
                          </a>
                        ),
                      },
                      {
                        icon: <FaPhoneAlt />,
                        title: "Call line",
                        detail: (
                          <a
                            href="tel:+2347077777426"
                            className="text-[#B8860B] hover:underline"
                          >
                            +234 707 777 7426
                          </a>
                        ),
                      },
                      {
                        icon: <FaClock />,
                        title: "Business Hours",
                        detail: (
                          <>
                            Mon–Fri: 9:00 AM – 6:00 PM
                            <br />
                            Sat: 9:00 AM – 2:00 PM
                          </>
                        ),
                      },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 hover:-translate-y-1 transition-transform"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C5A572] to-[#B8860B] text-white shadow-md">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm mt-1">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map */}
                <div className="overflow-hidden rounded-3xl shadow-xl border-2 border-[#C5A572]/30">
                  <iframe
                    title="Grace Route Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.885801265149!2d7.059600443508621!3d6.234513180976921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104383ee9074a4d1%3A0x367bb3bc6d22d347!2sMeal%20Dorm%20Restaurant!5e0!3m2!1sen!2sng!4v1760633780281!5m2!1sen!2sng"
                    className="w-full h-80 border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <JoinGraceRouteCard />
      </div>
    </>
  );
}

export default Contact;
