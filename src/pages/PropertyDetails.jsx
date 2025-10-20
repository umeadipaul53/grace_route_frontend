import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyDetails,
  getComparableProperties,
} from "../reducers/propertyReducer";
import { useParams } from "react-router-dom";
import { getFavourites, toggleFavourite } from "../reducers/favouriteReducer";
import { useToast } from "../toastContext/useToast";
import { buyProperty } from "../reducers/userReducer";
import ComparableListings from "./comparableProperty";
import {
  VolumeX,
  Car,
  Utensils,
  Bike,
  ShoppingCart,
  X,
  Heart,
} from "lucide-react";
import { secheduleTour } from "../reducers/messageReducer";
import DOMPurify from "dompurify";

function PropertyDetails() {
  const { showToast } = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { propertyDetail, comparableProperties } = useSelector(
    (state) => state.property
  );
  const { items: favourites, loading: favLoading } = useSelector(
    (state) => state.favourites || {}
  );
  const { loading } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.user);
  const [isBuying, setIsBuying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [tourForm, setTourForm] = useState({
    property: id,
    email: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(getPropertyDetails(id));
  }, [id]); // ✅ only depend on id, dispatch is stable

  useEffect(() => {
    dispatch(getComparableProperties(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user?._id) dispatch(getFavourites());
  }, [dispatch, user?._id]);

  /* ✅ Check if property is a favourite */
  const isFavourite =
    Array.isArray(favourites) &&
    favourites.some((fav) => fav._id === propertyDetail?._id);

  /* ✅ Handle add/remove favourite */
  const handleFavourite = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ prevent navigation when clicking Buy
    if (!user) {
      showToast("Please log in to add favorites", "error");
      return;
    }

    try {
      const result = await dispatch(toggleFavourite(id)).unwrap();
      const message =
        result.action === "removed"
          ? "Removed from favourites"
          : "Added to favourites";
      showToast(message, "success");
    } catch (err) {
      showToast(err || "Something went wrong", "error");
    }
  };

  /* ✅ Handle property purchase */
  const handleBuyProperty = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ prevent navigation when clicking Buy
    if (!user) {
      showToast("Kindly log in to purchase this property", "error");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    try {
      setIsBuying(true);
      const result = await dispatch(buyProperty(id)).unwrap();

      if (result?.message?.toLowerCase().includes("already")) {
        showToast(result.message, "error");
        return;
      }

      showToast(
        result.message ||
          "Thank you for purchasing this property. Our sales team will contact you shortly.",
        "success"
      );
    } catch (err) {
      showToast(
        typeof err === "string" ? err : err?.message || "Purchase failed",
        "error"
      );
    } finally {
      setIsBuying(false);
    }
  };

  // --- Example property data (169 Sunset Ln, London, KY) ---
  const property = {
    agent: {
      name: "Grace Route Limited",
      office:
        "House 1, Ground Floor Emenike Iykepac Street Behind Meal Dorm Resturant Okpuno Awka South",
      phone: "+2347062825454",
      email: "info@gracerouteltd.com",
      avatar: "/logo-head.png",
    },
    neighborhood: {
      summary:
        "Quiet neighborhood with easy access to schools and highways. Friendly community and a short drive to downtown amenities.",
      highlights: [
        {
          icon: "🏫",
          title: "Schools",
          text: "Top-rated elementary within 10 minutes.",
        },
        {
          icon: "🛒",
          title: "Shopping",
          text: "Convenient grocery and retail nearby.",
        },
        {
          icon: "🌳",
          title: "Parks",
          text: "Multiple parks and walking trails.",
        },
      ],
    },
  };

  const features = [
    {
      icon: <VolumeX className="w-5 h-5 text-green-600" />,
      title: "Quiet",
      desc: "Virtually no sources of noise nearby.",
    },
    {
      icon: <Car className="w-5 h-5 text-green-600" />,
      title: "Car friendly",
      desc: "Excellent access to freeways and major arteries, with almost no chance of parking problems.",
    },
    {
      icon: <Utensils className="w-5 h-5 text-green-600" />,
      title: "Restaurants",
      desc: "Some restaurants within walking distance.",
    },
    {
      icon: <Bike className="w-5 h-5 text-green-600" />,
      title: "Cycling friendly",
      desc: "Not very suitable for bicycle commuting or recreational cycling.",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-green-600" />,
      title: "Groceries",
      desc: "Closest supermarket further than a 30-minute walk.",
    },
  ];

  // --- Gallery state (static gallery: main image + thumbnails) ---
  const [mainIndex, setMainIndex] = useState(1);
  const mainImage =
    propertyDetail?.images?.[mainIndex]?.url ||
    propertyDetail?.images?.[0]?.url ||
    "/Bungalow.jpg";

  const amenities = [
    "Electricity",
    "Water Supply",
    "Accessible Road",
    "Security",
    "Drainage System",
    "Waste Disposal",
    "Registered Title",
    "Plot Allocation",
  ];

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
    <div className="bg-gray-50 text-gray-800">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          &nbsp;›&nbsp;
          <a href="/homes" className="hover:underline">
            Homes
          </a>{" "}
          &nbsp;›&nbsp;
          <span>{propertyDetail?.property_name}</span>
        </div>

        {/* Header: Title / Price / Quick facts */}
        <div className="bg-white rounded-lg shadow px-6 py-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {propertyDetail?.property_name}
              </h1>
              <div className="text-sm text-slate-500 mt-1">
                {propertyDetail?.location?.city}{" "}
                {propertyDetail?.location?.state}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium ring-1 ring-amber-100">
                  {propertyDetail?.status === "available"
                    ? "active"
                    : "not active"}
                </span>
                <div className="text-2xl md:text-3xl font-extrabold text-amber-600">
                  ₦{propertyDetail?.price?.toLocaleString()}
                </div>
                <div className="text-sm text-slate-500">
                  {propertyDetail?.bedrooms} • {propertyDetail?.unitsNumber}{" "}
                  units • {propertyDetail?.plotArea}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className={
                  "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-green-950 text-white"
                }
                onClick={(e) => handleBuyProperty(e, propertyDetail._id)}
                disabled={isBuying}
              >
                {isBuying ? "Buying..." : "Buy Now"}
              </button>
              {user && (
                <button
                  type="button"
                  onClick={(e) => handleFavourite(e, propertyDetail._id)}
                  disabled={favLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-400 shadow hover:bg-blue-100"
                >
                  {isFavourite ? (
                    <>
                      <Heart className="text-red-500 fill-red-500 w-4 h-4" />
                      <span className="text-sm text-red-500 font-medium">
                        Favourite
                      </span>
                    </>
                  ) : (
                    <>
                      <Heart className="text-gray-400 w-4 h-4" />
                      <span className="text-sm text-gray-500 font-medium">
                        Favourite
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main grid: left (gallery + details) and right (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Left / Center: gallery + details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="w-full h-[460px] bg-slate-200">
                <img
                  src={mainImage}
                  alt={`Main ${mainIndex}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-4 py-3 border-t">
                <div className="flex gap-3 overflow-x-auto">
                  {Array.isArray(propertyDetail?.images) &&
                  propertyDetail.images.length > 0 ? (
                    propertyDetail.images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setMainIndex(i)}
                        className={`flex-shrink-0 rounded-md overflow-hidden border ${
                          i === mainIndex
                            ? "ring-2 ring-amber-300"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={src.url || src} // sometimes API might just send a string URL
                          alt={`thumb-${i}`}
                          className="w-36 h-24 object-cover"
                        />
                      </button>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 px-4 py-2">
                      No images available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-3">
                  Property Description
                </h2>

                <p
                  className="prose max-w-none text-sm text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      propertyDetail?.description || ""
                    ),
                  }}
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-3">Other Info</h2>

                <p className=" text-sm text-slate-700 leading-relaxed">
                  {propertyDetail?.otherInfo}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                <h2 className="text-2xl font-semibold mb-6 text-green-900 border-b pb-3">
                  Overview
                </h2>

                <ul className="space-y-4">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="bg-green-50 p-3 rounded-full">
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">
                          {f.title}
                        </h3>
                        <p className="text-sm text-slate-500">{f.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* History & Neighborhood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-3">Property Details</h2>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>
                    <div className="text-xs text-slate-400">Property Type</div>
                    <div className="font-medium">
                      {propertyDetail?.property_type}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Home Type</div>
                    <div className="font-medium">
                      {propertyDetail?.homeType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Plot Size</div>
                    <div className="font-medium">
                      {propertyDetail?.plotArea}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Bedrooms</div>
                    <div className="font-medium">
                      {propertyDetail?.bedrooms}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Postal Code</div>
                    <div className="font-medium">
                      {propertyDetail?.location?.postalCode}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm text-slate-500 mb-2">Amenities</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {amenities.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Neighborhood</h2>
                <p className="text-sm text-slate-700 mb-4">
                  {property?.neighborhood?.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {property?.neighborhood?.highlights?.map((h, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                        <span className="text-lg">{h.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium">{h.title}</div>
                        <div className="text-xs text-slate-500">{h.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Tour Modal */}
          {openModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                  onClick={() => setOpenModal(false)}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
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

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex gap-4 items-center">
                <img
                  src={property?.agent?.avatar}
                  alt={property?.agent?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs text-slate-400">Listed By</div>
                  <div className="font-semibold">Grace Route Limited</div>
                  <div className="text-xs text-slate-500">
                    2 Julius Adelusi Street Guzape, Abuja
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Tour with a Grace Route Agent
                </h2>

                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  Schedule a Tour
                </button>
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="px-3 text-slate-500 text-sm font-medium">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="block w-full text-center py-3 rounded-lg bg-amber-600 text-white font-medium"
                >
                  Call Agent
                </a>
              </div>

              <div className="mt-6 text-sm text-slate-600 border-t pt-4">
                <div className="flex justify-between mb-2">
                  <div>Price</div>
                  <div className="font-semibold text-slate-900">
                    ₦{propertyDetail?.price?.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>MLS#</div>
                  <div className="text-slate-500">{propertyDetail?.userId}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-sm text-slate-500">
              Advertisement
            </div>
          </aside>
        </div>
        <h2 className="text-lg font-bold mb-10">
          Comparable Listings for {propertyDetail?.property_name}
        </h2>
        <ComparableListings property={comparableProperties} />
      </div>
    </div>
  );
}

export default PropertyDetails;
