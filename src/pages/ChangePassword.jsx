import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../toastContext/useToast";
import HeroSection from "../components/HeroSection";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkToken,
  recoverPassword,
  clearError,
} from "../reducers/userReducer";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [form, setForm] = useState({ newPassword: "", confirmPass: "" });
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  const token = searchParams.get("token");

  // --- Validate form ---
  const validateForm = () => {
    const newErrors = {};

    if (!form.newPassword) newErrors.newPassword = "New Password is required.";
    else if (form.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters long.";

    if (form.newPassword !== form.confirmPass)
      newErrors.confirmPass = "Passwords do not match.";

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
    if (!tokenValid) return; // Block if invalid

    try {
      const result = await dispatch(
        recoverPassword({ token, ...form })
      ).unwrap();

      // ✅ Show toast for 2 minutes
      showToast(result.message, "success");

      setForm({ newPassword: "", confirmPass: "" });
      setTimeout(() => navigate("/login"), 6000);
    } catch (err) {
      showToast(err?.message || "Change Password failed", "error");
    }
  };

  // --- Show Redux errors ---
  useEffect(() => {
    if (error) {
      showToast(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch, showToast]);

  // --- Verify token ---
  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const result = await dispatch(checkToken(token)).unwrap();
        showToast(result.message, "success");
        setTokenValid(result.valid);
      } catch (err) {
        setTokenValid(false);
        showToast(
          typeof err === "string"
            ? err
            : err?.message || "Recover Account failed",
          "error"
        );
      }
    };

    checkTokenStatus();
  }, [token]);

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
          <div className="flex justify-center mb-6">
            <img
              src="/logo-new-removebg-preview.png"
              alt="Grace Route Limited Logo"
              className="h-10"
            />
          </div>

          {tokenValid === null && (
            <p className="text-center text-gray-600">Verifying token...</p>
          )}

          {tokenValid === false && (
            <p className="text-center text-red-600 font-semibold">
              Invalid or expired password reset link.
            </p>
          )}

          {tokenValid === true && (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Lost your password?
              </h2>
              <p className="text-center text-gray-500 mb-8">
                Recover your account
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* --- New Password --- */}
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new Password"
                    value={form.newPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.newPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* --- Confirm Password --- */}
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPass"
                    placeholder="Confirm Password"
                    value={form.confirmPass}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.confirmPass
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  {errors.confirmPass && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPass}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? "Changing password..." : "Change Password"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default ChangePassword;
