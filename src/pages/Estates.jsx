import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEstates } from "../reducers/estateReducer";
import { MapPin, Layers } from "lucide-react";
import HeroSection from "../components/HeroSection";

const Estates = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.estate);

  useEffect(() => {
    dispatch(getEstates());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading estates...</p>
    );
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  if (!items?.length)
    return <p className="text-center py-10 text-gray-500">No estates found.</p>;

  return (
    <section className=" bg-gray-50">
      <HeroSection
        title="ESTATES"
        sub_title="Invest Smart. "
        highlight=" Live Better."
        quote="Land is the only asset that never depreciates — start building generational wealth today."
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Available Estates
        </h2>

        <div className="space-y-6">
          {items?.map((estate) => (
            <EstateRow key={estate?._id} estate={estate} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EstateRow = ({ estate }) => {
  const {
    name,
    pricePerPlot,
    plotSize,
    location,
    images,
    description,
    features,
    documents,
  } = estate;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col md:flex-row items-stretch">
      {/* Image section */}
      <div className="md:w-1/2 w-full bg-gray-100 flex items-center justify-center">
        <img
          src={images?.[0]?.url}
          alt={images?.[0]?.public_id}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Details section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin size={16} className="mr-2 text-blue-600" />
            {location?.city}, {location?.state}
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Layers size={16} className="mr-2 text-blue-600" />
            {plotSize}
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <span className="mr-2 text-blue-600 font-bold text-lg">₦</span>
            <span className="text-blue-600 font-semibold ml-1">
              {pricePerPlot?.toLocaleString()} per {plotSize}
            </span>
          </div>
          <div className="mt-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Key Features:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {features && features.length > 0 ? (
                features.map((feature, index) => <li key={index}>{feature}</li>)
              ) : (
                <li className="text-gray-400 italic">No features listed</li>
              )}
            </ul>
          </div>
          <div className="mt-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Land Title available:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {documents && documents.length > 0 ? (
                documents.map((document, index) => (
                  <li key={index}>{document}</li>
                ))
              ) : (
                <li className="text-gray-400 italic">No document listed</li>
              )}
            </ul>
          </div>
          <div
            className="col-span-3 text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Estates;
