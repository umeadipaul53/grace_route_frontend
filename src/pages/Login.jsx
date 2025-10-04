import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../toastContext/CreateToast";
import HeroSection from "../components/HeroSection";

function Login() {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      showToast("✅ Login successful!", "success");
    } else {
      showToast("⚠️ Please fix the errors above.", "error");
    }
  };

  return (
    <div>
      <HeroSection
        title="Access Account"
        sub_title="Secure Login  "
        highlight=" to Your Account"
        quote="At Grace Route Limited, your trust and security come first. Log in to safely access your dashboard and manage your property goals with ease."
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
            Welcome back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Log in to your account
          </p>

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

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Log In
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

export default Login;
