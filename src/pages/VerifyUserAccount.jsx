import { useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "../toastContext/useToast";
import HeroSection from "../components/HeroSection";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyAccount } from "../reducers/userReducer";
import { Helmet } from "react-helmet";

function VerifyUserAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        const res = await dispatch(VerifyAccount(token)).unwrap();
        showToast(res.message || "Account verified successfully!", "success");
      } catch (err) {
        showToast(
          typeof err === "string"
            ? err
            : err?.message || "Account verification failed.",
          "error"
        );
      }
    };

    verify();
  }, [token, dispatch]);

  // 🕒 Redirect to login page after success
  useEffect(() => {
    let timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        showToast("Redirecting to login...", "info");
        navigate("/login");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [successMessage, navigate, showToast]);

  return (
    <>
      <Helmet>
        <title>Verify User Account – Grace Route Ltd</title>
        <meta
          name="description"
          content="Verify your account with us and gain access to your world of great possibilities"
        />
      </Helmet>
      <div>
        <HeroSection
          title="Verify Your Account"
          sub_title="Confirm"
          highlight=" Email Address"
          quote="Please wait while we verify your account. Once successful, you’ll be able to log in."
          backgroundImage="https://res.cloudinary.com/dtzesgkf0/image/upload/career_yzxy5e.png"
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
                src="https://res.cloudinary.com/dtzesgkf0/image/upload/logo-new-removebg-preview_aenosg.png"
                alt="Grace Route Limited Logo"
                className="h-10"
              />
            </div>

            {loading && (
              <p className="text-center text-gray-600 animate-pulse">
                Verifying account...
              </p>
            )}

            {successMessage && (
              <>
                <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
                  Success!
                </h2>
                <p className="text-center text-green-500 font-semibold">
                  {successMessage}
                </p>
                <p className="text-center text-gray-500 text-sm mt-2">
                  Redirecting to login...
                </p>
              </>
            )}

            {error && (
              <>
                <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">
                  Verification Failed
                </h2>
                <p className="text-center text-red-500">{error}</p>
              </>
            )}
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default VerifyUserAccount;
