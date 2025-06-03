import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/LanguageContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUser, FaLanguage, FaTint, FaTimes, FaBars } from 'react-icons/fa';
import { RiNotification2Fill } from "react-icons/ri";
import { PiDropFill } from "react-icons/pi";
import { useAuth } from '../hooks/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const { data } = useData();
    
    // const notificationsCount = data.notifications.length();
    // console.log(notificationsCount);
    console.log('data is: ', data);
    
    

    // Blood drop animation state
    const [drops, setDrops] = useState([]);
    

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
            const path = data?.isAdmin 
                ? `/admin/dashboard/${data.id}` 
                : `/donor/dashboard/${data.id}`;
            navigate(path);
        } else {
            setShowLoginPopup(true);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
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

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${
                    isScrolled ? "bg-red-700 shadow-xl" : "bg-gradient-to-r from-red-700 to-red-600"
                } text-white fixed top-0 left-0 w-full z-50 transition-colors duration-300`}
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
                                        onClick={() => setShowNotification(!showNotification)}
                                        className="p-2 rounded-full hover:bg-red-800 transition-colors relative"
                                    >
                                        <RiNotification2Fill className="text-xl" />
                                        {data?.notifications?.length > 0 && (
                                            <span className="absolute top-0 right-0 bg-yellow-400 text-red-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {data.notifications.length}
                                            </span>
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {showNotification && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                                            >
                                                <div className="p-4 border-b">
                                                    <h3 className="font-bold text-gray-800 flex items-center">
                                                        <RiNotification2Fill className="mr-2 text-red-600" />
                                                            {labels[language].notifications}
                                                            {data?.notifications?.length > 0 && (
                                                                <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                                                    {data.notifications.length} {language === 'en' ? 'new' : 'جديد'}
                                                                </span>
                                                            )}
                                                    </h3>
                                                </div>
                                                <div className="divide-y max-h-96 overflow-y-auto">
                                                    {data?.notifications?.length > 0 ? (
                                                        data.notifications.map((notification, index) => (
                                                            <div 
                                                                key={index} 
                                                                className={`p-4 hover:bg-red-50 cursor-pointer ${
                                                                    notification.urgent ? 'bg-red-50 border-l-4 border-red-500' : ''
                                                                }`}
                                                                onClick={() => {
                                                                    setShowNotification(false);
                                                                }}
                                                            >
                                                                <div className="flex justify-between items-start">
                                                                    <span className={`font-medium ${
                                                                        notification.urgent ? 'text-red-600' : 'text-gray-800'
                                                                    }`}>
                                                                        {notification.title || 
                                                                        (notification.urgent ? labels[language].urgent : labels[language].all)}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {new Date(notification.timestamp).toLocaleTimeString([], {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm mt-1 text-gray-600">
                                                                    {notification.message}
                                                                </p>
                                                                {notification.bloodType && (
                                                                    <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                                                        {notification.bloodType}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-6 text-center text-gray-500">
                                                            <RiNotification2Fill className="mx-auto text-3xl text-gray-300 mb-2" />
                                                            <p>{language === 'en' ? 'No new notifications' : 'لا توجد إشعارات جديدة'}</p>
                                                        </div>
                                                    )}          
                                                </div>
                                                {data?.notifications?.length > 0 && (
                                                    <div className="p-3 bg-gray-50 text-center border-t">
                                                        <Link 
                                                            to="/notifications" 
                                                            className="text-sm text-red-600 hover:underline font-medium"
                                                            onClick={() => setShowNotification(false)}
                                                        >
                                                            {language === 'en' ? 'View all notifications' : 'عرض جميع الإشعارات'}
                                                        </Link>
                                                    </div>
                                                )}
                                            </motion.div>
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
                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-red-700"></div>
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
                                to="/donate" 
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
                                                to={data?.isAdmin 
                                                    ? `/admin/dashboard/${data.id}` 
                                                    : `/donor/dashboard/${data.id}`}
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
                                                to="/donate" 
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
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={handleClosePopup}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl p-6 shadow-xl w-96 max-w-full mx-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={handleClosePopup}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                            
                            <div className="text-center mb-6">
                                <PiDropFill className="text-red-600 text-5xl mx-auto mb-3 animate-pulse" />
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {labels[language].loginAs}
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    {language === 'en' 
                                        ? 'Join us in saving lives' 
                                        : 'انضم إلينا لإنقاذ الأرواح'}
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleNavigation("/login?role=hospital")}
                                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                                >
                                    <FaUser className="mr-2" />
                                    {labels[language].hospital}
                                </button>
                                <button
                                    onClick={() => handleNavigation("/login?role=donor")}
                                    className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center"
                                >
                                    <PiDropFill className="mr-2" />
                                    {labels[language].donor}
                                </button>
                            </div>
                            
                            <div className="mt-6 text-center text-sm text-gray-500">
                                {language === 'en' 
                                    ? "Don't have an account? " 
                                    : "ليس لديك حساب؟ "}
                                <Link 
                                    to="/register" 
                                    className="text-red-600 hover:underline"
                                    onClick={handleClosePopup}
                                >
                                    {language === 'en' ? 'Register now' : 'سجل الآن'}
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;