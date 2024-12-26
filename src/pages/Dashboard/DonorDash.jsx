/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {LineChart,PieChart,Pie,Line,Cell,Tooltip,ResponsiveContainer } from "recharts";
import {FaBell,FaCalendarAlt,FaUserAlt,FaTint,FaMoon,FaSun} from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BookingModal from "../../components/BookingModal";
import Notification from "../../components/Notification";
import AiModal from "../../components/AiModal";

import Cookies from "js-cookie";

const DonorDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [donorNotifications, setDonorNotifications] = useState([]);
    const [nextDonationDate, setNextDonationDate] = useState("");
    const [daysUntilNextDonation, setDaysUntilNextDonation] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

    const donationTrends = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        data: [2, 3, 1, 5, 4],
    };

    const chartData = donationTrends.labels.map((label, index) => ({
        month: label,
        donations: donationTrends.data[index],
    }));

    const bloodHealthData = {
        hemoglobin: "13.5 g/dL",
        ironLevels: "Normal",
        plateletsCount: "250,000/µL",
        cholesterol: "180 mg/dL",
    };

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            setIsLoading(true);
            // https://bfserver.vercel.app/api/auth/user 
            const response = await fetch("https://bfserver.vercel.app/api/auth/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                },
            });
            
            const apiData = await response.json();
            
            if (apiData) {
                setUserData(apiData);
                setDonorNotifications(apiData.notifications || []);
                calculateNextDonation(apiData.lastDonationDate);
            }
        } catch (err) {
            console.error("Error fetching user data", err);
        } finally {
            setIsLoading(false);
        }
        };
        fetchUserData();
    }, []);
    
    
    const calculateNextDonation = (lastDate) => {
        if (!lastDate) {
            setNextDonationDate("You can donate now!");
            setDaysUntilNextDonation(0);
            return;
        }
        const nextDate = new Date(lastDate);
        nextDate.setMonth(nextDate.getMonth() + 3);
        const today = new Date();
        const daysLeft = Math.ceil((nextDate - today) / (1000 * 3600 * 24));

        setDaysUntilNextDonation(daysLeft);
        setNextDonationDate(
        daysLeft > 0
            ? `You can donate Next in ${daysLeft} days from now`
            : "You can donate now!"
        );
    };

    const toggleNotifications = () => setShowNotifications(!showNotifications);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleMarkNotificationAsRead = (index) => {
        const updatedNotifications = [...donorNotifications];
        updatedNotifications[index].read = true;
        setDonorNotifications(updatedNotifications);
    };

    const handleConfirmBooking = (bookingDetails) => {
        alert(
            `Your donation is booked on ${bookingDetails.date} at ${bookingDetails.hospital}`
        ); 
        setShowBookingModal(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
            <AiOutlineLoading className="animate-spin text-red-600 text-5xl" />
            </div>
        );
    }

    if (!userData) {
        return (
            <p className="text-center mt-10 text-lg">
            Unable to load data. Please try again later.
            </p>
        );
    }

    return (
        <div className={`min-h-screen p-6 mt-16 mb-24 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-red-50 to-gray-100 text-gray-800"}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-8 ">
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text p-2">
                    Welcome, {userData.name || "Donor"}!
                </h1>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="relative">
                        <FaBell
                            className="text-xl text-gray-600 cursor-pointer hover:text-red-600 transition duration-200 ease-in-out"
                            onClick={toggleNotifications}
                            aria-label="Notifications"
                            title="View Notifications"
                        />
                        {donorNotifications.some((notif) => !notif.read) && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
                        )}
                        {showNotifications && (
                            <Notification
                                notifications={donorNotifications}
                                onMarkAsRead={handleMarkNotificationAsRead}
                                onDismiss={() => setShowNotifications(false)}
                            />
                        )}
                    </div>
                    <FaMoon
                        onClick={toggleDarkMode}
                        className={`cursor-pointer text-xl text-gray-600 hover:text-red-600 transition duration-200 ease-in-out ${darkMode ? "hidden" : "block"}`}
                        aria-label="Toggle Dark Mode"
                        title="Enable Dark Mode"
                    />
                    <FaSun
                        onClick={toggleDarkMode}
                        className={`cursor-pointer text-xl text-gray-600 hover:text-red-600 transition duration-200 ease-in-out ${darkMode ? "block" : "hidden"}`}
                        aria-label="Toggle Light Mode"
                        title="Enable Light Mode"
                    />
                    <img
                        src={userData.avatar || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-red-600"
                    />
                </div>

            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* User Info */}
                <div className="bg-white shadow-lg rounded-xl p-6 col-span-1">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Your Info</h2>
                    <p className="text-gray-600"><span className="font-semibold ">Blood Type:</span>  {userData?.bloodType || "Unknown"}</p>
                    <p className="text-gray-600"><span className="font-semibold ">Phone:</span>         {userData.phone}</p>
                    <p className="text-gray-600"><span className="font-semibold ">Email:</span>         {userData.email}</p>
                    <p className="text-gray-600"><span className="font-semibold ">Donor Level:</span>   {userData.donorLevel}</p>
                    <p className="text-gray-600"><span className="font-semibold ">Points:</span>        {userData.points}</p>
                    
                    <p className="text-gray-600">
                        Next Donation:{" "}
                        <span className="font-bold text-red-600">{nextDonationDate}</span>
                    </p>
                    <button
                        className="mt-3 w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        onClick={() => setShowBookingModal(true)}
                    >
                        Book a Donation
                    </button>
                </div>

                {/* Blood Health Info */}
                <div className="bg-white shadow-lg rounded-xl p-6 col-span-1">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Your Blood Health</h2>
                    
                    {Object.entries(bloodHealthData).map(([key, value]) => (
                        <p key={key} className="text-gray-600 capitalize m-1">
                        {key}: {value}
                        </p>
                    ))}
                    
                    <button
                        className="mt-11 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => setShowAiModal(true)}
                    >
                        AI Health Insights
                    </button>
                </div>
                
                {/* Donation History */}
                <div className="bg-white shadow-lg rounded-xl p-6 col-span-1">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">
                        Donation History
                    </h2>
                    <ul className="space-y-4">
                        {userData.donationHistory.length > 0 ? (
                        userData.donationHistory.map((donation, index) => (
                            <li
                            key={index}
                            className="flex justify-between items-center border-b pb-2"
                            >
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                Date: {new Date(donation.date).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-600">Location: {donation.location}</p>
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
                        ))
                        ) : (
                        <p className="text-sm text-gray-600">No donation history available.</p>
                        )}
                    </ul>
                </div>

                {/* Donation Trends */}
                <div className="bg-white shadow-lg rounded-xl p-6 col-span-2 mt-6">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Donation Trends</h2>
                    <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="donations" stroke="#FF8042" />
                        <Tooltip />
                    </LineChart>
                    </ResponsiveContainer>
                </div>

                
                
                {/* Donation Breakdown */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-lg font-bold text-gray-700">Donation Breakdown</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={[
                                    { name: "O+", value: 50 },
                                    { name: "A+", value: 30 },
                                    { name: "B+", value: 15 },
                                    { name: "AB+", value: 5 },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {COLORS.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                

                
                
                
            </div>
            
            {/* Booking Modal */}
            {showBookingModal && (
                <BookingModal onClose={() => setShowBookingModal(false)} onConfirm={handleConfirmBooking} />
            )}
            
            {/* AI Modal */}
            {showAiModal && (
                <AiModal onClose={() => setShowAiModal(false)} />
            )}

        </div>
    );
};

export default DonorDashboard;
