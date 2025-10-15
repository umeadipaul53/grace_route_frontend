import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Home } from "lucide-react";
import { useToast } from "../../../toastContext/useToast";

import { searchProperty, buyProperty } from "../../../reducers/userReducer";
import {
  getFavourites,
  toggleFavourite,
} from "../../../reducers/favouriteReducer";

/* ✅ Property Card Component */
const PropertyCard = ({ property, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { items: favourites, loading: favLoading } = useSelector(
    (state) => state.favourites || {}
  );

  const [isBuying, setIsBuying] = useState(false);

  /* ✅ Fetch favourites only when user logs in */
  useEffect(() => {
    if (user?._id) dispatch(getFavourites());
  }, [dispatch, user?._id]);

  /* ✅ Check if property is a favourite */
  const isFavourite =
    Array.isArray(favourites) &&
    favourites.some((fav) => fav._id === property._id);

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

  return (
    <Link
      to={`/property-details/${property._id}`}
      key={property._id}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      {/* ✅ Image */}
      <div className="relative">
        <img
          src={property?.images?.[0]?.url}
          alt={property?.property_name || "Property image"}
          className="w-full h-56 sm:h-64 md:h-72 object-cover"
        />

        {/* ✅ Favourite Button */}
        {user && (
          <button
            onClick={(e) => handleFavourite(e, property._id)}
            disabled={favLoading}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-1.5 rounded-full shadow"
          >
            {isFavourite ? (
              <Heart className="text-red-500 fill-red-500" size={20} />
            ) : (
              <Heart className="text-gray-400" size={20} />
            )}
          </button>
        )}
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

        {/* ✅ Tags & Buy Button */}
        <div className="flex flex-wrap gap-2 mt-3 items-center">
          <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
            {property.property_type}
          </span>

          <button
            className={
              "px-3 py-1 text-xs rounded-full font-medium text-white transition bg-green-700 hover:bg-green-800 "
            }
            onClick={(e) => handleBuyProperty(e, property._id)}
            disabled={isBuying}
          >
            {isBuying ? "Buying..." : "Buy Now"}
          </button>
        </div>

        {/* ✅ Details */}
        <div className="flex flex-wrap justify-between items-center mt-4 text-xs sm:text-sm text-gray-700 gap-y-1">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.unitsNumber} Units</span>
          <span>Plot size: {property.plotArea} sqm</span>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Listed by Grace Route Limited
        </p>
      </div>
    </Link>
  );
};

/* ✅ Property Listing Component */
const PropertyListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, propertyData, loading } = useSelector((state) => state.user);

  const [isLoaded, setIsLoaded] = useState(false);

  /* ✅ Fetch properties only once on mount */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        await dispatch(
          searchProperty({ limit: 6, status: "available" })
        ).unwrap();
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchProperties();
  }, [dispatch]);

  /* ✅ Handle loading and empty states */
  if (!isLoaded && loading)
    return <p className="text-center py-10">Loading properties...</p>;
  if (!loading && (!propertyData || propertyData.length === 0))
    return <p className="text-center py-10">No properties found.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-8 text-center sm:text-left">
        Featured Properties
      </h2>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {propertyData.map((property) => (
          <PropertyCard key={property._id} property={property} user={user} />
        ))}
      </div>

      {/* ✅ "See More" Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/property-listing")}
          type="button"
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Home size={18} />
          See More
        </button>
      </div>
    </section>
  );
};

export default PropertyListing;
