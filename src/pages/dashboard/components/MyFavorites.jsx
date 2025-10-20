import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useToast } from "../../../toastContext/useToast";
import {
  getFavourites,
  toggleFavourite,
} from "../../../reducers/favouriteReducer";
import Swal from "sweetalert2";
import { secheduleTour } from "./../../../reducers/messageReducer";

/* ✅ Property Card Component */
const PropertyCard = ({ property }) => {
  const { loading } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [tourForm, setTourForm] = useState({
    property: property._id,
    email: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });

  /* ✅ Handle add/remove favourite */
  const handleFavourite = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Unfavorite this Property",
      text: "Are you sure you want to unfavorite this property?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, unfavorite",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await dispatch(toggleFavourite(id)).unwrap();

        const message =
          res.action === "removed"
            ? "Removed from favourites"
            : "Added to favourites";

        showToast(message, "success");
      } catch (err) {
        showToast(err?.message || "Something went wrong", "error");
      }
    }
  };

  // ✅ Validate input
  const validateTourForm = () => {
    const newErrors = {};
    if (!tourForm.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(tourForm.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!tourForm.date) {
      newErrors.date = "Date is required.";
    }

    if (!tourForm.time) {
      newErrors.time = "Time is required.";
    }

    if (!tourForm.name) {
      newErrors.name = "Fullname is required.";
    }

    if (!tourForm.phone) {
      newErrors.phone = "Phone Number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input change
  const handleChangeTourForm = (e) => {
    setTourForm({ ...tourForm, [e.target.name]: e.target.value });
  };

  const handleTourSchedule = async (e) => {
    e.preventDefault(); // 🚫 stop form refresh
    e.stopPropagation(); // 🚫 stop bubbling

    if (!validateTourForm()) return;

    const today = new Date().toISOString().split("T")[0];

    if (tourForm.date < today) {
      setErrors((prev) => ({
        ...prev,
        date: "Please select a valid date (today or future).",
      }));
      return; // ⛔ Stop submission
    }

    try {
      const result = await dispatch(secheduleTour(tourForm)).unwrap();
      showToast(result.message, "success");
      setOpenModal(false);
    } catch (err) {
      console.error("Tour scheduled error caught:", err);
      // err may be a string, not an object, so handle both
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Tour scheduling failed",
        "error"
      );
      setOpenModal(false);
    }
  };

  return (
    <div>
      {/* ✅ Image */}
      <div className="relative">
        <Link
          to={`/property-details/${property._id}`}
          key={property._id}
          className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >
          <img
            src={property?.images?.[0]?.url}
            alt={property?.property_name || "Property image"}
            className="w-full h-56 sm:h-64 md:h-72 object-cover"
          />
        </Link>
        {/* ✅ Favourite Button */}

        <button
          onClick={(e) => handleFavourite(e, property._id)}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-1.5 rounded-full shadow"
        >
          <Heart className="text-red-500 fill-red-500" size={20} />
        </button>
      </div>

      {/* ✅ Property Content */}
      <div className="p-4 sm:p-5">
        <p className="mt-2 text-base sm:text-lg font-semibold text-gray-400 tracking-tight capitalize font-serif truncate">
          {property.property_name}
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          ₦{property.price?.toLocaleString()}
        </h3>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {property.location?.city || "Unknown city"},{" "}
          {property.location?.state || ""}
        </p>

        {/* ✅ Details */}
        <div className="flex flex-wrap justify-between items-center mt-4 text-xs sm:text-sm text-gray-700 gap-y-1">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.unitsNumber} Units</span>
          <span>Plot size: {property.plotArea} sqm</span>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Listed by Grace Route Limited
        </p>
        <hr className="border-t-2 border-green-950 my-6" />
        <button
          className={
            "px-8 py-3 text-xs rounded-2xl border border-gray-500 font-bold text-green-950 transition bg-white hover:bg-green-100 hover:text-green-950 mx-1"
          }
          onClick={() => navigate(`/property-details/${property._id}`)}
        >
          View Listing
        </button>
        <button
          className={
            "px-9 py-3 text-xs rounded-2xl border border-gray-500 font-bold text-green-950 transition bg-white hover:bg-green-100 hover:text-green-950 mx-1"
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenModal(true);
          }}
        >
          Book a Tour
        </button>
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn">
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenModal(false);
                }}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-green-900 mb-4 text-center">
                Schedule a Property Tour
              </h2>

              <form
                onSubmit={handleTourSchedule}
                className="space-y-4"
                noValidate
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={tourForm.name}
                    onChange={handleChangeTourForm}
                    required
                    className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                    placeholder="Enter your Full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={tourForm.email}
                    onChange={handleChangeTourForm}
                    name="email"
                    required
                    className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={tourForm.phone}
                    onChange={handleChangeTourForm}
                    name="phone"
                    required
                    className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={tourForm.date}
                    onChange={(e) => {
                      const { value } = e.target;
                      const today = new Date().toISOString().split("T")[0];

                      if (value < today) {
                        setErrors((prev) => ({
                          ...prev,
                          date: "You cannot select a past date.",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, date: "" }));
                        handleChangeTourForm(e); // ✅ Only call update when valid
                      }
                    }}
                    required
                    min={new Date().toISOString().split("T")[0]} // ✅ UI prevention
                    className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={tourForm.time}
                    onChange={handleChangeTourForm}
                    required
                    className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.time
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  {loading ? "Confirming ..." : "Confirm Tour"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ✅ Property Listing Component */
const MyFavorites = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items: favourites, loading: favLoading } = useSelector(
    (state) => state.favourites || {}
  );

  /* ✅ Fetch favourites only when user logs in */
  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch, user]);

  /* ✅ Handle loading and empty states */
  if (favLoading)
    return <p className="text-center py-10">Loading Favorites...</p>;
  if (!favLoading && (!favourites || favourites.length === 0))
    return <p className="text-center py-10">No Fovorites found.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-8 text-center sm:text-left">
        My Favorites
      </h2>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {favourites.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default MyFavorites;
