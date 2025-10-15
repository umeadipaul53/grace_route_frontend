import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";
import { buyProperty } from "../reducers/userReducer";
import { getFavourites, toggleFavourite } from "../reducers/favouriteReducer";

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
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition">
      <div className="relative">
        <Link to={`/property-details/${property._id}`}>
          <img
            src={property?.images?.[0]?.url}
            alt={property?.images?.[0]?.public_id || "Property image"}
            className="w-full h-70 object-cover"
          />
        </Link>

        {user && (
          <button
            type="button"
            onClick={(e) => handleFavourite(e, property._id)}
            disabled={favLoading}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full shadow"
          >
            {isFavourite ? (
              <Heart className="text-red-500 fill-red-500" />
            ) : (
              <Heart className="text-gray-400" />
            )}
          </button>
        )}
      </div>

      <div className="p-5">
        <p className="mt-3 text-lg font-semibold text-gray-400 tracking-tight capitalize font-serif">
          {property.property_name}
        </p>
        <h3 className="text-xl font-bold text-gray-900">
          ₦{property.price?.toLocaleString()}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {property.location?.city}, {property.location?.state}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
            {property.property_type}
          </span>

          <button
            type="button"
            className={
              "px-3 py-1 text-xs rounded-full font-medium text-white transition bg-green-700 hover:bg-green-800 "
            }
            onClick={(e) => handleBuyProperty(e, property._id)}
            disabled={isBuying}
          >
            {isBuying ? "Buying..." : "Buy Now"}
          </button>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <span>{property.bedrooms} </span>
          <span>{property.unitsNumber} Units</span>
          <span>Plot size: {property.plotArea}</span>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Listed by Grace Route Limited
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
