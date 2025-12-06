import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../toastContext/useToast";
import HeroSection from "../components/HeroSection";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "../reducers/userReducer";
import { Helmet } from "react-helmet";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle input changes ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await dispatch(forgotPassword(form)).unwrap();
      showToast(result.message, "success");

      // Reset form
      setForm({
        email: "",
      });
    } catch (err) {
      console.error("Recover account error caught:", err);
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Recover Account failed",
        "error"
      );
    }
  };

  // --- Show error toast from Redux ---
  useEffect(() => {
    if (error) {
      showToast(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch, showToast]);

  return (
    <>
      <Helmet>
        <title>Forgot Password – Grace Route Ltd</title>
        <meta
          name="description"
          content="Recover your Grace Route Ltd account password."
        />
      </Helmet>
      <div>
        <HeroSection
          title="Recover Account"
          sub_title="Forgot "
          highlight=" Your Password?"
          quote="No worries! Enter your email below and we’ll send you a secure link to reset your password."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/career_yzxy5e.png"
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
                src="https://res.cloudinary.com/dtzesgkf0/image/upload/logo-new-removebg-preview_aenosg.png"
                alt="Grace Route Limited Logo"
                className="h-10"
              />
            </div>

            {/* Welcome Message */}
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Lost your password?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Recover your account
            </p>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
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
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline"
                >
                  Login?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? "Recovering Account..." : "Recover Account"}
              </button>
            </form>

            {/* Signup */}
            <p className="text-center text-gray-600 text-sm mt-5">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default ForgotPassword;
