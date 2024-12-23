/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FaBell } from "react-icons/fa";
import BookingModal from "../../components/BookingModal";
import Notification from "../../components/Notification";

const DonorDashboard = () => {
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        bloodType: "O+",
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
        donorLevel: "Silver",
        points: 250,
    });
    
    const [nextDonationDate, setNextDonationDate] = useState("");
    const [daysUntilNextDonation, setDaysUntilNextDonation] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [donorNotifications, setDonorNotifications] = useState([
        {
        message: `Urgent! A patient nearby needs O+ blood.`,
        urgency: "High",
        distance: "2 km",
        read: false,
        },
        {
        message: `A patient is in need of O+ blood. Can you help?`,
        urgency: "Medium",
        distance: "5 km",
        read: false,
        },
    ]);
    
    const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

    const donationStats = [
        { month: "Jan", donations: 2 },
        { month: "Feb", donations: 3 },
        { month: "Mar", donations: 4 },
        { month: "Apr", donations: 1 },
        { month: "May", donations: 2 },
        { month: "Jun", donations: 3 },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const mockApiData = {
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
                    donorLevel: "Silver",
                    points: 250,
                };

                const apiData = null; // Set to `mockApiData` for testing
                setUserData(apiData || userData);
                calculateNextDonation(apiData?.lastDonationDate || userData.lastDonationDate);
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
                ? `Next donation in ${daysLeft} days.`
                : "You can donate now!"
        );
    };

    const toggleNotifications = () => setShowNotifications(!showNotifications);

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
        return <p className="text-center mt-10 text-lg">Loading...</p>;
    }

    if (!userData.name) {
        return <p className="text-center mt-10 text-lg">Unable to load data.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-16 mb-48">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
            <h1 className="text-xl sm:text-3xl font-bold text-red-600">
                Welcome, {userData.name}!
            </h1>
            
            <div className="flex flex-row justify-between gap-10">
                <div className="relative">
                    <FaBell
                        className="h-8 w-8 text-gray-600 cursor-pointer mt-3"
                        onClick={toggleNotifications}
                        aria-label="Notifications"
                    />
                    {donorNotifications.some((notif) => !notif.read) && (
                        <span className="absolute top-3 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
                    )}
                    {showNotifications && (
                        <Notification
                        notifications={donorNotifications}
                        onMarkAsRead={handleMarkNotificationAsRead}
                        onDismiss={() => setShowNotifications(false)}
                        />
                    )}

                    
                </div>

                <img
                    src={userData.avatar || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-16 h-16 sm:w-14 sm:h-14 rounded-full border-2 border-red-600"
                />
            </div>
            
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Info */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 col-span-1">
                <div className="flex items-center">
                    <img
                        src={userData.avatar || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-red-600 hidden"
                    />
                    <div className="ml-4">
                        <h2 className="text-lg sm:text-lg font-bold text-gray-700">{userData.name}</h2>
                        <p className="text-md sm:text-sm text-gray-600 rounded border shadow-red-400 mt-5 p-3">Blood Type: {userData.bloodType}</p>
                        <p className="text-md sm:text-sm text-gray-600 rounded border shadow-red-400 mt-5 p-3">Phone: {userData.phone}</p>
                        <p className="text-md sm:text-sm text-gray-600 rounded border shadow-red-400 mt-5 p-3">Email: {userData.email}</p>
                        <p className="text-md sm:text-sm text-gray-600 rounded border shadow-red-400 mt-5 p-3">
                            Next Donation:{" "}
                            <span className="font-bold text-red-600">
                            {nextDonationDate || "Calculating..."}
                            </span>
                        </p>
                    </div>
                </div>
                <button
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition w-full "
                    onClick={() => setShowBookingModal(true)}
                >
                    Book a Donation
                </button>
            </div>

            {/* Analytics */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 col-span-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
                Donation Trends
            </h2>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={donationStats}>
                <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#FF8042"
                    strokeWidth={2}
                />
                <Tooltip />
                </LineChart>
            </ResponsiveContainer>
            </div>

            {/* Donation Breakdown */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mt-6 col-span-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
                Donation Breakdown
            </h2>
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

            {/* Donation History */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mt-6 col-span-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
                Donation History
            </h2>
            <ul className="space-y-4">
                {userData.donationHistory.map((donation, index) => (
                <li
                    key={index}
                    className="flex justify-between items-center border-b pb-4"
                >
                    <div>
                    <p className="text-sm sm:text-base text-gray-700 font-medium">
                        Date: {donation.date}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                        Location: {donation.location}
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
            </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
            <BookingModal
            onClose={() => setShowBookingModal(false)}
            onConfirm={handleConfirmBooking}
            />
        )}

        
        </div>
    );
};

export default DonorDashboard;
