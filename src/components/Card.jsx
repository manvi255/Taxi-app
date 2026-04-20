import React from "react";

function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;