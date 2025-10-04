import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../toastContext/CreateToast";
import HeroSection from "../components/HeroSection";

function ForgotPassword() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      showToast("✅ Link sent to your email successful!", "success");
    } else {
      showToast("⚠️ Please fix the errors above.", "error");
    }
  };

  return (
    <div>
      <HeroSection
        title="Recover Account"
        sub_title="Forgot "
        highlight=" Your Password?"
        quote="No worries! Enter your email below and we’ll send you a secure link to reset your password."
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/remax-logo.png"
              alt="Grace Route Limited Logo"
              className="h-10"
            />
          </div>

          {/* Welcome Message */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Lost your password?
          </h2>
          <p className="text-center text-gray-500 mb-8">Recover your account</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Login?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Recover Account
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-gray-600 text-sm mt-5">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default ForgotPassword;
