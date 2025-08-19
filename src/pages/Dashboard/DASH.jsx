/* eslint-disable no-unused-vars */
import { useState } from "react";
import { 
    LineChart, PieChart, Pie, Line, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend, AreaChart, Area 
} from "recharts";
import { 
    FaBell, FaTint, FaMoon, FaSun, FaChartLine, 
    FaTrophy, FaAward, FaHeartbeat, FaSignOutAlt,
    FaRegClock, FaMapMarkerAlt, FaRegCalendarAlt,
    FaRegHeart, FaRegStar, FaRegUser, FaChevronRight , FaTimes,
    FaBars
} from "react-icons/fa";
import {  AiFillStar, AiOutlineDashboard } from "react-icons/ai";
import { GiHealthPotion } from "react-icons/gi";
import { MdWaterDrop } from "react-icons/md";
import { IoMdRibbon, IoIosArrowForward } from "react-icons/io";
import { 
    MdHealthAndSafety, MdManageHistory, MdLocalHospital, 
    MdOutlineBloodtype, MdOutlineNotificationsActive 
} from "react-icons/md";
import { RiCoupon2Fill, RiDashboardFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "../../components/donorDashboard/modals/BookingModal";
import Notification from "../../components/donorDashboard/Notifications/Notification";
import AiModal from "../../components/donorDashboard/modals/AiModal";
import { useDonorDashboard } from "../../controller/donorDashboard.controller";
import { 
    donationTrends, 
    bloodHealthData, 
    donorAchievements, 
    donorCoupons, 
    bloodTypeDistribution,
    donationImpactData,
    healthMetrics
} from "../../utils/donationUtils";

const DonorDash = () => {
    const {
        // State
        nextDonationDate,
        daysUntilNextDonation,
        showBookingModal,
        setShowBookingModal,
        showNotifications,
        setShowNotifications,
        showAiModal,
        setShowAiModal,
        darkMode,
        activeTab,
        setActiveTab,
        user,
        isAuthenticated,
        authLoading,
        donationsLoading,
        notifications,
        notificationsLoading,
        
        // Handlers
        toggleNotifications,
        toggleDarkMode,
        handleMarkNotificationAsRead,
        handleConfirmBooking,
        handleLogout,
    } = useDonorDashboard();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentView, setCurrentView] = useState("dashboard"); // dashboard | health | rewards
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    console.log('notifications: ', notifications);

    const chartData = donationTrends.labels.map((label, index) => ({
        month: label,
        donations: donationTrends.data[index],
    }));

    const handleLogoutClick = async () => {
        const { success, message } = await handleLogout();
        if (!success && message) {
        toast.error(message);
        }
    };

    const handleBookingConfirm = (bookingDetails) => {
        const { message } = handleConfirmBooking(bookingDetails);
        toast.success(message);
        setShowBookingModal(false);
    };

    const handleNotificationRead = async (id) => {
        const { message } = await handleMarkNotificationAsRead(id);
        toast.success(message);
    };

    // Loading skeleton
    if (authLoading || donationsLoading || notificationsLoading) {
        return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="flex justify-center items-center h-screen">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-red-500 text-5xl"
            >
                <MdWaterDrop />
            </motion.div>
            </div>
        </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center p-8 max-w-md">
            <MdWaterDrop className="text-red-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Restricted</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please login to access your donor dashboard
            </p>
            <button
                onClick={() => window.location.href = '/login'}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-all shadow-lg"
            >
                Go to Login
            </button>
            </div>
        </div>
        );
    }

      // Sidebar variants for animation
    const sidebarVariants = {
        expanded: {
            width: "16rem",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        collapsed: {
            width: "5rem",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };
    
    const contentVariants = {
        expanded: { marginLeft: "16rem" },
        collapsed: { marginLeft: "5rem" }
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"} mt-16`}>
            {/* Mobile Header */}
            <header className="lg:hidden flex justify-between items-center p-4 border-b dark:border-gray-700">
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                >
                    {mobileMenuOpen ? (
                            <FaTimes className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                        ) : (
                        <FaBars className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                    )}
                </button>
                <div className="flex items-center gap-2">
                <button
                    onClick={toggleNotifications}
                    className="p-2 relative"
                >
                    <FaBell className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                    {notifications.some((notif) => !notif.read) && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                </button>
                <img
                    src={user.user.avatar || "https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                <motion.div 
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed inset-y-0 left-0 w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl z-50 lg:hidden`}
                >
                    <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MdWaterDrop className="text-red-500 text-2xl" />
                            <span className="font-bold">BloodLink</span>
                        </div>
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                        >
                            <FaTimes className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                        </button>
                    </div>
                    <div className="p-4">
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src={user.user.avatar || "https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-medium">{user.user.name}</p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Blood Type: <span className="font-bold text-red-500">{user.user.bloodType}</span>
                            </p>
                        </div>
                    </div>
                    <nav className="space-y-1">
                        <button
                            onClick={() => {
                                setCurrentView("dashboard");
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                                currentView === "dashboard" 
                                ? darkMode 
                                    ? "bg-gray-700 text-red-500" 
                                    : "bg-red-50 text-red-500"
                                : darkMode 
                                    ? "hover:bg-gray-700" 
                                    : "hover:bg-gray-100"
                            }`}
                        >
                        <AiOutlineDashboard className="text-lg" />
                        <span>Dashboard</span>
                        </button>
                        <button
                        onClick={() => {
                            setCurrentView("health");
                            setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                                currentView === "health" 
                                ? darkMode 
                                    ? "bg-gray-700 text-red-500" 
                                    : "bg-red-50 text-red-500"
                                : darkMode 
                                    ? "hover:bg-gray-700" 
                                    : "hover:bg-gray-100"
                            }`}
                        >
                        <MdHealthAndSafety className="text-lg" />
                        <span>Health Metrics</span>
                        </button>
                        <button
                        onClick={() => {
                            setCurrentView("rewards");
                            setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                            currentView === "rewards" 
                            ? darkMode 
                                ? "bg-gray-700 text-red-500" 
                                : "bg-red-50 text-red-500"
                            : darkMode 
                                ? "hover:bg-gray-700" 
                                : "hover:bg-gray-100"
                        }`}
                        >
                        <FaTrophy className="text-lg" />
                        <span>Rewards</span>
                        </button>
                        <button
                        onClick={handleLogoutClick}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-500 ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        >
                        <FaSignOutAlt className="text-lg" />
                        <span>Logout</span>
                        </button>
                    </nav>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside 
                initial={sidebarExpanded ? "expanded" : "collapsed"}
                animate={sidebarExpanded ? "expanded" : "collapsed"}
                variants={sidebarVariants}
                className={`hidden lg:block fixed inset-y-0 left-0 w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg z-10 mt-16 overflow-hidden`}
            >
                <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
                    <MdWaterDrop className="text-red-500 text-3xl" />
                    <span className="font-bold text-xl">BloodLink</span>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-8">
                        <img
                            src={user.user.avatar || "https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-red-500"
                        />
                        <div>
                        <p className="font-medium">{user.user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-bold text-red-500">{user.user.bloodType}</span> • Level {user.donor.donorLevel}
                        </p>
                        </div>
                    </div>
                    <nav className="space-y-2">
                        <button
                        onClick={() => setCurrentView("dashboard")}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg ${currentView === "dashboard" ? "bg-red-50 dark:bg-gray-700 text-red-500" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                        >
                        <AiOutlineDashboard className="text-xl" />
                        <span className="font-medium">Dashboard</span>
                        </button>
                        <button
                        onClick={() => setCurrentView("health")}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg ${currentView === "health" ? "bg-red-50 dark:bg-gray-700 text-red-500" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                        >
                        <MdHealthAndSafety className="text-xl" />
                        <span className="font-medium">Health Metrics</span>
                        </button>
                        <button
                        onClick={() => setCurrentView("rewards")}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg ${currentView === "rewards" ? "bg-red-50 dark:bg-gray-700 text-red-500" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                        >
                        <FaTrophy className="text-xl" />
                        <span className="font-medium">Rewards</span>
                        </button>
                    </nav>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-gray-700 text-red-500 hover:bg-red-100 dark:hover:bg-gray-600"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="lg:ml-64">
                {/* Top Navigation */}
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    {currentView === "dashboard" && "Donor Dashboard"}
                    {currentView === "health" && "Health Metrics"}
                    {currentView === "rewards" && "Rewards Center"}
                </h1>
                <div className="flex items-center gap-4">
                    <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                    {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                    </button>
                    <div className="relative">
                    <button
                        onClick={toggleNotifications}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
                    >
                        <FaBell className="text-gray-600 dark:text-gray-300" />
                        {notifications.some((notif) => !notif.read) && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                    </button>
                    {showNotifications && (
                        <Notification
                        notifications={notifications}
                        onMarkAsRead={handleNotificationRead}
                        onDismiss={() => setShowNotifications(false)}
                        darkMode={darkMode}
                        />
                    )}
                    </div>
                </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4 md:p-6">
                {currentView === "dashboard" && (
                    <>
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white mb-6 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.user.name || "Hero"}!</h2>
                            <p className="opacity-90">
                            {daysUntilNextDonation > 0 
                                ? `You can donate again in ${daysUntilNextDonation} days` 
                                : "You're eligible to donate now!"}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowBookingModal(true)}
                            className="mt-4 md:mt-0 bg-white text-red-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-full transition-all shadow-md flex items-center gap-2"
                        >
                            <MdLocalHospital /> Book Donation
                        </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Donation Count */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Donations</p>
                            <h3 className="text-2xl font-bold mt-1">{user.donor.donationCount || 0}</h3>
                            </div>
                            <div className="bg-red-100 dark:bg-gray-700 p-3 rounded-lg">
                            <FaTint className="text-red-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
                            <FaChartLine /> +2 from last month
                        </div>
                        </div>

                        {/* Points */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Loyalty Points</p>
                            <h3 className="text-2xl font-bold mt-1">{user.donor.points || 0}</h3>
                            </div>
                            <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-lg">
                            <FaTrophy className="text-blue-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm text-blue-500">
                            <FaChartLine /> Earn 50 more for next reward
                        </div>
                        </div>

                        {/* Next Donation */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Next Donation</p>
                            <h3 className="text-2xl font-bold mt-1">
                                {daysUntilNextDonation > 0 ? `${daysUntilNextDonation}d` : "Now"}
                            </h3>
                            </div>
                            <div className="bg-purple-100 dark:bg-gray-700 p-3 rounded-lg">
                            <FaRegCalendarAlt className="text-purple-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-red-500 h-2 rounded-full" 
                                style={{ width: `${Math.min(100, 100 - (daysUntilNextDonation / 90 * 100))}%` }}
                            ></div>
                            </div>
                        </div>
                        </div>

                        {/* Donor Level */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Donor Level</p>
                            <h3 className="text-2xl font-bold mt-1">{user.donor.donorLevel || "Bronze"}</h3>
                            </div>
                            <div className="bg-yellow-100 dark:bg-gray-700 p-3 rounded-lg">
                            <AiFillStar className="text-yellow-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                            <AiFillStar 
                                key={star} 
                                className={`text-${star <= (user.donor.donorLevel === "Elite" ? 5 : user.donor.donorLevel === "Silver" ? 3 : 1) ? "yellow-500" : "gray-300"}`} 
                            />
                            ))}
                        </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Donation Trends */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold flex items-center gap-2">
                            <FaChartLine className="text-red-500" />
                            Donation Trends
                            </h3>
                            <select className="bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                            <option>All Time</option>
                            </select>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                                </linearGradient>
                                </defs>
                                <XAxis 
                                dataKey="month" 
                                tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                                />
                                <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }} />
                                <Tooltip 
                                contentStyle={{
                                    backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                                    borderColor: darkMode ? "#374151" : "#E5E7EB",
                                    borderRadius: "0.5rem",
                                }}
                                />
                                <Area
                                type="monotone"
                                dataKey="donations"
                                stroke="#FF6B6B"
                                fillOpacity={1}
                                fill="url(#colorDonations)"
                                />
                            </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        </div>

                        {/* Blood Type Impact */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MdOutlineBloodtype className="text-red-500" />
                            Blood Type Impact
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                data={bloodTypeDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name }) => name}
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
                                <Legend />
                            </PieChart>
                            </ResponsiveContainer>
                        </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                        <button 
                        onClick={() => setShowBookingModal(true)}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                        <div className="bg-red-100 dark:bg-gray-700 p-3 rounded-full mb-2">
                            <MdLocalHospital className="text-red-500 text-xl" />
                        </div>
                        <span className="font-medium text-sm">Book Donation</span>
                        </button>
                        <button 
                        onClick={() => setShowAiModal(true)}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                        <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full mb-2">
                            <FaHeartbeat className="text-blue-500 text-xl" />
                        </div>
                        <span className="font-medium text-sm">Health Insights</span>
                        </button>
                        <button 
                        onClick={() => setCurrentView("health")}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                        <div className="bg-green-100 dark:bg-gray-700 p-3 rounded-full mb-2">
                            <MdHealthAndSafety className="text-green-500 text-xl" />
                        </div>
                        <span className="font-medium text-sm">Health Metrics</span>
                        </button>
                        <button 
                        onClick={() => setCurrentView("rewards")}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                        <div className="bg-yellow-100 dark:bg-gray-700 p-3 rounded-full mb-2">
                            <FaTrophy className="text-yellow-500 text-xl" />
                        </div>
                        <span className="font-medium text-sm">My Rewards</span>
                        </button>
                        <button 
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                        <div className="bg-purple-100 dark:bg-gray-700 p-3 rounded-full mb-2">
                            <IoMdRibbon className="text-purple-500 text-xl" />
                        </div>
                        <span className="font-medium text-sm">Share Impact</span>
                        </button>
                    </div>

                    {/* Recent Donations */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 mb-6">
                        <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <FaRegClock className="text-red-500" />
                            Recent Donations
                        </h3>
                        <button className="text-sm text-red-500 hover:text-red-600 font-medium">
                            View All
                        </button>
                        </div>
                        <div className="space-y-4">
                        {user.donor.donationHistory.slice(0, 3).map((donation, index) => (
                            <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <div className="bg-red-100 dark:bg-gray-700 p-2 rounded-lg">
                                <FaTint className="text-red-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                <h4 className="font-medium">{donation.location?.name || "Blood Donation Center"}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(donation.date).toLocaleDateString()}
                                </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-400" />
                                {donation.location?.address || "123 Medical Center Dr"}
                                </p>
                            </div>
                            <div className="bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                                +{donation.points || 10} pts
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Impact Summary */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <MdWaterDrop className="text-white" />
                        Your Blood Donation Impact
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {donationImpactData.map((impact, index) => (
                            <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                                {impact.icon === "heart" && <FaRegHeart className="text-white" />}
                                {impact.icon === "users" && <FaRegUser className="text-white" />}
                                {impact.icon === "clock" && <FaRegClock className="text-white" />}
                                </div>
                                <h4 className="font-medium">{impact.title}</h4>
                            </div>
                            <p className="text-2xl font-bold">{impact.value}</p>
                            <p className="text-sm opacity-80 mt-1">{impact.description}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    </>
                )}

                {currentView === "health" && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <MdHealthAndSafety className="text-red-500" />
                        Health Metrics
                    </h2>
                    
                    {/* Blood Health Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                        <h3 className="font-bold mb-4">Blood Health</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(bloodHealthData).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-xl font-bold mt-1">{value}</p>
                            </div>
                            ))}
                        </div>
                        </div>
                        <div>
                        <h3 className="font-bold mb-4">Hemoglobin Trend</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={healthMetrics}>
                                <XAxis 
                                dataKey="date" 
                                tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                                />
                                <YAxis 
                                domain={[12, 18]}
                                tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                                />
                                <Tooltip 
                                contentStyle={{
                                    backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                                    borderColor: darkMode ? "#374151" : "#E5E7EB",
                                    borderRadius: "0.5rem",
                                }}
                                />
                                <Line
                                type="monotone"
                                dataKey="hemoglobin"
                                stroke="#FF6B6B"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                />
                            </LineChart>
                            </ResponsiveContainer>
                        </div>
                        </div>
                    </div>

                    {/* Health Recommendations */}
                    <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                        <FaHeartbeat className="text-blue-500" />
                        Personalized Recommendations
                        </h3>
                        <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-gray-600 p-2 rounded-lg mt-1">
                            <GiHealthPotion className="text-blue-500" />
                            </div>
                            <div>
                            <h4 className="font-medium">Iron-Rich Diet</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Your hemoglobin levels are good but could be improved. Consider adding more iron-rich foods like spinach, red meat, and lentils to your diet.
                            </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-gray-600 p-2 rounded-lg mt-1">
                            <FaRegClock className="text-blue-500" />
                            </div>
                            <div>
                            <h4 className="font-medium">Hydration</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Drink at least 2 liters of water daily, especially in the 48 hours before donation, to help maintain healthy blood volume.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Blood Test History */}
                    <div>
                        <h3 className="font-bold mb-4">Blood Test History</h3>
                        <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-left border-b dark:border-gray-700">
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Hemoglobin</th>
                                <th className="pb-2">Iron Level</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {healthMetrics.map((metric, index) => (
                                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3">{new Date(metric.date).toLocaleDateString()}</td>
                                <td className="py-3 font-medium">{metric.hemoglobin} g/dL</td>
                                <td className="py-3">{metric.ironLevel}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                    metric.status === "Normal" 
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    }`}>
                                    {metric.status}
                                    </span>
                                </td>
                                <td className="py-3 text-right">
                                    <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                                    <IoIosArrowForward />
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                )}

                {currentView === "rewards" && (
                    <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaTrophy className="text-yellow-500" />
                        Rewards Center
                    </h2>
                    
                    {/* Rewards Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm opacity-90">Current Points</p>
                            <h3 className="text-3xl font-bold mt-1">{user.donor.points || 0}</h3>
                            </div>
                            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                            <RiCoupon2Fill className="text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                            <div 
                                className="bg-white h-2 rounded-full" 
                                style={{ width: `${Math.min(100, (user.donor.points || 0) / 500 * 100)}%` }}
                            ></div>
                            </div>
                            <p className="text-xs mt-2 opacity-90">
                            {500 - (user.donor.points || 0)} points to next reward
                            </p>
                        </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Available Rewards</p>
                            <h3 className="text-3xl font-bold mt-1">3</h3>
                            </div>
                            <div className="bg-yellow-100 dark:bg-gray-700 p-3 rounded-lg">
                            <FaAward className="text-yellow-500 text-xl" />
                            </div>
                        </div>
                        <button className="mt-4 w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition flex items-center justify-center gap-2">
                            View All
                        </button>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Donor Level</p>
                            <h3 className="text-3xl font-bold mt-1">{user.donor.donorLevel || "Bronze"}</h3>
                            </div>
                            <div className="bg-purple-100 dark:bg-gray-700 p-3 rounded-lg">
                            <IoMdRibbon className="text-purple-500 text-xl" />
                            </div>
                        </div>
                        <button className="mt-4 w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition flex items-center justify-center gap-2">
                            Benefits
                        </button>
                        </div>
                    </div>
                    
                    {/* Available Rewards */}
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <RiCoupon2Fill className="text-red-500" />
                        Available Rewards
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {donorCoupons.filter(c => c.available).map((coupon) => (
                        <motion.div 
                            key={coupon.id}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700 overflow-hidden"
                        >
                            <div className={`h-3 ${coupon.color}`}></div>
                            <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                <h4 className="font-bold text-lg">{coupon.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{coupon.description}</p>
                                </div>
                                <div className="bg-yellow-100 dark:bg-gray-700 p-3 rounded-lg">
                                <RiCoupon2Fill className="text-yellow-500 text-xl" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-bold">{coupon.value}</span>
                                <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {coupon.points} pts
                                </span>
                            </div>
                            <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center justify-center gap-2">
                                Claim Reward
                            </button>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                    
                    {/* Upcoming Rewards */}
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <FaRegStar className="text-yellow-500" />
                        Upcoming Rewards
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {donorCoupons.filter(c => !c.available).map((coupon) => (
                        <div 
                            key={coupon.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 opacity-70"
                        >
                            <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold">{coupon.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{coupon.description}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                <RiCoupon2Fill className="text-gray-500 text-xl" />
                            </div>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold">{coupon.value}</span>
                            <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {coupon.points} pts
                            </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${Math.min(100, (user.donor.points || 0) / coupon.points * 100)}%` }}
                            ></div>
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                            {coupon.points - (user.donor.points || 0)} more points needed
                            </p>
                        </div>
                        ))}
                    </div>
                    
                    {/* Donor Levels */}
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <IoMdRibbon className="text-purple-500" />
                        Donor Levels & Benefits
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden mb-8">
                        <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-700 p-4 font-medium text-sm">
                        <div className="col-span-3">Level</div>
                        <div className="col-span-3">Donations Needed</div>
                        <div className="col-span-6">Benefits</div>
                        </div>
                        {[
                        { level: "Bronze", donations: 1, benefits: ["Basic donor profile", "Email updates"] },
                        { level: "Silver", donations: 5, benefits: ["Priority booking", "Health reports"] },
                        { level: "Gold", donations: 10, benefits: ["Exclusive events", "Personalized gifts"] },
                        { level: "Platinum", donations: 20, benefits: ["VIP recognition", "Annual health check"] },
                        { level: "Elite", donations: 50, benefits: ["All benefits", "Lifetime recognition"] }
                        ].map((tier, index) => (
                        <div 
                            key={index} 
                            className={`grid grid-cols-12 p-4 border-b dark:border-gray-700 ${
                            tier.level === user.donor.donorLevel ? "bg-red-50 dark:bg-gray-700" : ""
                            }`}
                        >
                            <div className="col-span-3 font-medium flex items-center gap-2">
                            {tier.level === user.donor.donorLevel && (
                                <FaChevronRight className="text-red-500" />
                            )}
                            {tier.level}
                            </div>
                            <div className="col-span-3">{tier.donations}+</div>
                            <div className="col-span-6">
                            <ul className="list-disc list-inside text-sm">
                                {tier.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </main>

            {/* Modals */}
            {showBookingModal && (
                <BookingModal
                onClose={() => setShowBookingModal(false)}
                onConfirm={handleBookingConfirm}
                darkMode={darkMode}
                />
            )}
        
            {showAiModal && (
                <AiModal 
                onClose={() => setShowAiModal(false)}
                darkMode={darkMode}
                />
            )}

            <ToastContainer 
                position="bottom-right" 
                theme={darkMode ? "dark" : "light"} 
                toastClassName="rounded-lg shadow-lg"
            />
        </div>
    );
};

export default DonorDash;