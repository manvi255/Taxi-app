import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import StatsCard from "../components/StatsCard";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRides = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const q = query(
                    collection(db, "rides"),
                    where("userId", "==", currentUser.uid)
                );
                const snapshot = await getDocs(q);
                const rideList = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));
                setRides(rideList);
            } catch (error) {
                console.error("Error fetching rides:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, [currentUser]);

    const totalRides = rides.length;
    const pendingRides = rides.filter((ride) => ride.status === "pending").length;
    const completedRides = rides.filter((ride) => ride.status === "completed").length;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Welcome Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome back, {currentUser?.email?.split('@')[0] || "User"}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Book your next ride in seconds, track your journey, and manage your account with ease.
                </p>
            </div>

            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatsCard
                    title="Total Rides"
                    value={totalRides}
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                    color="blue"
                />
                <StatsCard
                    title="Pending Rides"
                    value={pendingRides}
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    color="yellow"
                />
                <StatsCard
                    title="Completed Rides"
                    value={completedRides}
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    color="green"
                />
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Book Ride */}
                    <Link to="/book">
                        <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Book a Ride</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Schedule your next journey</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Book a taxi instantly and reach your destination quickly and safely.
                            </p>
                        </Card>
                    </Link>

                    {/* Ride History */}
                    <Link to="/history">
                        <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ride History</h3>
                                    <p className="text-gray-600 dark:text-gray-400">View past journeys</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Review your completed rides, fares, and journey details.
                            </p>
                        </Card>
                    </Link>

                    {/* Profile */}
                    <Link to="/profile">
                        <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Manage your account</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Update your personal information and account settings.
                            </p>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            {rides.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            {rides.slice(0, 3).map((ride) => (
                                <div key={ride.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${ride.status === 'completed' ? 'bg-green-500' :
                                            ride.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}></div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {ride.pickup?.split(',')[0]} → {ride.drop?.split(',')[0]}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {ride.vehicle} • {new Date(ride.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 dark:text-white">₹{ride.fare}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{ride.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <Link to="/history">
                                <Button variant="outline">View All Rides</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            )}

            {/* Account Actions */}
            <div className="mt-12 text-center">
                <Button onClick={logout} variant="outline" type="secondary">
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default Dashboard;