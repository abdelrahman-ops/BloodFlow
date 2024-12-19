import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/LanguageContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import assets from '../assets/assets.js';
import { useAuth } from '../hooks/AuthContext.jsx';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const labels = {
        en: {
            about: "About Us",
            events: "Events",
            features: "Features",
            contact: "Contact Us",
            login: "Login",
            loginAs: "You Can Login As",
            hospital: "Hospital Admin",
            donor: "Donor",
            close: "Close",
        },
        ar: {
            about: "عن المشروع",
            events: "أحداث",
            features: "الميزات",
            contact: "تواصل معنا",
            login: "سجل",
            loginAs: "يمكنك تسجيل الدخول كـ",
            hospital: "مسؤول المستشفى",
            donor: "متبرع",
            close: "إغلاق",
        },
    };

    const handleLoginClick = () => {
        if(isAuthenticated){
            navigate('/dashboard');
        }
        else {
            setShowLoginPopup(true);
        }
        
    };

    const handleClosePopup = () => {
        setShowLoginPopup(false);
    };

    const handleNavigation = (path) => {
        console.log("clicked" , isAuthenticated)
        if (isAuthenticated) {
            // navigate(`/dashboard/${user.id}`);
            navigate('/donor/dashboard');
        } else {
            navigate(path);
        }
        setShowLoginPopup(false);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${
                    isScrolled ? "bg-red-700 shadow-lg" : "bg-red-600"
                } text-white py-4 px-6 md:px-8 fixed top-0 left-0 w-full z-50`}
            >
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <h1 className="text-xl md:text-2xl font-bold flex flex-row">
                            BloodFlow
                        </h1>
                    </Link>

                    <ul className={`hidden md:flex space-x-14`}>
                        <li>
                            <Link to="/about-us" className="hover:underline">
                                {labels[language].about}
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className="hover:underline">
                                {labels[language].events}
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="hover:underline">
                                {labels[language].contact}
                            </Link>
                        </li>
                        <li>
                            <a href="/#features" className="hover:underline">
                                {labels[language].features}
                            </a>
                        </li>
                    </ul>

                    <div className="flex flex-row justify-between gap-3 items-center">
                        <button
                            onClick={handleLoginClick}
                            className="text-white md:text-2xl"
                        >
                            <img src={assets.icons.profile} alt="" className="h-10" />
                        </button>

                        <button
                            className="text-white bg-[#0D1321] px-4 py-2 rounded-[1500px] hover:bg-gray-700"
                            onClick={toggleLanguage}
                        >
                            {language === "en" ? "عربي" : "English"}
                        </button>

                        <button
                            className="md:hidden text-white focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <img
                                src={`${isMenuOpen ? assets.icons.close : assets.icons.menu2}`}
                                className="h-10"
                                alt=""
                            />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4 flex flex-col items-center bg-red-700 py-4 rounded-lg shadow-lg">
                        <Link to="/about-us" className="hover:underline">
                            {labels[language].about}
                        </Link>

                        <Link to="/events" className="hover:underline">
                            {labels[language].events}
                        </Link>

                        <Link to="/contact-us" className="hover:underline">
                            {labels[language].contact}
                        </Link>

                        <a href="/#features" className="hover:underline">
                            {labels[language].features}
                        </a>
                    </div>
                )}
            </motion.nav>

            {showLoginPopup && (
                <div className="fixed inset-0 bg-[#0D1321] bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                        <h2 className="text-xl font-bold text-center mb-4">
                            {labels[language].loginAs}
                        </h2>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => handleNavigation("/login")}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                {labels[language].hospital}
                            </button>
                            <button
                                onClick={() => handleNavigation("/login")}
                                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                            >
                                {labels[language].donor}
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                {labels[language].close}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
