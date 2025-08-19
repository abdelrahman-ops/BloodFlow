/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { 
    LineChart, PieChart, Pie, Line, Cell, Tooltip, ResponsiveContainer, 
    XAxis, YAxis, Legend, AreaChart, Area 
} from "recharts";
import { 
    FaBell, FaTint, FaMoon, FaSun, FaChartLine, 
    FaTrophy, FaAward, FaHeartbeat, FaSignOutAlt,
    FaRegClock, FaMapMarkerAlt, FaRegCalendarAlt,
    FaRegHeart, FaRegStar, FaRegUser, FaChevronRight,
    FaBars, FaTimes, FaChevronLeft, FaSearch,
    FaFilter, FaDownload, FaPlus, FaArrowLeft
} from "react-icons/fa";
import { AiFillStar, AiOutlineDashboard } from "react-icons/ai";
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
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

const BookingModal = lazy(() => import("../../components/donorDashboard/modals/BookingModal"));
const Notification = lazy(() => import("../../components/donorDashboard/Notifications/Notification"));
const AiModal = lazy(() => import("../../components/donorDashboard/modals/AiModal"));

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

// Service Worker Registration for PWA
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered');
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
};

const DonorDash = () => {
    const {
        // State
        nextDonationDate,
        daysUntilNextDonation,
        showBookingModal,
        setShowBookingModal,
        showAiModal,
        setShowAiModal,
        darkMode,
        activeTab,
        setActiveTab,
        isAuthenticated,
        authLoading,
        donationsLoading,
        notifications,
        notificationsLoading,
        donorProfile,
        
        // Handlers
        toggleDarkMode,
        handleConfirmBooking,
        handleLogout,
    } = useDonorDashboard();

    const user = donorProfile?.user || {};
    const donor = donorProfile?.donor || {};

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentView, setCurrentView] = useState("dashboard");
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const sidebarControls = useAnimationControls();

    // Check for PWA installation
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstalled(false);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        
        // Check if the app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            setIsInstalled(true);
        }

        // Register service worker
        registerServiceWorker();

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const chartData = donationTrends.labels.map((label, index) => ({
            month: label,
            donations: donationTrends.data[index],
        }));

    // Install handler for PWA
    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setIsInstalled(true);
                }
                setDeferredPrompt(null);
            });
        }
    };

    // Responsive sidebar handling
    const checkScreenSize = useCallback(() => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        
        if (mobile) {
            setSidebarExpanded(false);
            setMobileMenuOpen(false);
        } else {
            setSidebarExpanded(true);
        }
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [checkScreenSize]);

    // Sidebar animation handler
    const toggleSidebar = useCallback(() => {
        if (isMobile) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            const newState = !sidebarExpanded;
            setSidebarExpanded(newState);
            
            if (newState) {
                sidebarControls.start("expanded");
            } else {
                sidebarControls.start("collapsed");
            }
        }
    }, [isMobile, mobileMenuOpen, sidebarControls, sidebarExpanded]);

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

    // Pagination handlers
    const itemsPerPage = 5;
    const totalPages = Math.ceil((donor?.donationHistory || []).length / itemsPerPage);
    
    const paginatedDonations = useMemo(() => {
    const donationHistory = donor?.donationHistory || [];
    const startIndex = (currentPage - 1) * itemsPerPage;
        return donationHistory.slice(startIndex, startIndex + itemsPerPage);
    }, [donor?.donationHistory, currentPage, itemsPerPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll to top of the list for better UX
            document.getElementById("donation-list")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Filter rewards based on search query
    const filteredRewards = useMemo(() => {
        if (!searchQuery) return donorCoupons;
        return donorCoupons.filter(coupon => 
            coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [donorCoupons, searchQuery]);

    // Sidebar variants for animation
    const sidebarVariants = {
        expanded: {
            width: "16rem",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        collapsed: {
            width: "5rem",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        mobileExpanded: {
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        mobileCollapsed: {
            x: "-100%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    // Loading skeleton
    if (authLoading || donationsLoading || notificationsLoading || !donorProfile) {
        return (
            <div className={`flex flex-col min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
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
            <div className={`flex justify-center items-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className={`text-center p-8 max-w-md rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                    <MdWaterDrop className="text-red-500 text-5xl mx-auto mb-4" />
                    <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                        Access Restricted
                    </h2>
                    <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
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

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}>
            {/* Mobile Header */}
            <header className="lg:hidden flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 z-30 bg-inherit mt-16 shadow-sm">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={toggleSidebar}
                        className={`p-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                        ) : (
                            <FaBars className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                        )}
                    </button>
                    <h1 className="text-lg font-bold">
                        {currentView === "dashboard" && "Dashboard"}
                        {currentView === "health" && "Health"}
                        {currentView === "rewards" && "Rewards"}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
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
                                    <span className="font-bold">BloodFlow</span>
                                </div>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                    aria-label="Close menu"
                                >
                                    <FaTimes className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <img
                                        src={"https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                        loading="lazy"
                                    />
                                    <div>
                                        <p className="font-medium">{user?.name}</p>
                                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Blood Type: <span className="font-bold text-red-500">{user?.bloodType}</span>
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
                                        } transition-colors`}
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
                                        } transition-colors`}
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
                                        } transition-colors`}
                                    >
                                        <FaTrophy className="text-lg" />
                                        <span>Rewards</span>
                                    </button>
                                    {!isInstalled && deferredPrompt && (
                                        <button
                                            onClick={handleInstallClick}
                                            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                            } transition-colors`}
                                        >
                                            <RiDashboardFill className="text-lg text-blue-500" />
                                            <span className="text-blue-500">Install App</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={handleLogoutClick}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-500 ${
                                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                        } transition-colors`}
                                    >
                                        <FaSignOutAlt className="text-lg" />
                                        <span>Logout</span>
                                    </button>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={isMobile ? "mobileCollapsed" : sidebarExpanded ? "expanded" : "collapsed"}
                animate={
                    isMobile 
                        ? (mobileMenuOpen ? "mobileExpanded" : "mobileCollapsed")
                        : sidebarControls
                }
                variants={sidebarVariants}
                className={`mt-16 fixed inset-y-0 left-0 z-20 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg ${
                    isMobile ? "w-64" : "mt-16"
                }`}
            >
                <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                    {sidebarExpanded || isMobile ? (
                        <div className="flex items-center gap-2">
                            <MdWaterDrop className="text-red-500 text-3xl" />
                            <span className="font-bold text-xl">BloodFlow</span>
                        </div>
                    ) : (
                        <div className="flex justify-center w-full">
                            <MdWaterDrop className="text-red-500 text-3xl" />
                        </div>
                    )}
                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            {sidebarExpanded ? (
                                <FaChevronLeft className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                            ) : (
                                <FaChevronRight className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                            )}
                        </button>
                    )}
                </div>
                
                <div className="p-4">
                    <div className={`flex items-center ${sidebarExpanded || isMobile ? "gap-4" : "justify-center"} mb-8`}>
                        <img
                            src={"https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-red-500"
                            loading="lazy"
                        />
                        {(sidebarExpanded || isMobile) && (
                            <div>
                                <p className="font-medium truncate">{user?.name}</p>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    <span className="font-bold text-red-500">{user?.bloodType}</span> • Level {donor?.donorLevel}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <nav className="space-y-2">
                        <button
                            onClick={() => {
                                setCurrentView("dashboard")
                                if (isMobile) setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center ${
                                sidebarExpanded || isMobile ? "gap-4 p-3" : "justify-center p-3"
                            } rounded-lg ${
                                currentView === "dashboard" 
                                    ? darkMode 
                                        ? "bg-gray-700 text-red-500" 
                                        : "bg-red-50 text-red-500"
                                    : darkMode 
                                        ? "hover:bg-gray-700" 
                                        : "hover:bg-gray-100"
                            } transition-colors`}
                        >
                            <AiOutlineDashboard className="text-xl" />
                            {(sidebarExpanded || isMobile) && <span className="font-medium">Dashboard</span>}
                        </button>
                        
                        <button
                            onClick={() => {
                                setCurrentView("health")
                                if (isMobile) setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center ${
                                sidebarExpanded || isMobile ? "gap-4 p-3" : "justify-center p-3"
                            } rounded-lg ${
                                currentView === "health" 
                                    ? darkMode 
                                        ? "bg-gray-700 text-red-500" 
                                        : "bg-red-50 text-red-500"
                                    : darkMode 
                                        ? "hover:bg-gray-700" 
                                        : "hover:bg-gray-100"
                            } transition-colors`}
                        >
                            <MdHealthAndSafety className="text-xl" />
                            {(sidebarExpanded || isMobile) && <span className="font-medium">Health Metrics</span>}
                        </button>
                        
                        <button
                            onClick={() => {
                                setCurrentView("rewards")
                                if (isMobile) setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center ${sidebarExpanded || isMobile ? "gap-4 p-3" : "justify-center p-3"} rounded-lg ${
                                currentView === "rewards" 
                                    ? darkMode 
                                        ? "bg-gray-700 text-red-500" 
                                        : "bg-red-50 text-red-500"
                                    : darkMode 
                                        ? "hover:bg-gray-700" 
                                        : "hover:bg-gray-100"
                            } transition-colors`}
                        >
                            <FaTrophy className="text-xl" />
                            {(sidebarExpanded || isMobile) && <span className="font-medium">Rewards</span>}
                        </button>
                        
                        {!isInstalled && deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className={`w-full flex items-center ${sidebarExpanded || isMobile ? "gap-4 p-3" : "justify-center p-3"} rounded-lg ${
                                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                } transition-colors`}
                            >
                                <RiDashboardFill className="text-xl text-blue-500" />
                                {(sidebarExpanded || isMobile) && <span className="font-medium text-blue-500">Install App</span>}
                            </button>
                        )}
                    </nav>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <button
                        onClick={handleLogoutClick}
                        className={`w-full flex items-center ${sidebarExpanded || isMobile ? "gap-2 justify-center" : "justify-center"} p-3 rounded-lg ${
                            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-red-50 hover:bg-red-100"
                        } text-red-500 transition-colors`}
                    >
                        <FaSignOutAlt />
                        {(sidebarExpanded || isMobile) && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className={`transition-all duration-300 ${
                    isMobile ? 
                        (mobileMenuOpen ? "ml-64" : "ml-0") : 
                        sidebarExpanded ? "ml-64" : "ml-20"
                }`}
            >
                {/* Top Navigation */}
                <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} hidden lg:flex justify-between items-center sticky top-0 z-20 bg-inherit mt-16 shadow-sm`}>
                    <h1 className="text-xl font-bold">
                        {currentView === "dashboard" && "Donor Dashboard"}
                        {currentView === "health" && "Health Metrics"}
                        {currentView === "rewards" && "Rewards Center"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                        </button>
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
                                        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name || "Hero"}!</h2>
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
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Donations</p>
                                            <h3 className="text-2xl font-bold mt-1">{donor?.donationCount || 0}</h3>
                                        </div>
                                        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-100"}`}>
                                            <FaTint className="text-red-500 text-xl" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
                                        <FaChartLine /> +2 from last month
                                    </div>
                                </motion.div>

                                {/* Points */}
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Loyalty Points</p>
                                            <h3 className="text-2xl font-bold mt-1">{donor?.points || 0}</h3>
                                        </div>
                                        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-100"}`}>
                                            <FaTrophy className="text-blue-500 text-xl" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-blue-500">
                                        <FaChartLine /> Earn 50 more for next reward
                                    </div>
                                </motion.div>

                                {/* Next Donation */}
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Next Donation</p>
                                            <h3 className="text-2xl font-bold mt-1">
                                                {daysUntilNextDonation > 0 ? `${daysUntilNextDonation}d` : "Now"}
                                            </h3>
                                        </div>
                                        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-purple-100"}`}>
                                            <FaRegCalendarAlt className="text-purple-500 text-xl" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className={`w-full rounded-full h-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                                            <div 
                                                className="bg-red-500 h-2 rounded-full" 
                                                style={{ width: `${Math.min(100, 100 - (daysUntilNextDonation / 90 * 100))}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Donor Level */}
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Donor Level</p>
                                            <h3 className="text-2xl font-bold mt-1">{donor?.donorLevel || "Bronze"}</h3>
                                        </div>
                                        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-yellow-100"}`}>
                                            <AiFillStar className="text-yellow-500 text-xl" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <AiFillStar 
                                                key={star} 
                                                className={`${
                                                    star <= (donor?.donorLevel === "Elite" ? 5 : 
                                                            donor?.donorLevel === "Gold" ? 4 : 
                                                            donor?.donorLevel === "Silver" ? 3 : 
                                                            donor?.donorLevel === "Bronze" ? 2 : 1) 
                                                        ? "text-yellow-500" 
                                                        : darkMode 
                                                        ? "text-gray-500" 
                                                        : "text-gray-300"
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* Donation Trends */}
                                <div className={`rounded-xl p-6 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <FaChartLine className="text-red-500" />
                                            Donation Trends
                                        </h3>
                                        <select className={`rounded-lg px-3 py-1 text-sm ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-200"}`}>
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
                                <div className={`rounded-xl p-6 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
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
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowBookingModal(true)}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50"} flex flex-col items-center justify-center transition-colors`}
                                >
                                    <div className={`p-3 rounded-full mb-2 ${darkMode ? "bg-gray-700" : "bg-red-100"}`}>
                                        <MdLocalHospital className="text-red-500 text-xl" />
                                    </div>
                                    <span className="font-medium text-sm">Book Donation</span>
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowAiModal(true)}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50"} flex flex-col items-center justify-center transition-colors`}
                                >
                                    <div className={`p-3 rounded-full mb-2 ${darkMode ? "bg-gray-700" : "bg-blue-100"}`}>
                                        <FaHeartbeat className="text-blue-500 text-xl" />
                                    </div>
                                    <span className="font-medium text-sm">Health Insights</span>
                                </motion.button>
                                
                                                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentView("health")}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50"} flex flex-col items-center justify-center transition-colors`}
                                >
                                    <div className={`p-3 rounded-full mb-2 ${darkMode ? "bg-gray-700" : "bg-green-100"}`}>
                                        <MdHealthAndSafety className="text-green-500 text-xl" />
                                    </div>
                                    <span className="font-medium text-sm">Health Metrics</span>
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentView("rewards")}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50"} flex flex-col items-center justify-center transition-colors`}
                                >
                                    <div className={`p-3 rounded-full mb-2 ${darkMode ? "bg-gray-700" : "bg-yellow-100"}`}>
                                        <FaTrophy className="text-yellow-500 text-xl" />
                                    </div>
                                    <span className="font-medium text-sm">My Rewards</span>
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`rounded-xl p-4 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50"} flex flex-col items-center justify-center transition-colors`}
                                >
                                    <div className={`p-3 rounded-full mb-2 ${darkMode ? "bg-gray-700" : "bg-purple-100"}`}>
                                        <IoMdRibbon className="text-purple-500 text-xl" />
                                    </div>
                                    <span className="font-medium text-sm">Share Impact</span>
                                </motion.button>
                            </div>

                            {/* Recent Donations */}
                            <div className={`rounded-xl p-6 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} mb-6`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <FaRegClock className="text-red-500" />
                                        Recent Donations
                                    </h3>
                                    <button className="text-sm text-red-500 hover:text-red-600 font-medium">
                                        View All
                                    </button>
                                </div>
                                <div className="space-y-4" id="donation-list">
                                    {paginatedDonations.map((donation, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                                        >
                                            <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-100"}`}>
                                                <FaTint className="text-red-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-medium">{donation.location?.name || "Blood Donation Center"}</h4>
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        {new Date(donation.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1 flex items-center gap-2`}>
                                                    <FaMapMarkerAlt className={`${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                                                    {donation.location?.address || "123 Medical Center Dr"}
                                                </p>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                darkMode ? "bg-gray-700 text-green-400" : "bg-green-100 text-green-800"
                                            }`}>
                                                +{donation.points || 10} pts
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {(donor?.donationHistory || []).length > itemsPerPage && (
                                    <div className="flex justify-between items-center mt-6">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                                currentPage === 1 
                                                    ? "opacity-50 cursor-not-allowed" 
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            <FaChevronLeft className="text-sm" /> Previous
                                        </button>
                                        
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-8 h-8 rounded-full ${
                                                        currentPage === page
                                                            ? "bg-red-500 text-white"
                                                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                                currentPage === totalPages 
                                                    ? "opacity-50 cursor-not-allowed" 
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            Next <FaChevronRight className="text-sm" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Impact Summary */}
                            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <MdWaterDrop className="text-white" />
                                    Your Blood Donation Impact
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {donationImpactData.map((impact, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm"
                                        >
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
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {currentView === "health" && (
                        <div className={`rounded-xl p-6 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <button 
                                    onClick={() => setCurrentView("dashboard")}
                                    className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                >
                                    <FaArrowLeft />
                                </button>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <MdHealthAndSafety className="text-red-500" />
                                    Health Metrics
                                </h2>
                            </div>
                            
                            {/* Blood Health Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="font-bold mb-4">Blood Health</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(bloodHealthData).map(([key, value]) => (
                                            <motion.div 
                                                key={key}
                                                whileHover={{ y: -5 }}
                                                className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                                            >
                                                <p className={`text-sm capitalize ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </p>
                                                <p className="text-xl font-bold mt-1">{value}</p>
                                            </motion.div>
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
                            <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <FaHeartbeat className="text-blue-500" />
                                    Personalized Recommendations
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg mt-1 ${darkMode ? "bg-gray-600" : "bg-blue-100"}`}>
                                            <GiHealthPotion className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Iron-Rich Diet</h4>
                                            <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                Your hemoglobin levels are good but could be improved. Consider adding more iron-rich foods like spinach, red meat, and lentils to your diet.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg mt-1 ${darkMode ? "bg-gray-600" : "bg-blue-100"}`}>
                                            <FaRegClock className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Hydration</h4>
                                            <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                Drink at least 2 liters of water daily, especially in the 48 hours before donation, to help maintain healthy blood volume.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Blood Test History */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold">Blood Test History</h3>
                                    <div className="flex items-center gap-2">
                                        <div className={`relative ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-lg px-3 py-1 flex items-center`}>
                                            <FaSearch className={`${darkMode ? "text-gray-400" : "text-gray-500"} mr-2`} />
                                            <input 
                                                type="text" 
                                                placeholder="Search..." 
                                                className={`bg-transparent outline-none text-sm ${darkMode ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-500"}`}
                                            />
                                        </div>
                                        <button className={`p-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                                            <FaFilter className={darkMode ? "text-gray-300" : "text-gray-600"} />
                                        </button>
                                        <button className={`p-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                                            <FaDownload className={darkMode ? "text-gray-300" : "text-gray-600"} />
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className={`text-left border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <th className="pb-2">Date</th>
                                                <th className="pb-2">Hemoglobin</th>
                                                <th className="pb-2">Iron Level</th>
                                                <th className="pb-2">Status</th>
                                                <th className="pb-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {healthMetrics.map((metric, index) => (
                                                <motion.tr 
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className={`border-b ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}`}
                                                >
                                                    <td className="py-3">{new Date(metric.date).toLocaleDateString()}</td>
                                                    <td className="py-3 font-medium">{metric.hemoglobin} g/dL</td>
                                                    <td className="py-3">{metric.ironLevel}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            metric.status === "Normal" 
                                                                ? darkMode 
                                                                ? "bg-green-900 text-green-200" 
                                                                : "bg-green-100 text-green-800"
                                                                : darkMode 
                                                                ? "bg-yellow-900 text-yellow-200" 
                                                                : "bg-yellow-100 text-yellow-800"
                                                        }`}>
                                                            {metric.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                                                            <IoIosArrowForward />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === "rewards" && (
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <button 
                                    onClick={() => setCurrentView("dashboard")}
                                    className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                >
                                    <FaArrowLeft />
                                </button>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FaTrophy className="text-yellow-500" />
                                    Rewards Center
                                </h2>
                            </div>
                            
                            {/* Rewards Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm opacity-90">Current Points</p>
                                            <h3 className="text-3xl font-bold mt-1">{donor?.points || 0}</h3>
                                        </div>
                                        <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                                            <RiCoupon2Fill className="text-xl" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                                            <div 
                                                className="bg-white h-2 rounded-full" 
                                                style={{ width: `${Math.min(100, (donor?.points || 0) / 500 * 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs mt-2 opacity-90">
                                            {500 - (donor?.points || 0)} points to next reward
                                        </p>
                                    </div>
                                </div>
                                
                                <div className={`rounded-xl p-6 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Available Rewards</p>
                                            <h3 className="text-3xl font-bold mt-1">3</h3>
                                        </div>
                                        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-yellow-100"}`}>
                                            <FaAward className="text-yellow-500 text-xl" />
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition flex items-center justify-center gap-2">
                                        View All
                                    </button>
                                </div>
                                
                                <div className={`rounded-xl p-6 shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Donor Level</p>
                                            <h3 className="text-3xl font-bold mt-1">{donor?.donorLevel || "Bronze"}</h3>
                                        </div>
                                        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-purple-100"}`}>
                                            <IoMdRibbon className="text-purple-500 text-xl" />
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition flex items-center justify-center gap-2">
                                        Benefits
                                    </button>
                                </div>
                            </div>
                            
                            {/* Search and Filter */}
                            <div className={`rounded-xl p-4 mb-6 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className={`relative flex-1 ${darkMode ? "bg-gray-700" : "bg-white"} rounded-lg px-3 py-2 flex items-center`}>
                                        <FaSearch className={`${darkMode ? "text-gray-400" : "text-gray-500"} mr-2`} />
                                        <input 
                                            type="text" 
                                            placeholder="Search rewards..." 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className={`bg-transparent outline-none flex-1 ${darkMode ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-500"}`}
                                        />
                                    </div>
                                    <button className={`p-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-200"}`}>
                                        <FaFilter className={darkMode ? "text-gray-300" : "text-gray-600"} />
                                        <span>Filter</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Available Rewards */}
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <RiCoupon2Fill className="text-red-500" />
                                Available Rewards
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {filteredRewards.filter(c => c.available).map((coupon) => (
                                    <motion.div 
                                        key={coupon.id}
                                        whileHover={{ y: -5 }}
                                        className={`rounded-xl shadow-md border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} overflow-hidden`}
                                    >
                                        <div className={`h-3 ${coupon.color}`}></div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-bold text-lg">{coupon.name}</h4>
                                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{coupon.description}</p>
                                                </div>
                                                <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-yellow-100"}`}>
                                                    <RiCoupon2Fill className="text-yellow-500 text-xl" />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-2xl font-bold">{coupon.value}</span>
                                                <span className={`text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
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
                                {filteredRewards.filter(c => !c.available).map((coupon) => (
                                    <div 
                                        key={coupon.id}
                                        className={`rounded-xl shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} p-6 opacity-70`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold">{coupon.name}</h4>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{coupon.description}</p>
                                            </div>
                                            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                                <RiCoupon2Fill className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xl font-bold">{coupon.value}</span>
                                            <span className={`text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                                {coupon.points} pts
                                            </span>
                                        </div>
                                        <div className={`w-full rounded-full h-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                                            <div 
                                                className="bg-yellow-400 h-2 rounded-full" 
                                                style={{ width: `${Math.min(100, (donor?.points || 0) / coupon.points * 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className={`text-xs text-center mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            {coupon.points - (donor?.points || 0)} more points needed
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Donor Levels */}
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <IoMdRibbon className="text-purple-500" />
                                Donor Levels & Benefits
                            </h3>
                            <div className={`rounded-xl shadow-sm border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} overflow-hidden mb-8`}>
                                <div className={`grid grid-cols-12 p-4 font-medium text-sm ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
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
                                        className={`grid grid-cols-12 p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} ${
                                            tier.level === donor?.donorLevel ? (darkMode ? "bg-gray-700" : "bg-red-50") : ""
                                        }`}
                                    >
                                        <div className="col-span-3 font-medium flex items-center gap-2">
                                            {tier.level === donor?.donorLevel && (
                                                <FaChevronRight className="text-red-500" />
                                            )}
                                            {tier.level}
                                        </div>
                                        <div className="col-span-3">{tier.donations}+</div>
                                        <div className="col-span-6">
                                            <ul className={`list-disc list-inside text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
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
            <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">Loading...</div>}>
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
            </Suspense>

            <ToastContainer 
                position="bottom-right" 
                theme={darkMode ? "dark" : "light"} 
                toastClassName="rounded-lg shadow-lg"
            />
        </div>
    );
};

export default DonorDash;