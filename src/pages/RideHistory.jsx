import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import RideCard from "../components/RideCard";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

function RideHistory() {
    const { currentUser } = useAuth();
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

    const cancelRide = async (id) => {
        await deleteDoc(doc(db, "rides", id));
        setRides(rides.filter((ride) => ride.id !== id));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10">
                Ride History
            </h1>

            <div className="max-w-4xl mx-auto space-y-5">
                {rides.length === 0 ? (
                    <EmptyState message="You haven't booked any rides yet." icon="📜" />
                ) : (
                    rides.map((ride) => <RideCard key={ride.id} ride={ride} onCancel={cancelRide} />)
                )}
            </div>
        </div>
    );
}

export default RideHistory;