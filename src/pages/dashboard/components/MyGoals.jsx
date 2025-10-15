import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../../toastContext/useToast";
import {
  updateGoals,
  fetchUserProfile,
  clearError,
} from "../../../reducers/userReducer";

function MyGoals() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { error, details, loading } = useSelector((state) => state.user);
  const [buyingGoal, setBuyingGoal] = useState(
    details?.goals?.buying_goals || ""
  );
  const [timeline, setTimeline] = useState(details?.goals?.timeline || "");
  const [sellingGoal, setSellingGoal] = useState(
    details?.goals?.selling_goals || ""
  );
  const [educationalGoal, setEducationalGoal] = useState(
    details?.goals?.educational_goals || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only include fields with non-empty values
    const goalsPayload = {};

    if (buyingGoal) goalsPayload.buying_goals = buyingGoal;
    if (timeline) goalsPayload.timeline = timeline;
    if (sellingGoal) goalsPayload.selling_goals = sellingGoal;
    if (educationalGoal) goalsPayload.educational_goals = educationalGoal;

    const payload = { goals: goalsPayload };

    try {
      const result = await dispatch(updateGoals(payload)).unwrap();
      showToast(result.message || "Profile updated successfully!", "success");
    } catch (err) {
      console.error("Update Goals error:", err);
      showToast(
        typeof err === "string" ? err : err?.message || "Goals update failed.",
        "error"
      );
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch, showToast]);

  useEffect(() => {
    if (details?.goals) {
      setBuyingGoal(details.goals.buying_goals || "");
      setTimeline(details.goals.timeline || "");
      setSellingGoal(details.goals.selling_goals || "");
      setEducationalGoal(details.goals.educational_goals || "");
    }
  }, [details]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-2 px-6 md:px-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10 bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
          My Goals
        </h1>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Buying Goals */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
              Buying Goals
            </h2>
            <div className="space-y-3">
              {[
                "I am buying my first home",
                "I am finding my next home",
                "I am right sizing my home",
                "I am moving to the United States",
                "None, I'm just browsing",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer hover:text-yellow-600"
                >
                  <input
                    type="radio"
                    name="buyingGoal"
                    value={option}
                    checked={buyingGoal === option}
                    onChange={(e) => setBuyingGoal(e.target.value)}
                    className="accent-yellow-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <h3 className="text-lg font-medium text-gray-700 mt-8 mb-3">
              My timeline to buy is:
            </h3>
            <div className="space-y-3">
              {[
                "3 months or less",
                "3-6 months",
                "6+ months or more",
                "None of the above",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer hover:text-yellow-600"
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={option}
                    checked={timeline === option}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="accent-yellow-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Selling Goals */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
              Selling Goals
            </h2>
            <div className="space-y-3">
              {[
                "To sell my home",
                "To sell my home for a larger home",
                "To sell my home for a smaller home",
                "None of the above",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer hover:text-yellow-600"
                >
                  <input
                    type="radio"
                    name="sellingGoal"
                    value={option}
                    checked={sellingGoal === option}
                    onChange={(e) => setSellingGoal(e.target.value)}
                    className="accent-yellow-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Educational Goals */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
              Educational Goals
            </h2>
            <div className="space-y-3">
              {[
                "To learn about Real Estate news",
                "To learn about market trends",
                "None of the above",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer hover:text-yellow-600"
                >
                  <input
                    type="radio"
                    name="educationalGoal"
                    value={option}
                    checked={educationalGoal === option}
                    onChange={(e) => setEducationalGoal(e.target.value)}
                    className="accent-yellow-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="text-center mt-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300"
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default MyGoals;
