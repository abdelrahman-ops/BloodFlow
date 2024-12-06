import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import BD3 from '../assets/blood3png.png';
import assets from '../assets/assets.js'
import { useLanguage } from '../hooks/LanguageContext.jsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
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
            donate: "Login",
        },
        ar: {
            about: "عن المشروع",
            events: "ايفنتس",
            features: "الميزات",
            contact: "تواصل معنا",
            donate: "سجل",
        },
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
                    <div className='flex justify-between items-center'>

                        <h1 className="text-xl md:text-2xl font-bold flex flex-row">
                            {/* <span><img src={assets.icons.blood} className='h-10' alt="" /></span> */}
                            BloodFlow
                        </h1>
                        
                        <ul
                            className={`hidden md:flex space-x-14 ${
                                language === "ar" ? "flex-row" : ""
                            }`}
                            >
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
                                <a href="#features" className="hover:underline">
                                    {labels[language].features}
                                </a>
                            </li>
                            
                        </ul>

                        <div className='flex flex-row justify-between gap-3'>
                            <div className="flex items-center space-x-4">
                                <button className="hidden md:block bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200">
                                    {labels[language].donate}
                                </button>
                                <button
                                    className="text-white bg-gray-800 px-4 py-2 rounded-[1500px] hover:bg-gray-700"
                                    onClick={toggleLanguage}
                                >
                                    {language === "en" ? "عربي" : "English"}
                                </button>
                            </div>

                            <button
                                className="md:hidden text-white focus:outline-none"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                                </svg>
                            </button>
                        </div>

                    </div>



                    {isMenuOpen && (
                        <div className="md:hidden mt-4 space-y-4 flex flex-col items-center bg-red-700 py-4 rounded-lg shadow-lg">
                            <a href="#about" className="text-white hover:underline">About</a>
                            <a href="#features" className="text-white hover:underline">Features</a>
                            <a href="#contact" className="text-white hover:underline">Contact</a>
                            <button className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200">
                                Donate Now
                            </button>
                        </div>
                    )}
                </motion.nav>

                {isScrolled && (

                    <motion.nav
                        initial={{ backgroundSize: '120%' }} // Slightly larger start
                        animate={{ backgroundSize: '150%' }} // Grow to a larger size
                        transition={{
                            type: 'spring',
                            stiffness: 80, // Softer spring effect
                            damping: 20,
                            duration: 1.2, // Slightly longer duration for smoothness
                        }}
                    className=" top-10 left-10 h-96 w-48  justify-center items-center py-4 z-50 rounded-full
                                hidden md:flex fixed  blood
                    "
                    style={{
                        backgroundImage: `url(${assets.icons.blood})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover', // Ensures it fills the container
                    }}
                >
                    {/* Centered Content */}
                    <ul className="flex flex-col justify-center items-center space-y-4 text-white">
                        <li><a href="#about" className=" hover:text-gray-200">About</a></li>
                        <li><a href="#features" className=" hover:text-gray-200">Features</a></li>
                        <li><a href="#contact" className=" hover:text-gray-200">Contact</a></li>
                    </ul>
                </motion.nav>
                )}
                
        </>
    );
};

export default Navbar;
