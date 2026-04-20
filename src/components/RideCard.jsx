import React from "react";
import Button from "./Button";
import Card from "./Card";

function RideCard({ ride, onCancel }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
            case "cancelled":
                return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
            case "pending":
            default:
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
        }
    };

    return (
        <Card className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {ride.pickup} <span className="text-blue-500 dark:text-blue-400">→</span> {ride.drop}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Vehicle:</span> {ride.vehicle || "Mini"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Fare:</span> ₹{ride.fare || 0}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {ride.createdAt || "No date"}
                </p>
            </div>
            <div className="flex flex-col items-end space-y-3">
                <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        ride.status
                    )}`}
                >
                    {ride.status}
                </span>
                {ride.status === "pending" && (
                    <Button type="danger" onClick={() => onCancel(ride.id)} className="text-sm">Cancel Ride</Button>
                )}
            </div>
        </Card>
    );
}

export default RideCard;