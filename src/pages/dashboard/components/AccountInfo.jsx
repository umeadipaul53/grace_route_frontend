import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  editProfile,
  clearError,
} from "../../../reducers/userReducer";
import { useToast } from "../../../toastContext/useToast";

const AccountInfo = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { details, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: details?.firstname || "",
    lastName: details?.lastname || "",
    email: details?.email || "",
    house_number: details?.address?.house_number || "",
    street: details?.address?.street || "",
    lga: details?.address?.lga || "",
    city: details?.address?.city || "",
    state: details?.address?.state || "",
    country: details?.address?.country || "",
    postalCode: details?.address?.postalCode || "",
    phone_number: details?.phone_number || "",
  });

  const [errors, setErrors] = useState({});

  // --- Validation ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.house_number)
      newErrors.house_number = "House number is required.";
    if (!formData.street) newErrors.street = "Street name is required.";
    if (!formData.lga) newErrors.lga = "LGA is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle input changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Cancel ---
  const handleCancel = () => setIsEditing(false);

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      address: {
        house_number: formData.house_number,
        street: formData.street,
        lga: formData.lga,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      phone_number: formData.phone_number,
    };

    try {
      const result = await dispatch(editProfile(payload)).unwrap();
      showToast(result.message || "Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (err) {
      console.error("Edit profile error:", err);
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Account info update failed.",
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

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      setFormData({
        firstName: details.firstname || "",
        lastName: details.lastname || "",
        email: details.email || "",
        house_number: details.address?.house_number || "",
        street: details.address?.street || "",
        lga: details.address?.lga || "",
        city: details.address?.city || "",
        state: details.address?.state || "",
        country: details.address?.country || "",
        postalCode: details.address?.postalCode || "",
        phone_number: details.phone_number || "",
      });
    }
  }, [details]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Account Info
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-950 text-white rounded hover:bg-green-500 transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <div className={`${isEditing ? "hidden" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md p-2 ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md p-2 ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="mt-1 w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Addresses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                House Number *
              </label>
              <input
                type="text"
                placeholder="Enter your house number"
                name="house_number"
                value={formData.house_number}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md p-2 ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                } ${
                  errors.house_number ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.house_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.house_number}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street *
              </label>
              <input
                type="text"
                name="street"
                placeholder="Enter your street"
                value={formData.street}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md p-2 ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                } ${errors.street ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">{errors.street}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {["city", "lga", "state", "country", "postalCode"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")} *
                </label>
                <input
                  type="text"
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 w-full border rounded-md p-2 ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  } ${errors[field] ? "border-red-500" : "border-gray-300"}`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phone Section */}
        <div className={`${!isEditing ? "" : "hidden"}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Phone Number
          </h3>

          <div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 w-full border rounded-md p-2 ${
                !isEditing ? "bg-gray-100" : "bg-white"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountInfo;
