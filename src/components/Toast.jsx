import React, { useEffect } from 'react';

function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  const colors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <div className={`${colors[type]} text-white p-4 rounded-lg shadow-lg fixed bottom-4 right-4 z-50 flex items-center justify-between min-w-[300px] max-w-md`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Toast;