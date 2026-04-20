import { useState, useEffect } from "react";

function useDarkMode() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize dark mode from localStorage or system preference
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        // Persist dark mode state to localStorage
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return [darkMode, setDarkMode];
}

export default useDarkMode;