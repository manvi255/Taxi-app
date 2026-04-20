// Geocoding utility using OpenStreetMap Nominatim API (free)
// Now using Photon (Komoot) API for better performance and browser compatibility
import { PREDEFINED_LOCATIONS } from './locations.js';

export const geocodeAddress = async (address) => {
    try {
        const response = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`
        );
        const data = await response.json();

        if (data && data.features && data.features.length > 0) {
            const feature = data.features[0];
            const displayName = [
                feature.properties.name,
                feature.properties.city,
                feature.properties.state
            ].filter(Boolean).join(', ');

            return {
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0],
                display_name: displayName || address
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding API error:', error);
        return null;
    }
};

// Search locations using Photon API with fallback to predefined locations
export const searchLocations = async (query) => {
    if (!query || query.trim().length < 2) {
        return [];
    }

    try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();

        return data.features.map(feature => ({
            label: [
                feature.properties.name,
                feature.properties.city,
                feature.properties.state
            ].filter(Boolean).join(', '),
            value: feature.properties.name,
            coords: {
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0]
            }
        }));
    } catch (error) {
        console.error('Search API error, falling back to local data:', error);
        const queryLower = query.toLowerCase();
        return PREDEFINED_LOCATIONS.filter(location =>
            location.label.toLowerCase().includes(queryLower)
        ).slice(0, 5);
    }
};

// Reverse geocoding utility using OpenStreetMap Nominatim API
export const reverseGeocode = async (lat, lng) => {
    try {
        // Removed forbidden User-Agent header which causes fetch to fail in browsers
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();

        if (data && data.display_name) {
            return data.display_name;
        }
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
};

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(coord2.lat - coord1.lat);
    const dLon = toRadians(coord2.lng - coord1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Distance in kilometers
};

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

// Calculate fare based on distance and vehicle type
export const calculateFare = (distance, vehicleType) => {
    if (!distance || distance <= 0) return 0;

    // Base fare
    let baseFare = 50; // Base fare in rupees

    // Distance fare: ₹12 per km for first 5km, ₹10 per km thereafter
    let distanceFare = 0;
    if (distance <= 5) {
        distanceFare = distance * 12;
    } else {
        distanceFare = (5 * 12) + ((distance - 5) * 10);
    }

    // Vehicle surcharge
    let vehicleSurcharge = 0;
    switch (vehicleType) {
        case 'Sedan':
            vehicleSurcharge = 40;
            break;
        case 'SUV':
            vehicleSurcharge = 80;
            break;
        default: // Mini
            vehicleSurcharge = 0;
    }

    // Time-based charges (assuming 30 minutes average)
    const timeFare = 30; // ₹30 for time

    // Total fare
    const totalFare = baseFare + distanceFare + vehicleSurcharge + timeFare;

    return Math.round(totalFare);
};