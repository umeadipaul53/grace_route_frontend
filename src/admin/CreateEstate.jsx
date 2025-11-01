import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createEstate } from "../reducers/estateReducer";
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
    cities: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Mgbakwu"],
  },
];

const CreateEstate = () => {
  const { loading, error } = useSelector((state) => state.estate);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ✅ Form states
  const [name, setName] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [pricePerPlot, setPricePerPlot] = useState("");
  const [location, setLocation] = useState({
    city: "",
    state: "",
  });
  const [features, setFeatures] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

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

    if (
      !name ||
      !plotSize ||
      !pricePerPlot ||
      !description ||
      features.length === 0 ||
      documents.length === 0
    ) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    if (images.length === 0) {
      showToast("Please upload at least one image.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("plotSize", plotSize);
    formData.append("pricePerPlot", pricePerPlot);
    formData.append("location", JSON.stringify(location));
    formData.append("features", JSON.stringify(features));
    formData.append("documents", JSON.stringify(documents));
    formData.append("description", description);
    // ✅ Append actual File objects to FormData
    images.forEach(
      (img) => img.file && formData.append("estateImages", img.file)
    );

    try {
      const result = await dispatch(createEstate(formData)).unwrap();
      showToast(result.message, "success");

      // Reset form
      setName("");
      setPlotSize("");
      setPricePerPlot("");
      setLocation({
        city: "",
        state: "",
      });
      setFeatures([]);
      setDocuments([]);
      setDescription("");
      setImages([]);

      setTimeout(() => {
        navigate("/admin/estate");
      }, 1500);
    } catch (err) {
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Creating estate failed",
        "error"
      );
    }
  };

  // ✅ State dropdown logic
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setLocation({ state: selectedState, city: "" });
  };

  const selectedStateData = NIGERIA_STATES.find(
    (item) => item.state === location.state
  );

  const allFeatures = [
    "Good Road Network",
    "Electricity",
    "Clean Water",
    "Perimeter fencing",
    "Recreational Area",
    "Street Lights",
    "Gate House",
  ];

  const allDocuments = [
    "C of O",
    "Irrevocable Power of Attomey",
    "Registered Survey Plan",
    "Deed of Conveyance",
  ];

  const handleFeatureChange = (feature) => {
    setFeatures(
      (prev) =>
        prev.includes(feature)
          ? prev.filter((f) => f !== feature) // Remove if unchecked
          : [...prev, feature] // Add if checked
    );
  };

  const handleDocumentsChange = (document) => {
    setDocuments(
      (prev) =>
        prev.includes(document)
          ? prev.filter((f) => f !== document) // Remove if unchecked
          : [...prev, document] // Add if checked
    );
  };

  if (error) {
    console.log(error);
  }

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create Estate</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Estate Title */}
        <div>
          <label className="block text-sm font-medium">Estate Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter estate name"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Number of Plots */}
        <div>
          <label className="block text-sm font-medium">
            Individual PlotSize
          </label>
          <input
            type="text"
            value={plotSize}
            onChange={(e) => setPlotSize(e.target.value)}
            placeholder="ex 500 Sqm"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Price Per Plot */}
        <div>
          <label className="block text-sm font-medium">
            Price per plot (₦)
          </label>
          <input
            type="number"
            value={pricePerPlot}
            onChange={(e) => setPricePerPlot(e.target.value)}
            placeholder="ex 20000000"
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
        </div>

        {/* ---------- Features ---------- */}
        <div>
          <label className="block text-sm font-medium mb-2">Features</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allFeatures.map((feature) => (
              <label
                key={feature}
                className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md border cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                />
                {feature}
              </label>
            ))}
          </div>
          {/* Show selected features */}
          {features.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Selected: {features.join(", ")}
            </div>
          )}
        </div>

        {/* ---------- Documents ---------- */}
        <div>
          <label className="block text-sm font-medium mb-2">Documents</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allDocuments.map((document) => (
              <label
                key={document}
                className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md border cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={documents.includes(document)}
                  onChange={() => handleDocumentsChange(document)}
                />
                {document}
              </label>
            ))}
          </div>
          {/* Show selected documents */}
          {documents.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Selected: {documents.join(", ")}
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">
            Select an image for your estate
          </label>
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
          <label className="block text-sm font-medium">
            Estate Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Estate description..."
            className="mt-1 bg-white h-25"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-10 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Creating estate..." : "Create Estate"}
        </button>
      </form>
    </div>
  );
};

export default CreateEstate;
