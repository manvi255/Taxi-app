import React from "react";

function EmptyState({ message = "No data found.", icon }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}

export default EmptyState;