import React from "react";
import Card from "./Card";

const AccountSettings = ({ onCardClick }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Account Settings
      </h2>

      <Card
        icon="fa-user"
        title="Profile Picture"
        desc="Upload, view, or update your profile picture."
        onClick={() => onCardClick("profile")}
      />

      <Card
        icon="fa-user"
        title="My Contact Info"
        desc="View, edit, or update your contact information and sign-in preferences."
        onClick={() => onCardClick("accountInfo")}
      />
    </div>
  );
};

export default AccountSettings;
