import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

function Profile() {
    const { currentUser, loading, logout } = useAuth();
    const [userStats, setUserStats] = useState({
        totalRides: 0,
        completedRides: 0,
        pendingRides: 0,
        totalSpent: 0,
        recentRides: []
    });
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            fetchUserStats();
        }
    }, [currentUser]);

    const fetchUserStats = async () => {
        try {
            const ridesRef = collection(db, "rides");
            const q = query(ridesRef, where("userId", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);

            let totalRides = 0;
            let completedRides = 0;
            let pendingRides = 0;
            let totalSpent = 0;
            const recentRides = [];

            querySnapshot.forEach((doc) => {
                const ride = { id: doc.id, ...doc.data() };
                totalRides++;
                totalSpent += ride.fare || 0;

                if (ride.status === "completed") {
                    completedRides++;
                } else if (ride.status === "pending") {
                    pendingRides++;
                }

                recentRides.push(ride);
            });

            // Sort recent rides by creation date and take last 3
            recentRides.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const recentThree = recentRides.slice(0, 3);

            setUserStats({
                totalRides,
                completedRides,
                pendingRides,
                totalSpent,
                recentRides: recentThree
            });
        } catch (error) {
            console.error("Error fetching user stats:", error);
        } finally {
            setStatsLoading(false);
        }
    };

    const getInitials = (email) => {
        return email.split('@')[0].substring(0, 2).toUpperCase();
    };

    if (loading || statsLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account and view your ride history</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                                    {getInitials(currentUser?.email || 'U')}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                {currentUser?.email?.split('@')[0] || 'User'}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Member since {new Date(currentUser?.metadata?.creationTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long'
                                })}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</span>
                                <span className="text-sm text-gray-900 dark:text-white">{currentUser?.email}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">User ID</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                                    {currentUser?.uid?.substring(0, 8)}...
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</span>
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Active</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <Button
                                onClick={logout}
                                variant="outline"
                                className="w-full"
                                type="secondary"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Statistics and Activity */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Statistics */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {userStats.totalRides}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Rides</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {userStats.completedRides}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {userStats.pendingRides}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    ₹{userStats.totalSpent}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
                            </div>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                            <Link to="/history">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>

                        {userStats.recentRides.length > 0 ? (
                            <div className="space-y-3">
                                {userStats.recentRides.map((ride) => (
                                    <div key={ride.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-2 h-2 rounded-full ${ride.status === 'completed' ? 'bg-green-500' :
                                                    ride.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {ride.pickup?.split(',')[0]} → {ride.drop?.split(',')[0]}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {ride.vehicle} • {ride.distance ? `${ride.distance} km` : ''} • {new Date(ride.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                                ₹{ride.fare}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                                {ride.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 dark:text-gray-500 mb-2">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mb-2">No rides yet</p>
                                <Link to="/book">
                                    <Button size="sm">Book Your First Ride</Button>
                                </Link>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Profile;