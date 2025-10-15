import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyLocations, searchProperty } from "../reducers/userReducer";
import { getFavourites, toggleFavourite } from "../reducers/favouriteReducer";
import { useToast } from "../toastContext/useToast";
import PropertyCard from "./PropertyCard"; // adjust path if your folder is different

const PropertyListing = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const {
    locations = [],
    loading,
    error,
    propertyData = [],
    pagination,
    user,
  } = useSelector((state) => state.user);

  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });
  const [homeType, setHomeType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getFavourites());
    }
  }, [dispatch, user]);

  // stable ref for toast so we don't have to include showToast in deps
  const toastRef = useRef(showToast);
  useEffect(() => {
    toastRef.current = showToast;
  }, [showToast]);

  // optional: dedupe toasts for the same message
  const lastToastRef = useRef("");

  // Fetch locations once
  useEffect(() => {
    dispatch(findPropertyLocations());
  }, [dispatch]);

  // Initial fetch: always set initialFetchDone in finally so loading won't be stuck
  useEffect(() => {
    let cancelled = false;

    const fetchInitial = async () => {
      try {
        await dispatch(
          searchProperty({
            status: "available",
            page: currentPage,
          })
        ).unwrap();
      } catch (err) {
        console.error("Initial fetch error:", err);
        const msg = err?.message || "Failed to load properties";
        if (lastToastRef.current !== msg) {
          lastToastRef.current = msg;
          // small delay so it doesn't race with render
          setTimeout(() => toastRef.current(msg, "error"), 50);
        }
      } finally {
        if (!cancelled) setInitialFetchDone(true);
      }
    };

    fetchInitial();

    return () => {
      cancelled = true;
    };
  }, [dispatch, currentPage]);

  // Filtered fetch AFTER initial load
  useEffect(() => {
    if (!initialFetchDone) return;

    const filtersActive =
      selectedLocation ||
      homeType ||
      propertyType ||
      priceRange.min > 0 ||
      priceRange.max < 100000000;

    const timeout = setTimeout(async () => {
      try {
        if (!filtersActive) {
          await dispatch(
            searchProperty({
              status: "available",
              page: currentPage,
            })
          ).unwrap();
        } else {
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
        }
      } catch (err) {
        console.error("Filtered fetch error:", err);
        const msg = err?.message || "Failed to load properties";
        if (lastToastRef.current !== msg) {
          lastToastRef.current = msg;
          setTimeout(() => toastRef.current(msg, "error"), 50);
        }
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [
    initialFetchDone,
    dispatch,
    selectedLocation,
    homeType,
    propertyType,
    priceRange,
    currentPage,
  ]);

  // ✅ Normalize city list
  const allCities = Array.isArray(locations) ? locations.filter(Boolean) : [];

  const handleSelectCity = (city) => {
    setSelectedLocation(city);
    setQuery("");
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  if (loading)
    return <p className="text-center py-10">Loading properties...</p>;
  if (!loading && (!propertyData || propertyData.length === 0))
    return <p className="text-center py-10">No properties found.</p>;

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
                <option value="">Home Type</option>
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

              <div className="relative w-full mt-2 h-6 flex items-center">
                <div className="absolute h-1 w-full bg-gray-200 rounded-full"></div>
                <div
                  className="absolute h-1 bg-blue-500 rounded-full"
                  style={{
                    left: `${(priceRange.min / 100000000) * 100}%`,
                    right: `${100 - (priceRange.max / 100000000) * 100}%`,
                  }}
                ></div>

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
                />

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
                <option value="" disabled>
                  Property Type
                </option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🏠 Property Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {propertyData.map((property) => (
            <PropertyCard key={property._id} property={property} user={user} />
          ))}
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

export default PropertyListing;
