import React from "react";

const AccountInfo = ({ onBack }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <button
        onClick={onBack}
        className="mb-4 text-yellow-600 hover:text-yellow-700 flex items-center gap-2"
      >
        <i className="fa-solid fa-arrow-left"></i> Back to Account Settings
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        My Contact Info
      </h2>
      <p className="text-gray-600 text-sm">
        Here you can update your email address, phone number, and other personal
        details.
      </p>
    </div>
  );
};

export default AccountInfo;
