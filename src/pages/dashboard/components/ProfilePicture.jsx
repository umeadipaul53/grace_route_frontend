import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadProfilePicture,
  replaceProfilePicture,
  removeProfilePicture,
} from "../../../reducers/userReducer";

const ProfilePicture = ({ onBack }) => {
  const dispatch = useDispatch();
  const { details, profileImage, isAuthenticated } = useSelector(
    (state) => state.user
  );

  // ✅ Use Redux profileImage directly (auto updates after upload)
  const currentImage = profileImage || details?.profileImage || null;

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef();

  // ✅ Reset progress & error whenever the image updates from Redux
  useEffect(() => {
    if (currentImage) {
      setUploading(false);
      setUploadProgress(0);
      setUploadError(null);
    }
  }, [currentImage]);

  // Trigger file selection
  const triggerFileSelect = () => fileInputRef.current.click();

  // Handles both upload and replace
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file); // must match backend field name

    setUploading(true);
    setUploadError(null);

    try {
      if (currentImage) {
        // Replace existing profile picture
        await dispatch(
          replaceProfilePicture(formData, {
            onUploadProgress: (e) =>
              setUploadProgress(Math.round((e.loaded * 100) / e.total)),
          })
        ).unwrap();
      } else {
        // Initial upload
        await dispatch(
          uploadProfilePicture(formData, {
            onUploadProgress: (e) =>
              setUploadProgress(Math.round((e.loaded * 100) / e.total)),
          })
        ).unwrap();
      }
    } catch (err) {
      console.error(err);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Remove picture
  const handleRemoveImage = async () => {
    try {
      setUploading(true);
      await dispatch(removeProfilePicture()).unwrap();
    } catch (err) {
      console.error(err);
      setUploadError("Failed to remove profile picture.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
      {/* Back Button */}
      <button onClick={onBack} className="mb-6 text-yellow-600">
        &larr; Back
      </button>

      {/* Header */}
      <h2 className="text-2xl font-semibold mb-2">
        {currentImage ? "Your Profile Picture" : "Upload Profile Picture"}
      </h2>
      <p className="text-gray-500 mb-8">
        {currentImage
          ? "You can preview, replace, or remove your profile picture below."
          : "Add a profile picture to personalize your profile."}
      </p>

      <div className="flex flex-col items-center">
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-yellow-600">
                {uploadProgress}%
              </span>
            </div>
            <p className="text-yellow-600 mt-2">Uploading...</p>
          </div>
        ) : currentImage ? (
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                key={currentImage}
                src={`${currentImage}?t=${Date.now()}`} // cache-buster
                alt="Profile"
                className="w-36 h-36 rounded-full mb-4 object-cover cursor-pointer"
                onClick={() => setShowPreview(true)}
              />
              <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <button
                  onClick={triggerFileSelect}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Replace
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-gray-100 rounded"
              >
                Preview
              </button>
              <button
                onClick={triggerFileSelect}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Replace
              </button>
              <button
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={triggerFileSelect}
            className="w-40 h-40 border-2 border-dashed border-yellow-400 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-50"
          >
            <i className="fa-solid fa-camera text-yellow-500 text-3xl mb-2"></i>
            Upload Picture
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      </div>

      {/* Modal Preview */}
      {showPreview && currentImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl p-4 md:p-6 w-[90%] max-w-md">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <img
              src={`${currentImage}?t=${Date.now()}`}
              alt="Preview"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
