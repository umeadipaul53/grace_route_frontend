import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import HeroSection from "../components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAccount,
  clearSuccessMessage,
  clearError,
} from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, loading, error } = useSelector((state) => state.user);

  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});

  // --- Validation ---
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address.";

    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    if (!form.firstname) newErrors.firstname = "First name is required.";
    if (!form.lastname) newErrors.lastname = "Last name is required.";
    if (!form.phone_number)
      newErrors.phone_number = "Phone number is required.";

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
      const result = await dispatch(createUserAccount(form)).unwrap();
      showToast(result.message, "success");

      // Reset form
      setForm({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone_number: "",
      });

      // Optional: navigate to login page
      // navigate("/login");
    } catch (err) {
      console.error("Create account error caught:", err);
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Account creation failed",
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
    <div>
      <HeroSection
        title="Sign Up"
        sub_title="Create "
        highlight=" Your Account"
        quote="Join Grace Route Limited today and take the first step toward your dream property."
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
            Come on board
          </h2>
          <p className="text-center text-gray-500 mb-8">Create your account</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
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

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
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

            {/* First Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.firstname
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.lastname
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.phone_number
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Login redirect */}
          <p className="text-center text-gray-600 text-sm mt-5">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default CreateAccount;
