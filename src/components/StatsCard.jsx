import React from "react";
import Card from "./Card";

function StatsCard({ title, value, icon, color = "blue" }) {
    const colorClasses = {
        blue: {
            bg: "bg-blue-100 dark:bg-blue-900",
            text: "text-blue-600 dark:text-blue-400"
        },
        yellow: {
            bg: "bg-yellow-100 dark:bg-yellow-900",
            text: "text-yellow-600 dark:text-yellow-400"
        },
        green: {
            bg: "bg-green-100 dark:bg-green-900",
            text: "text-green-600 dark:text-green-400"
        },
        purple: {
            bg: "bg-purple-100 dark:bg-purple-900",
            text: "text-purple-600 dark:text-purple-400"
        }
    };

    return (
        <Card className="p-6">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${colorClasses[color].bg}`}>
                    <div className={`w-8 h-8 ${colorClasses[color].text}`}>
                        {icon}
                    </div>
                </div>
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
                </div>
            </div>
        </Card>
    );
}

export default StatsCard;