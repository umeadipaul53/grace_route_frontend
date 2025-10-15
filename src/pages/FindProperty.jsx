import React, { useState, useEffect } from "react";
import { Search, Heart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyLocations, searchProperty } from "../reducers/userReducer";
import { useToast } from "../toastContext/useToast";
import { useNavigate } from "react-router-dom";

const FindProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    locations = [],
    loading,
    error,
    propertyData = [],
    pagination,
  } = useSelector((state) => state.user);

  // UI States
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });
  const [homeType, setHomeType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Which thumb is currently being dragged: 'min' | 'max' | null
  const [activeThumb, setActiveThumb] = useState(null);

  // Fetch locations on mount
  useEffect(() => {
    dispatch(findPropertyLocations());
  }, [dispatch]);

  // Auto-fetch properties whenever filters or pagination change
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        await dispatch(
          searchProperty({
            status: "available",
            city: selectedLocation || "",
            homeType,
            propertyType,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            page: currentPage,
          })
        ).unwrap();
      } catch (err) {
        console.error("Error fetching properties:", err);
        showToast("Failed to load properties", "error");
      }
    }, 400); // debounce

    return () => clearTimeout(timeout);
  }, [
    dispatch,
    selectedLocation,
    homeType,
    propertyType,
    priceRange,
    currentPage,
    showToast,
  ]);

  // Extract all city/state combos for search suggestions
  const allCities = Array.isArray(locations?.cityList)
    ? locations.cityList.filter(Boolean)
    : [];

  const handleSelectCity = (city) => {
    setSelectedLocation(city);
    setQuery("");
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  // Handlers to set active thumb for pointer events (works for mouse & touch)
  const handleThumbPointerDown = (which) => (e) => {
    e.preventDefault && e.preventDefault();
    setActiveThumb(which);
    // attach listeners to clear on pointer up anywhere
    const clear = () => {
      setActiveThumb(null);
      window.removeEventListener("pointerup", clear);
      window.removeEventListener("mouseup", clear);
      window.removeEventListener("touchend", clear);
    };
    window.addEventListener("pointerup", clear);
    window.addEventListener("mouseup", clear);
    window.addEventListener("touchend", clear);
  };

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* 🔍 Search & Filters */}
        <div className="sticky top-0 bg-white z-30 border-b shadow-sm pb-4 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4 border rounded-lg shadow-sm p-2">
            <div className="flex items-center gap-3">
              {selectedLocation ? (
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                  <span>{selectedLocation}</span>
                  <button
                    onClick={() => setSelectedLocation("")}
                    className="hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Search by city"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none w-full"
                />
              )}
              <button
                onClick={() => handleSelectCity(query)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            {/* Dropdown Suggestions */}
            {showSuggestions && query && !selectedLocation && (
              <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-2 shadow-md z-40 max-h-48 overflow-y-auto">
                {loading && (
                  <li className="px-4 py-2 text-gray-500">Loading...</li>
                )}
                {error && (
                  <li className="px-4 py-2 text-red-500">
                    Failed to load locations
                  </li>
                )}
                {!loading &&
                  !error &&
                  allCities
                    .filter((c) =>
                      c.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((city, i) => (
                      <li
                        key={i}
                        onClick={() => handleSelectCity(city)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                      >
                        {city}
                      </li>
                    ))}
              </ul>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 w-full">
            {/* Home Type */}
            <div className="w-full md:w-1/3">
              <select
                className="border rounded-md px-4 py-2 text-gray-700 w-full"
                value={homeType}
                onChange={(e) => {
                  setHomeType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="" disabled>
                  Home Type
                </option>
                <option value="Duplex">Duplex</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Detached Duplex">Detached Duplex</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-4 border rounded-md px-3 py-2 w-full md:w-1/3">
              <span className="text-gray-500 text-sm font-medium">
                Price Range
              </span>

              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>₦ {priceRange.min.toLocaleString()}</span>
                <span>—</span>
                <span>₦ {priceRange.max.toLocaleString()}</span>
              </div>

              {/* ✅ Dual range slider */}
              {/* ✅ Dual range slider */}
              <div className="relative w-full mt-2 h-6 flex items-center">
                {/* Track background */}
                <div className="absolute h-1 w-full bg-gray-200 rounded-full"></div>

                {/* Blue fill between min and max */}
                <div
                  className="absolute h-1 bg-blue-500 rounded-full"
                  style={{
                    left: `${(priceRange.min / 100000000) * 100}%`,
                    right: `${100 - (priceRange.max / 100000000) * 100}%`,
                  }}
                ></div>

                {/* ✅ Min slider */}
                <input
                  type="range"
                  min="0"
                  max="100000000"
                  step="1000000"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: Math.min(Number(e.target.value), prev.max - 1000000),
                    }))
                  }
                  className="absolute w-full appearance-none bg-transparent pointer-events-auto z-30"
                  style={{
                    zIndex: priceRange.min > 100000000 - 1000000 ? 5 : 10,
                  }}
                />

                {/* ✅ Max slider */}
                <input
                  type="range"
                  min="0"
                  max="100000000"
                  step="1000000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Math.max(Number(e.target.value), prev.min + 1000000),
                    }))
                  }
                  className="absolute w-full appearance-none bg-transparent pointer-events-auto z-20"
                />

                {/* Thumb styling */}
                <style>{`
                  input[type="range"] {
                    -webkit-appearance: none;
                    height: 1px;
                  }
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #2563eb;
                    cursor: pointer;
                    position: relative;
                    z-index: 5;
                    box-shadow: 0 0 0 3px #fff, 0 0 0 6px rgba(37, 99, 235, 0.3);
                  }
                  input[type="range"]::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #2563eb;
                    cursor: pointer;
                    border: none;
                  }
                `}</style>
              </div>
            </div>

            {/* Property Type */}
            <div className="w-full md:w-1/3">
              <select
                className="border rounded-md px-4 py-2 text-gray-700 w-full"
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Property Type</option>
                <option>Land</option>
                <option>Commercial</option>
                <option>Residential</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🏠 Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center text-gray-500 mt-10">Loading...</p>
          ) : propertyData.length > 0 ? (
            propertyData.map((property) => (
              <div
                key={property._id}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={property?.images?.[0]?.url}
                    alt="Property"
                    className="w-full h-52 object-cover"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full shadow">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    New Listing
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    ₦{property.price?.toLocaleString()}
                  </h3>
                  <p className="text-gray-800 text-sm">{property.address}</p>
                  <div className="flex text-gray-600 text-sm gap-4 mt-2">
                    <p>{property.beds} Beds</p>
                    <p>{property.baths} Baths</p>
                    <p>{property.area}</p>
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t mt-3">
                    Listing by Grace Route Limited
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm mt-10">
              No properties match your filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border rounded-md ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 border rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, pagination.totalPages))
              }
              disabled={currentPage === pagination.totalPages}
              className={`px-3 py-1.5 border rounded-md ${
                currentPage === pagination.totalPages
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FindProperty;
