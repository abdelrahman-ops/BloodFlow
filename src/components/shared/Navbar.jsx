/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUser, FaLanguage, FaTint, FaTimes, FaBars } from 'react-icons/fa';
import { RiNotification2Fill } from "react-icons/ri";
import { PiDropFill } from "react-icons/pi";
import useAuthStore from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import Notification from '../donorDashboard/Notifications/Notification';
import { toast } from 'react-toastify';
import { FiArrowRight } from 'react-icons/fi';
import useNotificationStore from '../../stores/notificationStore';

const Navbar = () => {
    const {
        notifications,
        unreadCount,
        fetchNotifications,
        markNotificationRead,
        loading: notificationsloading
    } = useNotificationStore();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [drops, setDrops] = useState([]);
    const [showNotificationPanel , setShowNotificationPanel] = useState(false);

    const { language, toggleLanguage } = useLanguageStore();
    const { isAuthenticated, logout, user } = useAuthStore();

    const navigate = useNavigate();
    
    const handleNotificationRead = async (id) => {
        try {
            await markNotificationRead(id);
            toast.success("Notification marked as read");
        } catch (error) {
            toast.error("Failed to mark notification as read",error);
        }
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Create blood drop animation
    useEffect(() => {
        if (isMenuOpen) {
            const interval = setInterval(() => {
                setDrops(prev => [...prev.slice(-5), {
                    id: Date.now(),
                    left: Math.random() * 100,
                    duration: 2 + Math.random() * 3
                }]);
            }, 800);
            return () => clearInterval(interval);
        } else {
            setDrops([]);
        }
    }, [isMenuOpen]);

    const labels = {
        en: {
            about: "About Us",
            events: "Events",
            features: "Features",
            contact: "Contact Us",
            login: "Login",
            loginAs: "Login As",
            hospital: "Hospital Admin",
            donor: "Donor",
            close: "Close",
            search: "Search for blood banks...",
            donate: "Donate Now",
            profile: "Profile",
            logout: "Logout",
            notifications: "Notifications",
            urgent: "Urgent Needs",
            all: "All Blood Types",
            register: "Register",
            dashboard: "Dashboard"
        },
        ar: {
            about: "عن المشروع",
            events: "أحداث",
            features: "الميزات",
            contact: "تواصل معنا",
            login: "سجل",
            loginAs: "تسجيل الدخول كـ",
            hospital: "مسؤول المستشفى",
            donor: "متبرع",
            close: "إغلاق",
            search: "ابحث عن بنوك الدم...",
            donate: "تبرع الآن",
            profile: "الملف الشخصي",
            logout: "تسجيل خروج",
            notifications: "الإشعارات",
            urgent: "احتياجات عاجلة",
            all: "جميع فصائل الدم",
            register: "تسجيل",
            dashboard: "لوحة التحكم"
        },
    };

    const handleLoginClick = () => {
        if(isAuthenticated) {
            const path = user?.role === 'admin' 
                ? '/admin/dashboard' 
                : '/donor/dashboard/me';
            navigate(path);
        } else {
            setShowLoginPopup(true);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
        setShowNotificationPanel(false);
    };

    const handleClosePopup = () => setShowLoginPopup(false);

    const handleNavigation = (path) => {
        navigate(path);
        setShowLoginPopup(false);
    };

    // Navigation items for both desktop and mobile
    const navItems = [
        { path: "/about-us", label: labels[language].about, icon: <FaTint /> },
        { path: "/events", label: labels[language].events, icon: <FaTint /> },
        { path: "/contact-us", label: labels[language].contact, icon: <FaTint /> },
        { path: "/#features", label: labels[language].features, icon: <FaTint />, isAnchor: true }
    ];

    const handleNotificationClick = () => {
        const newShowState = !showNotificationPanel;
        setShowNotificationPanel(newShowState);
        
        if (newShowState) {
            fetchNotifications();
        }
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${
                    isScrolled ? "bg-red-700 shadow-xl" : "bg-gradient-to-r from-red-700 to-red-600"
                } text-white fixed top-0 left-0 w-full z-40 transition-colors duration-300`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-3">
                        {/* Logo with heartbeat animation */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <FaHeartbeat className="text-3xl text-white group-hover:text-red-200 transition-colors" />
                            </motion.div>
                            <motion.h1 
                                className="text-2xl font-bold flex flex-row items-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-white">Blood</span>
                                <span className="text-red-200">Flow</span>
                                <PiDropFill className="ml-1 text-red-200 animate-pulse" />
                            </motion.h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <ul className="flex space-x-6 items-center">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        {item.isAnchor ? (
                                            <a 
                                                href={item.path}
                                                className="hover:text-red-200 transition-colors flex items-center"
                                            >
                                                <span className="mr-1">{item.icon}</span>
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link 
                                                to={item.path}
                                                className="hover:text-red-200 transition-colors flex items-center"
                                            >
                                                <span className="mr-1">{item.icon}</span>
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right side buttons */}
                        <div className="flex items-center space-x-4">
                            {isAuthenticated && (
                                <div className="relative">
                                    <button 
                                        onClick={handleNotificationClick}
                                        className="p-2 rounded-full hover:bg-red-800 transition-colors relative"
                                    >
                                        <RiNotification2Fill className="text-xl" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-0 right-0 bg-yellow-400 text-red-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {showNotificationPanel && (
                                            <Notification
                                                notifications={notifications}
                                                onMarkAsRead={handleNotificationRead}
                                                onDismiss={() => setShowNotificationPanel(false)}
                                                onClose={() => setShowNotificationPanel(false)}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            <button
                                onClick={handleLoginClick}
                                className="p-2 rounded-full hover:bg-red-800 transition-colors relative group"
                            >
                                <FaUser className="text-xl" />
                                {isAuthenticated && (
                                    <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-red-700"></div>
                                )}
                                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {isAuthenticated ? labels[language].dashboard : labels[language].login}
                                </div>
                            </button>

                            <button
                                className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full text-sm flex items-center transition-colors"
                                onClick={toggleLanguage}
                            >
                                <FaLanguage className="mr-2" />
                                {language === "en" ? "عربي" : "English"}
                            </button>

                            <Link 
                                to="/register" 
                                className="hidden md:flex items-center bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-100 transition-colors"
                            >
                                <PiDropFill className="mr-2 animate-pulse" />
                                {labels[language].donate}
                            </Link>

                            <button
                                className="lg:hidden p-2 rounded-full hover:bg-red-800 transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu with blood drop animation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-red-800 overflow-hidden relative"
                        >
                            {/* Animated blood drops */}
                            {drops.map(drop => (
                                <motion.div
                                    key={drop.id}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: '100vh', opacity: [0, 1, 0] }}
                                    transition={{ duration: drop.duration, ease: "linear" }}
                                    style={{ left: `${drop.left}%` }}
                                    className="absolute text-red-400 text-xl"
                                >
                                    <PiDropFill />
                                </motion.div>
                            ))}

                            <div className="container mx-auto px-4 py-4">
                                {/* Main Navigation Links */}
                                <div className="space-y-3 pb-4">
                                    {navItems.map((item, index) => (
                                        item.isAnchor ? (
                                            <a 
                                                key={index}
                                                href={item.path}
                                                className="block hover:bg-red-700 py-2 px-4 rounded-lg transition-colors flex items-center"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="mr-2">{item.icon}</span>
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link 
                                                key={index}
                                                to={item.path}
                                                className="block hover:bg-red-700 py-2 px-4 rounded-lg transition-colors flex items-center"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="mr-2">{item.icon}</span>
                                                {item.label}
                                            </Link>
                                        )
                                    ))}

                                    {isAuthenticated ? (
                                        <>
                                            <Link 
                                                to={user?.role === 'admin' 
                                                    ? '/admin/dashboard' 
                                                    : '/donor/dashboard/me'}
                                                className="block bg-white text-red-600 font-bold py-2 px-4 rounded-lg text-center mt-4 hover:bg-red-100 transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <PiDropFill className="inline mr-2 animate-pulse" />
                                                {labels[language].dashboard}
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-white bg-red-900 hover:bg-red-800 py-2 px-4 rounded-lg text-center transition-colors"
                                            >
                                                {labels[language].logout}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link 
                                                to="/register" 
                                                className="block bg-white text-red-600 font-bold py-2 px-4 rounded-lg text-center mt-4 hover:bg-red-100 transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <PiDropFill className="inline mr-2 animate-pulse" />
                                                {labels[language].donate}
                                            </Link>
                                            <Link 
                                                to="/register" 
                                                className="block w-full text-white bg-red-900 hover:bg-red-800 py-2 px-4 rounded-lg text-center transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {labels[language].register}
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Login Popup */}
            <AnimatePresence>
                {showLoginPopup && (
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={handleClosePopup}
                    >
                    <motion.div 
                        initial={{ scale: 0.95, y: 10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 10, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-red-200 rounded-full opacity-10"></div>
                        
                        {/* Close button */}
                        <button 
                        onClick={handleClosePopup}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                        >
                        <FaTimes className="text-lg" />
                        </button>
                        
                        {/* Header */}
                        <div className="pt-10 pb-6 px-8 text-center relative z-10">
                        <motion.div
                            animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2
                            }}
                            className="mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-red-100"
                        >
                            <PiDropFill className="text-red-500 text-3xl animate-pulse" />
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl font-bold text-gray-800 font-sans"
                        >
                            {labels[language].loginAs}
                        </motion.h2>
                        <motion.p 
                            initial={{ y: -5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-gray-500 mt-2 text-sm"
                        >
                            {language === 'en' 
                            ? 'Join our life-saving community' 
                            : 'انضم إلى مجتمعنا المنقذ للحياة'}
                        </motion.p>
                        </div>
                        
                        {/* Role selection */}
                        <div className="px-8 pb-8 space-y-6 relative z-10">
                        {/* Hospital Admin Card */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-0.5 shadow-sm border border-gray-100 group-hover:border-red-200 transition-all">
                            <div className="bg-white rounded-[11px] p-5">
                                <button
                                onClick={() => handleNavigation("/login?role=hospital")}
                                className="w-full flex items-center justify-between"
                                >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-4">
                                    <FaUser className="text-red-600" />
                                    </div>
                                    <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">{labels[language].hospital}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {language === 'en' 
                                        ? 'For medical professionals' 
                                        : 'للمهنيين الطبيين'}
                                    </p>
                                    </div>
                                </div>
                                <FiArrowRight className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                            </div>
                            <Link 
                            to="/admin/register" 
                            state={{ role: 'hospital' }}
                            className="block text-center mt-2 text-sm text-red-600 hover:text-red-700 transition-colors font-medium"
                            onClick={handleClosePopup}
                            >
                            {language === 'en' ? 'Create admin account →' : 'إنشاء حساب مسؤول →'}
                            </Link>
                        </motion.div>
                        
                        {/* Donor Card */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-0.5 shadow-sm border border-gray-100 group-hover:border-gray-300 transition-all">
                            <div className="bg-white rounded-[11px] p-5">
                                <button
                                onClick={() => handleNavigation("/login?role=donor")}
                                className="w-full flex items-center justify-between"
                                >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                                    <PiDropFill className="text-gray-600" />
                                    </div>
                                    <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">{labels[language].donor}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {language === 'en' 
                                        ? 'For blood donors' 
                                        : 'للمتبرعين بالدم'}
                                    </p>
                                    </div>
                                </div>
                                <FiArrowRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </button>
                            </div>
                            </div>
                            <Link 
                            to="/register" 
                            state={{ role: 'donor' }}
                            className="block text-center mt-2 text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
                            onClick={handleClosePopup}
                            >
                            {language === 'en' ? 'Become a donor →' : 'كن متبرعًا →'}
                            </Link>
                        </motion.div>
                        </div>
                    </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;