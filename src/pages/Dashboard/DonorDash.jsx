import { useEffect, useState } from "react";
import { LineChart, PieChart, Pie, Line, Cell, Tooltip, ResponsiveContainer} from "recharts";
import { FaBell, FaCalendarAlt, FaTint, FaMoon, FaSun, FaChartLine, FaTrophy, FaAward, FaHeartbeat } from "react-icons/fa";
import { AiOutlineLoading, AiFillStar } from "react-icons/ai";
import { GiHealthPotion } from "react-icons/gi";
import { IoMdRibbon } from "react-icons/io";
import { IoPieChartSharp } from "react-icons/io5";
import { MdHealthAndSafety, MdManageHistory, MdLocalHospital } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingModal from "../../components/BookingModal";
import Notification from "../../components/Notification";
import AiModal from "../../components/AiModal";
import Cookies from "js-cookie";
import { BsDropletFill } from "react-icons/bs";


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
    const [activeTab, setActiveTab] = useState("progress");
    
    // Sample data - replace with your actual data
    const donationTrends = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        data: [2, 3, 1, 5, 4, 3, 2],
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
        vitaminD: "30 ng/mL",
        bloodPressure: "120/80 mmHg",
    };

    const donorAchievements = [
        { id: 1, name: "First Donation", earned: true, icon: <BsDropletFill className="text-red-500 text-2xl" /> },
        { id: 2, name: "5 Donations", earned: true, icon: <FaTrophy className="text-yellow-500 text-2xl" /> },
        { id: 3, name: "Life Saver", earned: false, icon: <IoMdRibbon className="text-blue-500 text-2xl" /> },
        { id: 4, name: "Regular Donor", earned: true, icon: <FaAward className="text-purple-500 text-2xl" /> },
    ];

    const donorCoupons = [
        { id: 1, name: "Coffee Voucher", value: "$5", expiry: "2023-12-31", icon: <RiCoupon2Fill className="text-green-500 text-2xl" /> },
        { id: 2, name: "Movie Ticket", value: "1 Free", expiry: "2023-11-30", icon: <RiCoupon2Fill className="text-blue-500 text-2xl" /> },
        { id: 3, name: "Restaurant Discount", value: "20% Off", expiry: "2024-01-15", icon: <RiCoupon2Fill className="text-purple-500 text-2xl" /> },
    ];

    const bloodTypeDistribution = [
        { name: "O+", value: 38, color: "#FF6384" },
        { name: "A+", value: 34, color: "#36A2EB" },
        { name: "B+", value: 18, color: "#FFCE56" },
        { name: "AB+", value: 10, color: "#4BC0C0" },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
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
                toast.error("Failed to load donor data");
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
                ? `${daysLeft} days until next donation`
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
        toast.success(`Appointment booked for ${new Date(bookingDetails.date).toLocaleDateString()} at ${bookingDetails.hospital}`);
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
            <div className="text-center mt-10 text-lg">
                Unable to load donor data. Please try again later.
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-4 mt-14 md:p-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-red-50 to-gray-50 text-gray-800"}`}>
            {/* Header Section */}
            <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text py-3">
                        Welcome, {userData.name || "Hero"}!
                    </h1>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-md`}
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
                    </button>
                    
                    <div className="relative">
                        <button
                            onClick={toggleNotifications}
                            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-md relative`}
                            aria-label="Notifications"
                        >
                            <FaBell className={darkMode ? "text-gray-300" : "text-gray-700"} />
                            {donorNotifications.some((notif) => !notif.read) && (
                                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            )}
                        </button>
                        {showNotifications && (
                            <Notification
                                notifications={donorNotifications}
                                onMarkAsRead={handleMarkNotificationAsRead}
                                onDismiss={() => setShowNotifications(false)}
                                darkMode={darkMode}
                            />
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <img
                            src={userData.avatar || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-red-600"
                        />
                        <div className="hidden sm:block">
                            <p className="font-medium">{userData.name}</p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Level {userData.donorLevel || "1"} Donor
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Progress Overview */}
            <section className="mb-8">
                <div className={`rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaTint className="text-red-500" />
                            Your Donation Progress
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                {userData.totalDonations || 0} Donations
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                {userData.points || 0} Points
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Donation Eligibility */}
                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-50"} border-l-4 border-red-500`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Next Donation</h3>
                                <FaCalendarAlt className="text-red-500" />
                            </div>
                            <p className={`text-lg font-bold ${daysUntilNextDonation > 0 ? "text-red-600" : "text-green-600"}`}>
                                {nextDonationDate}
                            </p>
                            {daysUntilNextDonation > 0 && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div 
                                        className="bg-red-600 h-2.5 rounded-full" 
                                        style={{ width: `${Math.min(100, 100 - (daysUntilNextDonation / 90 * 100))}%` }}
                                    ></div>
                                </div>
                            )}
                            <button
                                onClick={() => setShowBookingModal(true)}
                                className="mt-4 w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                            >
                                <MdLocalHospital /> Book Donation
                            </button>
                        </div>
                        
                        {/* Blood Health */}
                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"} border-l-4 border-blue-500`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Blood Health</h3>
                                <GiHealthPotion className="text-blue-500" />
                            </div>
                            <p className="text-lg font-bold text-blue-600">
                                {bloodHealthData.hemoglobin}
                            </p>
                            <p className="text-sm">Hemoglobin Level</p>
                            <button
                                onClick={() => setShowAiModal(true)}
                                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            >
                                <FaHeartbeat /> Health Insights
                            </button>
                        </div>
                        
                        {/* Donor Level */}
                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-purple-50"} border-l-4 border-purple-500`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Donor Level</h3>
                                <AiFillStar className="text-yellow-500" />
                            </div>
                            <p className="text-lg font-bold text-purple-600">
                                {userData.donorLevel || "Bronze"}
                            </p>
                            <div className="flex gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <AiFillStar 
                                        key={star} 
                                        className={`text-${star <= (userData.donorLevel === "Gold" ? 5 : userData.donorLevel === "Silver" ? 3 : 1) ? "yellow-500" : "gray-300"}`} 
                                    />
                                ))}
                            </div>
                            <button
                                className="mt-4 w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                            >
                                <IoMdRibbon /> View Rewards
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Tabs */}
            <section className="mb-6">
                <div className="flex border-b overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("progress")}
                        className={`px-4 py-2 font-medium ${activeTab === "progress" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        Your Progress
                    </button>
                    <button
                        onClick={() => setActiveTab("achievements")}
                        className={`px-4 py-2 font-medium ${activeTab === "achievements" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        Achievements
                    </button>
                    <button
                        onClick={() => setActiveTab("rewards")}
                        className={`px-4 py-2 font-medium ${activeTab === "rewards" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        Rewards
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`px-4 py-2 font-medium ${activeTab === "history" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        History
                    </button>
                </div>
            </section>

            {/* Tab Content */}
            <div className={`rounded-xl p-6 shadow-lg mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                {activeTab === "progress" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Donation Trends */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <FaChartLine className="text-orange-500" />
                                Donation Trends
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <Line
                                            type="monotone"
                                            dataKey="donations"
                                            stroke="#FF8042"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                                                borderColor: darkMode ? "#374151" : "#E5E7EB",
                                                borderRadius: "0.5rem",
                                            }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* Blood Type Distribution */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <IoPieChartSharp className="text-green-500" />
                                Blood Type Impact
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={bloodTypeDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {bloodTypeDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                                                borderColor: darkMode ? "#374151" : "#E5E7EB",
                                                borderRadius: "0.5rem",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === "achievements" && (
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <FaTrophy className="text-yellow-500" />
                            Your Achievements
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {donorAchievements.map((achievement) => (
                                <div 
                                    key={achievement.id}
                                    className={`p-4 rounded-lg border ${achievement.earned ? 
                                        (darkMode ? "border-yellow-500 bg-gray-700" : "border-yellow-300 bg-yellow-50") : 
                                        (darkMode ? "border-gray-600 bg-gray-700 opacity-50" : "border-gray-200 bg-gray-50 opacity-50")}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        {achievement.icon}
                                        <h4 className={`font-medium ${achievement.earned ? "text-yellow-600" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            {achievement.name}
                                        </h4>
                                    </div>
                                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        {achievement.earned ? "Earned" : "In Progress"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {activeTab === "rewards" && (
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <RiCoupon2Fill className="text-green-500" />
                            Your Rewards
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {donorCoupons.map((coupon) => (
                                <div 
                                    key={coupon.id}
                                    className={`p-4 rounded-lg border ${darkMode ? "border-purple-500 bg-gray-700" : "border-purple-300 bg-purple-50"}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        {coupon.icon}
                                        <h4 className="font-medium text-purple-600">{coupon.name}</h4>
                                    </div>
                                    <p className={`text-lg font-bold mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                        {coupon.value}
                                    </p>
                                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Expires: {new Date(coupon.expiry).toLocaleDateString()}
                                    </p>
                                    <button
                                        className={`mt-3 w-full py-2 px-4 rounded-lg ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"} text-white transition`}
                                    >
                                        Claim Reward
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {activeTab === "history" && (
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <MdManageHistory className="text-blue-500" />
                            Donation History
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} text-left`}>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Location</th>
                                        <th className="p-3">Points</th>
                                        <th className="p-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.donationHistory?.length > 0 ? (
                                        userData.donationHistory.map((donation, index) => (
                                            <tr 
                                                key={index} 
                                                className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                                            >
                                                <td className="p-3">
                                                    {new Date(donation.date).toLocaleDateString()}
                                                </td>
                                                <td className="p-3">{donation.location}</td>
                                                <td className="p-3 font-medium text-green-600">
                                                    +{donation.points || 10}
                                                </td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        donation.status === "Completed" ? 
                                                        (darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800") : 
                                                        (darkMode ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800")
                                                    }`}>
                                                        {donation.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-4 text-center">
                                                No donation history available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Blood Health Quick View */}
            <section className={`rounded-xl p-6 shadow-lg mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <MdHealthAndSafety className="text-blue-500" />
                    Blood Health Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {Object.entries(bloodHealthData).map(([key, value]) => (
                        <div 
                            key={key}
                            className={`p-3 rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                        >
                            <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} uppercase`}>
                                {key.replace(/([A-Z])/g, ' $1')}
                            </p>
                            <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modals */}
            {showBookingModal && (
                <BookingModal
                    onClose={() => setShowBookingModal(false)}
                    onConfirm={handleConfirmBooking}
                    darkMode={darkMode}
                />
            )}
            
            {showAiModal && (
                <AiModal 
                    onClose={() => setShowAiModal(false)}
                    darkMode={darkMode}
                />
            )}

            <ToastContainer position="bottom-right" theme={darkMode ? "dark" : "light"} />
        </div>
    );
};

export default DonorDashboard;