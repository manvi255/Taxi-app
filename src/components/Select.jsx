import React from "react";

function Select({ className = "", ...props }) {
  return (
    <select
      className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none cursor-pointer ${className}`}
      {...props}
    />
  );
}

export default Select;