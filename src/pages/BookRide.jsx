import { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import Select from "../components/Select";
import AutocompleteInput from "../components/AutocompleteInput";
import Button from "../components/Button";
import Card from "../components/Card";
import MapComponent from "../components/MapComponent";
import Toast from "../components/Toast";
import { geocodeAddress, searchLocations, calculateDistance, calculateFare, reverseGeocode } from "../utils/mapUtils";
import { calculateEstimatedTime, formatEstimatedTime } from "../utils/locations";

function BookRide() {
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropCoords, setDropCoords] = useState(null);
    const [fare, setFare] = useState(0);
    const [distance, setDistance] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [vehicle, setVehicle] = useState("Mini");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [mapMode, setMapMode] = useState(null); // 'pickup' or 'drop'

    // Handle pickup location typing
    const handlePickupChange = (value) => {
        setPickup(value);
        setPickupCoords(null);
    };

    // Handle drop location typing
    const handleDropChange = (value) => {
        setDrop(value);
        setDropCoords(null);
    };

    const handlePickupSelect = (option) => {
        setPickup(option.label || option.value);
        if (option.coords) {
            setPickupCoords(option.coords);
        }
    };

    const handleDropSelect = (option) => {
        setDrop(option.label || option.value);
        if (option.coords) {
            setDropCoords(option.coords);
        }
    };

    const handlePickupBlur = async () => {
        if (pickup && !pickupCoords) {
            const result = await geocodeAddress(pickup);
            if (result) {
                setPickupCoords({ lat: result.lat, lng: result.lng });
                setPickup(result.display_name || pickup);
            }
        }
    };

    const handleDropBlur = async () => {
        if (drop && !dropCoords) {
            const result = await geocodeAddress(drop);
            if (result) {
                setDropCoords({ lat: result.lat, lng: result.lng });
                setDrop(result.display_name || drop);
            }
        }
    };

    // Calculate distance, fare, and estimated time when coordinates change
    useEffect(() => {
        if (pickupCoords && dropCoords) {
            const dist = calculateDistance(pickupCoords, dropCoords);
            setDistance(dist);
            const calculatedFare = calculateFare(dist, vehicle);
            setFare(calculatedFare);
            const estTime = calculateEstimatedTime(dist);
            setEstimatedTime(estTime);
        } else {
            setDistance(0);
            setFare(0);
            setEstimatedTime(0);
        }
    }, [pickupCoords, dropCoords, vehicle]);

    // Unified Map Click Handler
    const handleMapClick = async (coords) => {
        if (!coords) return;

        const target = mapMode || 'pickup';
        if (target === 'pickup') setPickupCoords(coords);
        else setDropCoords(coords);

        const address = await reverseGeocode(coords.lat, coords.lng);

        if (target === 'pickup') setPickup(address);
        else setDrop(address);

        setMapMode(null); // Reset mode after selection
    };

    const handleBookRide = async () => {
        let resolvedPickupCoords = pickupCoords;
        let resolvedDropCoords = dropCoords;

        if (pickup && !resolvedPickupCoords) {
            const pickupResult = await geocodeAddress(pickup);
            if (pickupResult) {
                resolvedPickupCoords = { lat: pickupResult.lat, lng: pickupResult.lng };
                setPickupCoords(resolvedPickupCoords);
                setPickup(pickupResult.display_name || pickup);
            }
        }

        if (drop && !resolvedDropCoords) {
            const dropResult = await geocodeAddress(drop);
            if (dropResult) {
                resolvedDropCoords = { lat: dropResult.lat, lng: dropResult.lng };
                setDropCoords(resolvedDropCoords);
                setDrop(dropResult.display_name || drop);
            }
        }

        if (!pickup || !drop || !resolvedPickupCoords || !resolvedDropCoords) {
            setToast({ message: "Please select both pickup and drop locations", type: "error" });
            return;
        }

        const dist = calculateDistance(resolvedPickupCoords, resolvedDropCoords);
        if (dist === 0) {
            setToast({ message: "Unable to calculate distance. Please check locations.", type: "error" });
            return;
        }

        setDistance(dist);
        const calculatedFare = calculateFare(dist, vehicle);
        setFare(calculatedFare);
        const estTime = calculateEstimatedTime(dist);
        setEstimatedTime(estTime);

        try {
            setLoading(true);
            await addDoc(collection(db, "rides"), {
                pickup,
                drop,
                pickupCoords: resolvedPickupCoords,
                dropCoords: resolvedDropCoords,
                vehicle,
                fare: calculatedFare,
                distance: dist.toFixed(2),
                status: "pending",
                userId: auth.currentUser.uid,
                createdAt: new Date().toISOString()
            });

            setToast({ message: "Ride Booked Successfully! 🚖", type: "success" });

            // Reset form
            setPickup("");
            setDrop("");
            setPickupCoords(null);
            setDropCoords(null);
            setFare(0);
            setDistance(0);
            setEstimatedTime(0);
            setVehicle("Mini");
        } catch (error) {
            setToast({ message: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Booking Form */}
                <div className="w-full xl:w-1/2 space-y-6">
                    <Card className="p-8">
                        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
                            Book Your Ride 🚕
                        </h1>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="pickup" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Pickup Location
                                </label>
                                <AutocompleteInput
                                    id="pickup"
                                    placeholder="Type to search pickup location"
                                    value={pickup}
                                    onChange={handlePickupChange}
                                    onSelect={handlePickupSelect}
                                    fetchOptions={searchLocations}
                                    onBlur={handlePickupBlur}
                                />
                            </div>

                            <div>
                                <label htmlFor="drop" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Drop Location
                                </label>
                                <AutocompleteInput
                                    id="drop"
                                    placeholder="Type to search drop location"
                                    value={drop}
                                    onChange={handleDropChange}
                                    onSelect={handleDropSelect}
                                    fetchOptions={searchLocations}
                                    onBlur={handleDropBlur}
                                />
                            </div>

                            <div>
                                <label htmlFor="vehicle" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Select Vehicle
                                </label>
                                <Select
                                    id="vehicle"
                                    value={vehicle}
                                    onChange={(e) => setVehicle(e.target.value)}
                                >
                                    <option value="Mini">Mini - ₹50 base fare</option>
                                    <option value="Sedan">Sedan - ₹90 base fare</option>
                                    <option value="SUV">SUV - ₹130 base fare</option>
                                </Select>
                            </div>

                            {/* Distance, Time and Fare Display */}
                            {distance > 0 && (
                                <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 border border-blue-200 dark:border-blue-700">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
                                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                {distance.toFixed(1)} km
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Est. Time</p>
                                            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                                {formatEstimatedTime(estimatedTime)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Fare</p>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                ₹{fare}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <Button
                                onClick={handleBookRide}
                                className="w-full"
                                disabled={loading || !pickup || !drop}
                            >
                                {loading ? "Booking..." : "Confirm Booking"}
                            </Button>
                        </div>
                    </Card>

                    {/* Map Controls */}
                    <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Map Selection</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {mapMode ? `Click on the map to set ${mapMode} location...` : "Choose a button below then click the map."}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                onClick={() => setMapMode('pickup')}
                                variant={mapMode === 'pickup' ? 'filled' : 'outline'}
                                size="sm"
                            >
                                Set Pickup on Map
                            </Button>
                            <Button
                                onClick={() => setMapMode('drop')}
                                variant={mapMode === 'drop' ? 'filled' : 'outline'}
                                size="sm"
                            >
                                Set Drop on Map
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Interactive Map */}
                <div className="w-full xl:w-1/2">
                    <Card className="p-4 h-[600px]">
                        <h3 className="text-lg font-semibold mb-4">Select Locations on Map</h3>
                        <div className="h-full rounded-lg overflow-hidden">
                            <MapComponent
                                pickupCoords={pickupCoords}
                                dropCoords={dropCoords}
                                pickupAddress={pickup}
                                dropAddress={drop}
                                onMapClick={handleMapClick}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BookRide;