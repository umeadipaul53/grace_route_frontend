import React from "react";

const Heading = ({
  text,
  className = "",
  lineColors = ["from-yellow-500 via-amber-600 to-yellow-500", "bg-yellow-500"],
  sizes = "text-3xl md:text-4xl",
}) => {
  return (
    <h2
      className={`relative ${sizes} font-bold text-gray-900 dark:text-green-950 text-center ${className}`}
    >
      {text}
      {/* Long gradient underline */}
      <span
        className={`block w-24 mx-auto mt-3 h-1 bg-gradient-to-r ${lineColors[0]} rounded-full`}
      ></span>
      {/* Short solid underline */}
      <span
        className={`block w-12 mx-auto mt-1 h-1 ${lineColors[1]} rounded-full`}
      ></span>
    </h2>
  );
};

export default Heading;
