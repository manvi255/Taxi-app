import React from "react";

function Button({
    children,
    onClick,
    type = "primary",
    variant = "filled",
    size = "md",
    className = "",
    disabled = false,
    ...props
}) {
    const baseStyle = "font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const variantStyles = {
        filled: {
            primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
            secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500",
            danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
        },
        outline: {
            primary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 focus:ring-blue-500",
            secondary: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500",
            danger: "border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 focus:ring-red-400",
        }
    };

    const styles = variantStyles[variant]?.[type] || variantStyles.filled.primary;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${sizeStyles[size]} ${styles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;