/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const DonorDashboard = () => {
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        bloodType: "O+",
        lastDonationDate: "2024-09-15",
        donationHistory: [
            {
                date: "2024-03-20",
                location: "Mansoura Emergency Hospital",
                status: "Completed",
            },
            {
                date: "2024-06-15",
                location: "Red Crescent Center",
                status: "Completed",
            },
            {
                date: "2024-09-10",
                location: "National Blood Bank",
                status: "Completed",
            },
        ],
    });
    const [nextDonationDate, setNextDonationDate] = useState("");

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("userData");
                const response = await axios.get(
                    "https://server-e-commerce-seven.vercel.app/api/donors/me", // TO DO Replace with your API endpoint //
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserData(response.data);
                calculateNextDonation(response.data.lastDonationDate);
            } catch (err) {
                console.error("Error fetching user data", err);
                calculateNextDonation(userData.lastDonationDate);               // Use placeholder if API fails
            }
        };
        fetchUserData();
    }, []);

    const calculateNextDonation = (lastDate) => {
        if (!lastDate) return setNextDonationDate("You can donate now!");
        const nextDate = new Date(lastDate);
        nextDate.setMonth(nextDate.getMonth() + 3);                             // Assuming 3-month gap for donations
        setNextDonationDate(nextDate.toLocaleDateString());
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-red-600">Welcome, {userData.name}!</h1>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => alert("Feature coming soon!")}
                >
                    AI Insights
                </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Info Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Your Profile</h2>
                    
                    <div className="flex flex-row items-center text-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-gray-700">
                                Welcome {userData.name}
                            </h2>
                            <p className="text-gray-600 border rounded-md p-2 mt-1">
                                <strong>Email:</strong> {userData.email}
                            </p>
                            <p className="text-gray-600 border rounded-md p-2 mt-1">
                                <strong>Phone:</strong> {userData.phone}
                            </p>
                            <p className="text-gray-600 border rounded-md p-2 mt-1">
                                <strong>Blood Type:</strong> {userData.bloodType}
                            </p>
                            <p className="text-gray-600 border rounded-md p-2 mt-1">
                                <strong>Next Eligible Donation:</strong> {nextDonationDate || "Calculating..."}
                            </p>
                        </div>
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                    </div>
                    
                    
                </div>

                {/* Upcoming Donation Reminder */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Upcoming Donation</h2>
                    <p className="text-gray-600">
                        You are eligible to donate blood again on{" "}
                        <span className="font-bold text-red-600">{nextDonationDate || "Calculating..."}</span>.
                    </p>
                    <button
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        onClick={() => alert("Book your next donation!")}
                    >
                        Book Donation Slot
                    </button>
                </div>

                {/* Donation History */}
                <div className="bg-white shadow-md rounded-lg p-6 col-span-1 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Donation History</h2>
                    {userData.donationHistory.length > 0 ? (
                        <ul className="space-y-4">
                            {userData.donationHistory.map((donation, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-700">
                                            <strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-500">
                                            <strong>Location:</strong> {donation.location}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            donation.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {donation.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No donation history available.</p>
                    )}
                </div>

                {/* Placeholder for Future AI Features */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Future Insights</h2>
                    <p className="text-gray-600">
                        Here, you'll see advanced analytics powered by AI, like blood compatibility,
                        donor trends, and more!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
