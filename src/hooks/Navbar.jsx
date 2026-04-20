import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Navbar() {
    const { currentUser, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Book Ride", path: "/book" },
        { name: "Ride History", path: "/history" },
        { name: "Profile", path: "/profile" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md dark:shadow-lg transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/dashboard" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    TaxiGo 🚕
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {currentUser && navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                    {currentUser && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 font-medium"
                        >
                            Logout
                        </button>
                    )}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.582a1 1 0 01-1.398.037l-2.393-2.466a1 1 0 01.037-1.398l2.466-2.393a1 1 0 011.398-.037l-2.393 2.466a1 1 0 01-.037 1.398l2.393 2.466zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM3 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zM17 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zM6.293 6.293a1 1 0 011.414 0l1 1a1 1 0 01-1.414 1.414l-1-1a1 1 0 010-1.414zM14.707 14.707a1 1 0 010-1.414l1-1a1 1 0 011.414 1.414l-1 1a1 1 0 01-1.414 0zM14.707 5.293a1 1 0 01-1.414 0l-1-1a1 1 0 011.414-1.414l1 1a1 1 0 010 1.414zM6.293 14.707a1 1 0 010 1.414l-1 1a1 1 0 01-1.414-1.414l1-1a1 1 0 011.414 0z"></path></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 mr-2"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.582a1 1 0 01-1.398.037l-2.393-2.466a1 1 0 01.037-1.398l2.466-2.393a1 1 0 011.398-.037l-2.393 2.466a1 1 0 01-.037 1.398l2.393 2.466zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM3 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zM17 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zM6.293 6.293a1 1 0 011.414 0l1 1a1 1 0 01-1.414 1.414l-1-1a1 1 0 010-1.414zM14.707 14.707a1 1 0 010-1.414l1-1a1 1 0 011.414 1.414l-1 1a1 1 0 01-1.414 0zM14.707 5.293a1 1 0 01-1.414 0l-1-1a1 1 0 011.414-1.414l1 1a1 1 0 010 1.414zM6.293 14.707a1 1 0 010 1.414l-1 1a1 1 0 01-1.414-1.414l1-1a1 1 0 011.414 0z"></path></svg>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 dark:text-gray-200 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && currentUser && (
                <div className="md:hidden bg-white dark:bg-gray-800 shadow-md pb-4">
                    <div className="flex flex-col items-center space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-3/4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;