import { useState, useRef, useEffect } from "react";

function AutocompleteInput({
    id,
    placeholder,
    value,
    onChange,
    options = [],
    fetchOptions,
    onSelect,
    className = "",
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const fetchTimeout = useRef(null);

    useEffect(() => {
        if (fetchOptions) {
            if (!value || value.trim().length < 2) {
                setFilteredOptions([]);
                setIsOpen(false);
                setLoading(false);
                return;
            }

            setLoading(true);
            setIsOpen(true);
            clearTimeout(fetchTimeout.current);
            fetchTimeout.current = setTimeout(async () => {
                const result = await fetchOptions(value);
                setFilteredOptions(result || []);
                setIsOpen(Array.isArray(result) && result.length > 0);
                setLoading(false);
            }, 250);

            return () => clearTimeout(fetchTimeout.current);
        } else if (value) {
            // Fallback to local filtering if no fetchOptions provided
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setIsOpen(filtered.length > 0);
        } else {
            setIsOpen(false);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        if (newValue.trim().length >= 2) {
            setIsOpen(true);
        }
    };

    const handleOptionSelect = (option) => {
        // Use the full label for the input display
        onChange(option.label || option.value);
        if (onSelect) {
            onSelect(option);
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${className}`}
                {...props}
            />

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                    {loading ? (
                        <div className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">Searching...</div>
                    ) : filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                            >
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {option.value}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AutocompleteInput;
