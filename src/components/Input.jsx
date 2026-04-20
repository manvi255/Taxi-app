import React from "react";

function Input({ className = "", ...props }) {
    return (
        <input
            className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${className}`}
            {...props}
        />
    );
}

export default Input;