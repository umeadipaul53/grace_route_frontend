import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../reducers/newsReducer";
import { useToast } from "../toastContext/useToast";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const { loading } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ✅ Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
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

    if (!title || !content || !source) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    if (images.length === 0) {
      showToast("Please upload at least one image.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("source", source);
    // ✅ Append actual File objects to FormData
    images.forEach(
      (img) => img.file && formData.append("newsImages", img.file)
    );

    try {
      const result = await dispatch(createNews(formData)).unwrap();
      showToast(result.message, "success");

      // Reset form
      setTitle("");
      setContent("");
      setSource("");
      setImages([]);

      setTimeout(() => {
        navigate("/admin/manage-news");
      }, 1500);
    } catch (err) {
      showToast(
        typeof err === "string" ? err : err?.message || "Creating news failed",
        "error"
      );
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create a News</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* News Title */}
        <div>
          <label className="block text-sm font-medium">News Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="enter your news title"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* News Source */}
        <div>
          <label className="block text-sm font-medium">News Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="ex Guardian news paper"
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">
            Select an image for your news
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
          <label className="block text-sm font-medium">News Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your news content here..."
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
          {loading ? "Creating news..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
