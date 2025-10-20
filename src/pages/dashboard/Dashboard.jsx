import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountInfo from "./components/AccountInfo";
import ProfilePicture from "./components/ProfilePicture";
import AccountSettings from "./components/AccountSettings";
import MyGoals from "./components/MyGoals";
import MyFavorites from "./components/MyFavorites";
import BuyOrder from "./components/BuyOrder";
import ListedProperties from "./components/ListedProperties";
import ListAProperty from "./components/ListAProperty";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "account";
  };

  const [activeTab, setActiveTab] = useState(getTabFromURL());

  useEffect(() => {
    const tab = getTabFromURL();
    setActiveTab(tab);
  }, [location.search]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate(`?tab=${tabId}`);
  };

  const tabs = [
    { id: "account", label: "Account Settings" },
    { id: "goals", label: "My Goals" },
    { id: "favorites", label: "My Favorites" },
    { id: "buy", label: "Buy Orders" },
    { id: "sell", label: "My Listed Properties" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings onCardClick={handleTabClick} />;
      case "accountInfo":
        return <AccountInfo onBack={() => handleTabClick("account")} />;
      case "profile":
        return <ProfilePicture onBack={() => handleTabClick("account")} />;
      case "goals":
        return <MyGoals />;
      case "favorites":
        return <MyFavorites />;
      case "buy":
        return <BuyOrder />;
      case "sell":
        return <ListedProperties onCardClick={handleTabClick} />;
      case "list":
        return <ListAProperty />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Tabs visible on Desktop only */}
      <div className="border-b border-gray-200 hidden md:flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors duration-300 ${
              activeTab === tab.id
                ? "border-yellow-500 text-yellow-600"
                : "border-transparent text-gray-500 hover:text-yellow-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="mt-8">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
