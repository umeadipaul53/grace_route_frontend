import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="custom-btn">
      {text}
    </button>
  );
};

export default Button;
