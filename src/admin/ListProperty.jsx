import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { adminListProperty } from "../reducers/propertyReducer";
import { useToast } from "../toastContext/useToast";
import { useNavigate } from "react-router-dom";

// ✅ Local Nigerian states & cities (simplified list)
const NIGERIA_STATES = [
  {
    state: "Lagos",
    cities: ["Ikeja", "Lekki", "Epe", "Ikorodu", "Badagry"],
  },
  {
    state: "Abuja",
    cities: ["Garki", "Maitama", "Wuse", "Asokoro"],
  },
  {
    state: "Rivers",
    cities: ["Port Harcourt", "Obio-Akpor", "Bonny", "Omoku"],
  },
  {
    state: "Anambra",
    cities: ["Awka", "Onitsha", "Nnewi", "Ekwulobia"],
  },
];

const ListProperty = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ✅ Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [home, setHome] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [units, setUnits] = useState("");
  const [description, setDescription] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [location, setLocation] = useState({
    state: "",
    city: "",
    postalCode: "",
  });

  // ✅ Handle image uploads (fixed)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file, // Actual File object for FormData
      preview: URL.createObjectURL(file), // Preview URL
    }));

    setImages((prev) => [...prev, ...previews]);
  };

  // ✅ Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // ✅ Handle form submit (fixed)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !type || !home || !bedrooms || !plotArea) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    if (images.length === 0) {
      showToast("Please upload at least one image.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("property_name", title);
    formData.append("property_type", type);
    formData.append("price", price);
    formData.append("homeType", home);
    formData.append("bedrooms", bedrooms);
    formData.append("plotArea", plotArea);
    formData.append("unitsNumber", units);
    formData.append("description", description);
    formData.append("otherInfo", otherInfo);
    formData.append("location", JSON.stringify(location));

    // ✅ Append actual File objects to FormData
    images.forEach(
      (img) => img.file && formData.append("propertyImages", img.file)
    );

    try {
      setIsUploading(true);
      const result = await dispatch(adminListProperty(formData)).unwrap();
      showToast(result.message, "success");

      // Reset form
      setTitle("");
      setPrice("");
      setType("");
      setHome("");
      setBedrooms("");
      setPlotArea("");
      setUnits("");
      setOtherInfo("");
      setDescription("");
      setImages([]);
      setLocation({ state: "", city: "", postalCode: "" });

      setTimeout(() => {
        navigate("/admin/listing-orders");
      }, 1500);
    } catch (err) {
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Listing property failed",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ State dropdown logic
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setLocation({ state: selectedState, city: "", postalCode: "" });
  };

  const selectedStateData = NIGERIA_STATES.find(
    (item) => item.state === location.state
  );

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">List a Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Name */}
        <div>
          <label className="block text-sm font-medium">Property Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Modern 3-Bedroom Duplex"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium">Property Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="">Select property type</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
          </select>
        </div>

        {/* Home Type */}
        <div>
          <label className="block text-sm font-medium">Home Type</label>
          <select
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="">Select home type</option>
            <option value="Duplex">Duplex</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Detached Duplex">Detached Duplex</option>
            <option value="Terraced Duplex">Terraced Duplex</option>
            <option value="Block of Flats">Block of Flats</option>
            <option value="Mini Flat">Mini Flat</option>
            <option value="Self-contained">Self-contained</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium">Bedrooms</label>
          <input
            type="text"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            placeholder="e.g., 2 Beds, 3 Beds"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Plot Area */}
        <div>
          <label className="block text-sm font-medium">Plot Area (sqft)</label>
          <input
            type="text"
            value={plotArea}
            onChange={(e) => setPlotArea(e.target.value)}
            placeholder="e.g., 750 sqm"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Units */}
        <div>
          <label className="block text-sm font-medium">Number of Units</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="e.g., 2"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 25000000"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">State</label>
            <select
              value={location.state}
              onChange={handleStateChange}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select state</option>
              {NIGERIA_STATES.map((s, i) => (
                <option key={i} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <select
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
              disabled={!selectedStateData}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select city</option>
              {selectedStateData &&
                selectedStateData.cities.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Postal Code</label>
            <input
              type="text"
              value={location.postalCode}
              onChange={(e) =>
                setLocation({ ...location, postalCode: e.target.value })
              }
              placeholder="e.g., 100001"
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <span>You can select multiple images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />

          {/* ✅ Fixed image preview rendering */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, idx) => {
                const previewSrc = img?.preview || "";
                const fileName = img?.file?.name || `image-${idx}`;

                return (
                  <div key={idx} className="relative group">
                    <img
                      src={previewSrc}
                      alt={fileName}
                      className="rounded-lg object-cover w-full h-32"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Write a detailed property description..."
            className="mt-1 bg-white"
          />
        </div>

        {/* Other Info */}
        <div>
          <label className="block text-sm font-medium">Other Info</label>
          <textarea
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            placeholder="Any extra details..."
            className="mt-1 block w-full p-2 border rounded-md"
            rows="3"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 ${
            isUploading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Uploading..." : "List Property"}
        </button>
      </form>
    </div>
  );
};

export default ListProperty;
