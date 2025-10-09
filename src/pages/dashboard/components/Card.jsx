import React from "react";

const Card = ({ icon, title, desc, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center bg-white p-5 rounded-lg shadow mb-4 cursor-pointer hover:bg-yellow-50 transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">{title}</h3>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
      <i className="fa-solid fa-chevron-right text-yellow-600"></i>
    </div>
  );
};

export default Card;
