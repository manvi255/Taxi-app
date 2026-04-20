// Predefined locations for the taxi booking app - Major cities across India
export const PREDEFINED_LOCATIONS = [
    // Delhi NCR
    { value: "Connaught Place, Delhi", label: "Connaught Place, Delhi", coords: { lat: 28.6315, lng: 77.2167 } },
    { value: "Karol Bagh, Delhi", label: "Karol Bagh, Delhi", coords: { lat: 28.6517, lng: 77.1892 } },
    { value: "Lajpat Nagar, Delhi", label: "Lajpat Nagar, Delhi", coords: { lat: 28.5783, lng: 77.2407 } },
    { value: "Rajouri Garden, Delhi", label: "Rajouri Garden, Delhi", coords: { lat: 28.6476, lng: 77.1235 } },
    { value: "Dwarka, Delhi", label: "Dwarka, Delhi", coords: { lat: 28.5823, lng: 77.0500 } },
    { value: "Rohini, Delhi", label: "Rohini, Delhi", coords: { lat: 28.7325, lng: 77.1198 } },
    { value: "Pitampura, Delhi", label: "Pitampura, Delhi", coords: { lat: 28.6891, lng: 77.1313 } },
    { value: "Shalimar Bagh, Delhi", label: "Shalimar Bagh, Delhi", coords: { lat: 28.7205, lng: 77.1628 } },

    // Gurgaon
    { value: "DLF Phase 1, Gurgaon", label: "DLF Phase 1, Gurgaon", coords: { lat: 28.4726, lng: 77.1036 } },
    { value: "DLF Phase 3, Gurgaon", label: "DLF Phase 3, Gurgaon", coords: { lat: 28.4939, lng: 77.0937 } },
    { value: "Sohna Road, Gurgaon", label: "Sohna Road, Gurgaon", coords: { lat: 28.4229, lng: 77.0401 } },
    { value: "MG Road, Gurgaon", label: "MG Road, Gurgaon", coords: { lat: 28.4796, lng: 77.0808 } },
    { value: "Cyber City, Gurgaon", label: "Cyber City, Gurgaon", coords: { lat: 28.4953, lng: 77.0887 } },

    // Noida
    { value: "Sector 18, Noida", label: "Sector 18, Noida", coords: { lat: 28.5700, lng: 77.3200 } },
    { value: "Sector 62, Noida", label: "Sector 62, Noida", coords: { lat: 28.6245, lng: 77.3646 } },
    { value: "Sector 125, Noida", label: "Sector 125, Noida", coords: { lat: 28.5440, lng: 77.3340 } },

    // Ghaziabad
    { value: "Indirapuram, Ghaziabad", label: "Indirapuram, Ghaziabad", coords: { lat: 28.6465, lng: 77.3697 } },
    { value: "Vaishali, Ghaziabad", label: "Vaishali, Ghaziabad", coords: { lat: 28.6450, lng: 77.3390 } },

    // Faridabad
    { value: "Sector 15, Faridabad", label: "Sector 15, Faridabad", coords: { lat: 28.4089, lng: 77.3094 } },
    { value: "Sector 21, Faridabad", label: "Sector 21, Faridabad", coords: { lat: 28.4250, lng: 77.3220 } },

    // Mumbai
    { value: "Colaba, Mumbai", label: "Colaba, Mumbai", coords: { lat: 18.9151, lng: 72.8258 } },
    { value: "Bandra, Mumbai", label: "Bandra, Mumbai", coords: { lat: 19.0544, lng: 72.8402 } },
    { value: "Andheri, Mumbai", label: "Andheri, Mumbai", coords: { lat: 19.1136, lng: 72.8697 } },
    { value: "Powai, Mumbai", label: "Powai, Mumbai", coords: { lat: 19.1176, lng: 72.9058 } },
    { value: "Thane, Mumbai", label: "Thane, Mumbai", coords: { lat: 19.2183, lng: 72.9781 } },
    { value: "Navi Mumbai", label: "Navi Mumbai", coords: { lat: 19.0330, lng: 73.0297 } },
    { value: "Marine Drive, Mumbai", label: "Marine Drive, Mumbai", coords: { lat: 18.9440, lng: 72.8230 } },
    { value: "Juhu, Mumbai", label: "Juhu, Mumbai", coords: { lat: 19.1075, lng: 72.8263 } },

    // Bangalore
    { value: "MG Road, Bangalore", label: "MG Road, Bangalore", coords: { lat: 12.9758, lng: 77.6033 } },
    { value: "Whitefield, Bangalore", label: "Whitefield, Bangalore", coords: { lat: 12.9698, lng: 77.7500 } },
    { value: "Koramangala, Bangalore", label: "Koramangala, Bangalore", coords: { lat: 12.9352, lng: 77.6245 } },
    { value: "HSR Layout, Bangalore", label: "HSR Layout, Bangalore", coords: { lat: 12.9081, lng: 77.6476 } },
    { value: "Electronic City, Bangalore", label: "Electronic City, Bangalore", coords: { lat: 12.8399, lng: 77.6770 } },
    { value: "Jayanagar, Bangalore", label: "Jayanagar, Bangalore", coords: { lat: 12.9299, lng: 77.5824 } },
    { value: "Indiranagar, Bangalore", label: "Indiranagar, Bangalore", coords: { lat: 12.9784, lng: 77.6408 } },
    { value: "Marathahalli, Bangalore", label: "Marathahalli, Bangalore", coords: { lat: 12.9591, lng: 77.6974 } },

    // Chennai
    { value: "T. Nagar, Chennai", label: "T. Nagar, Chennai", coords: { lat: 13.0418, lng: 80.2341 } },
    { value: "Adyar, Chennai", label: "Adyar, Chennai", coords: { lat: 13.0067, lng: 80.2575 } },
    { value: "Velachery, Chennai", label: "Velachery, Chennai", coords: { lat: 12.9758, lng: 80.2205 } },
    { value: "Anna Nagar, Chennai", label: "Anna Nagar, Chennai", coords: { lat: 13.0850, lng: 80.2101 } },
    { value: "Nungambakkam, Chennai", label: "Nungambakkam, Chennai", coords: { lat: 13.0604, lng: 80.2425 } },
    { value: "Tambaram, Chennai", label: "Tambaram, Chennai", coords: { lat: 12.9229, lng: 80.1271 } },
    { value: "OMR Road, Chennai", label: "OMR Road, Chennai", coords: { lat: 12.9800, lng: 80.2400 } },

    // Hyderabad
    { value: "Banjara Hills, Hyderabad", label: "Banjara Hills, Hyderabad", coords: { lat: 17.3850, lng: 78.4867 } },
    { value: "Jubilee Hills, Hyderabad", label: "Jubilee Hills, Hyderabad", coords: { lat: 17.4324, lng: 78.4078 } },
    { value: "Gachibowli, Hyderabad", label: "Gachibowli, Hyderabad", coords: { lat: 17.4400, lng: 78.3489 } },
    { value: "Hitech City, Hyderabad", label: "Hitech City, Hyderabad", coords: { lat: 17.4435, lng: 78.3772 } },
    { value: "Secunderabad", label: "Secunderabad", coords: { lat: 17.4399, lng: 78.4983 } },
    { value: "Kukatpally, Hyderabad", label: "Kukatpally, Hyderabad", coords: { lat: 17.4948, lng: 78.3996 } },
    { value: "Ameerpet, Hyderabad", label: "Ameerpet, Hyderabad", coords: { lat: 17.4375, lng: 78.4483 } },

    // Pune
    { value: "FC Road, Pune", label: "FC Road, Pune", coords: { lat: 18.5167, lng: 73.8567 } },
    { value: "Koregaon Park, Pune", label: "Koregaon Park, Pune", coords: { lat: 18.5362, lng: 73.8940 } },
    { value: "Viman Nagar, Pune", label: "Viman Nagar, Pune", coords: { lat: 18.5679, lng: 73.9143 } },
    { value: "Wakad, Pune", label: "Wakad, Pune", coords: { lat: 18.5994, lng: 73.7626 } },
    { value: "Hinjewadi, Pune", label: "Hinjewadi, Pune", coords: { lat: 18.5913, lng: 73.7389 } },
    { value: "Aundh, Pune", label: "Aundh, Pune", coords: { lat: 18.5607, lng: 73.8118 } },
    { value: "Kothrud, Pune", label: "Kothrud, Pune", coords: { lat: 18.5074, lng: 73.8077 } },

    // Kolkata
    { value: "Salt Lake, Kolkata", label: "Salt Lake, Kolkata", coords: { lat: 22.5726, lng: 88.3639 } },
    { value: "New Town, Kolkata", label: "New Town, Kolkata", coords: { lat: 22.5925, lng: 88.4842 } },
    { value: "Park Street, Kolkata", label: "Park Street, Kolkata", coords: { lat: 22.5550, lng: 88.3500 } },
    { value: "Camac Street, Kolkata", label: "Camac Street, Kolkata", coords: { lat: 22.5440, lng: 88.3500 } },
    { value: "Sector 5, Salt Lake", label: "Sector 5, Salt Lake", coords: { lat: 22.5760, lng: 88.4080 } },
    { value: "Howrah", label: "Howrah", coords: { lat: 22.5958, lng: 88.2636 } },

    // Ahmedabad
    { value: "Navrangpura, Ahmedabad", label: "Navrangpura, Ahmedabad", coords: { lat: 23.0301, lng: 72.5714 } },
    { value: "Satellite, Ahmedabad", label: "Satellite, Ahmedabad", coords: { lat: 23.0225, lng: 72.5714 } },
    { value: "Prahlad Nagar, Ahmedabad", label: "Prahlad Nagar, Ahmedabad", coords: { lat: 23.0120, lng: 72.5108 } },
    { value: "Bodakdev, Ahmedabad", label: "Bodakdev, Ahmedabad", coords: { lat: 23.0400, lng: 72.5108 } },
    { value: "SG Highway, Ahmedabad", label: "SG Highway, Ahmedabad", coords: { lat: 23.0750, lng: 72.5170 } },

    // Jaipur
    { value: "Malviya Nagar, Jaipur", label: "Malviya Nagar, Jaipur", coords: { lat: 26.8500, lng: 75.8000 } },
    { value: "Vaishali Nagar, Jaipur", label: "Vaishali Nagar, Jaipur", coords: { lat: 26.9124, lng: 75.7873 } },
    { value: "C-Scheme, Jaipur", label: "C-Scheme, Jaipur", coords: { lat: 26.9157, lng: 75.8100 } },
    { value: "Tonk Road, Jaipur", label: "Tonk Road, Jaipur", coords: { lat: 26.8940, lng: 75.8100 } },

    // Lucknow
    { value: "Hazratganj, Lucknow", label: "Hazratganj, Lucknow", coords: { lat: 26.8500, lng: 80.9462 } },
    { value: "Gomti Nagar, Lucknow", label: "Gomti Nagar, Lucknow", coords: { lat: 26.8587, lng: 81.0212 } },
    { value: "Alambagh, Lucknow", label: "Alambagh, Lucknow", coords: { lat: 26.8070, lng: 80.8790 } },
    { value: "Indira Nagar, Lucknow", label: "Indira Nagar, Lucknow", coords: { lat: 26.8606, lng: 80.9462 } },

    // Airports & Major Stations
    { value: "Indira Gandhi International Airport, Delhi", label: "IGI Airport, Delhi", coords: { lat: 28.5562, lng: 77.1000 } },
    { value: "Chhatrapati Shivaji Maharaj International Airport, Mumbai", label: "CSM Airport, Mumbai", coords: { lat: 19.0896, lng: 72.8656 } },
    { value: "Kempegowda International Airport, Bangalore", label: "KIA Airport, Bangalore", coords: { lat: 13.1986, lng: 77.7066 } },
    { value: "Chennai International Airport", label: "Chennai Airport", coords: { lat: 12.9941, lng: 80.1709 } },
    { value: "Rajiv Gandhi International Airport, Hyderabad", label: "RGIA Airport, Hyderabad", coords: { lat: 17.2403, lng: 78.4294 } },
    { value: "Pune International Airport", label: "Pune Airport", coords: { lat: 18.5793, lng: 73.9089 } },
    { value: "Netaji Subhas Chandra Bose International Airport, Kolkata", label: "NSCBIA Airport, Kolkata", coords: { lat: 22.6547, lng: 88.4467 } },
    { value: "Sardar Vallabhbhai Patel International Airport, Ahmedabad", label: "SVPIA Airport, Ahmedabad", coords: { lat: 23.0737, lng: 72.6269 } },

    // Railway Stations
    { value: "New Delhi Railway Station", label: "New Delhi Railway Station", coords: { lat: 28.6415, lng: 77.2196 } },
    { value: "Delhi Junction Railway Station", label: "Delhi Junction Railway Station", coords: { lat: 28.6600, lng: 77.2280 } },
    { value: "Mumbai CST", label: "Mumbai CST", coords: { lat: 18.9402, lng: 72.8347 } },
    { value: "Bangalore City Railway Station", label: "Bangalore City Railway Station", coords: { lat: 12.9777, lng: 77.5688 } },
    { value: "Chennai Central Railway Station", label: "Chennai Central Railway Station", coords: { lat: 13.0827, lng: 80.2750 } },
    { value: "Secunderabad Railway Station", label: "Secunderabad Railway Station", coords: { lat: 17.4330, lng: 78.5018 } },
    { value: "Howrah Railway Station", label: "Howrah Railway Station", coords: { lat: 22.5850, lng: 88.3464 } }
];

// Calculate estimated time based on distance (assuming average speed of 30 km/h in city traffic)
export const calculateEstimatedTime = (distanceKm) => {
    if (!distanceKm || distanceKm <= 0) return 0;

    // Average speed in city traffic: 30 km/h
    const averageSpeedKmh = 30;

    // Calculate time in hours
    const timeHours = distanceKm / averageSpeedKmh;

    // Convert to minutes
    const timeMinutes = Math.round(timeHours * 60);

    return timeMinutes;
};

// Format time for display
export const formatEstimatedTime = (minutes) => {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }
};