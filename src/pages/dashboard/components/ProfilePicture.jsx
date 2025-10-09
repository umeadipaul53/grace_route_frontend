import React, { useState } from "react";
import axios from "axios";

const ProfilePicture = ({ onBack }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Replace this with your backend endpoint
  const API_URL = "https://your-api-domain.com/api/upload-profile";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadError(null);

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      // Assuming backend returns: { imageUrl: "https://..." }
      const imageUrl = response.data?.imageUrl || URL.createObjectURL(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleReplaceImage = () => {
    document.getElementById("profile-upload").click();
  };

  const handleRemoveImage = () => {
    // Optional: send delete request to API to remove from server
    setProfileImage(null);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 text-yellow-600 hover:text-yellow-700 flex items-center gap-2 text-sm font-medium"
      >
        <i className="fa-solid fa-arrow-left"></i> Back to Account Settings
      </button>

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {profileImage ? "Your Profile Picture" : "Upload Profile Picture"}
      </h2>
      <p className="text-gray-500 mb-8">
        {profileImage
          ? "You can preview, replace, or remove your profile picture below."
          : "Add a profile picture so others can recognize you easily."}
      </p>

      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center">
        {uploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-yellow-600">
                {uploadProgress}%
              </span>
            </div>
            <p className="text-yellow-600 font-medium">Uploading...</p>
          </div>
        ) : profileImage ? (
          <>
            <div className="relative group">
              <img
                src={profileImage}
                alt="Profile"
                onClick={() => setShowPreview(true)}
                className="w-36 h-36 rounded-full border-4 border-yellow-500 object-cover shadow-lg cursor-pointer transition-all duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <button
                  onClick={handleReplaceImage}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition"
                >
                  Replace Picture
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={() => setShowPreview(true)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                <i className="fa-solid fa-eye mr-2"></i> Preview
              </button>
              <button
                onClick={handleReplaceImage}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition font-medium"
              >
                <i className="fa-solid fa-pen mr-2"></i> Replace
              </button>
              <button
                onClick={handleRemoveImage}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
              >
                <i className="fa-solid fa-trash mr-2"></i> Remove
              </button>
            </div>
          </>
        ) : (
          <label
            htmlFor="profile-upload"
            className="w-40 h-40 border-2 border-dashed border-yellow-400 rounded-full flex flex-col items-center justify-center text-center cursor-pointer hover:bg-yellow-50 transition"
          >
            <i className="fa-solid fa-camera text-yellow-500 text-3xl mb-2"></i>
            <span className="text-sm text-gray-600 font-medium">
              Upload Picture
            </span>
          </label>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* Upload Error */}
        {uploadError && (
          <p className="text-red-500 text-sm mt-4 font-medium">{uploadError}</p>
        )}
      </div>

      {/* Modal Preview */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-xl p-4 md:p-6 w-[90%] max-w-md">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <img
              src={profileImage}
              alt="Profile Preview"
              className="w-full h-auto rounded-xl object-cover shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
