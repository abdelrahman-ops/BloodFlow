import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BD3 from '../assets/blood3png.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <>
            {!isScrolled ? (
                // Normal Navbar
                <motion.nav
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-red-600 text-white py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50"
                >
                    <h1 className="text-2xl font-bold">BloodFlow</h1>
                    <ul className="flex space-x-6">
                        <li><a href="#about" className="hover:underline">About</a></li>
                        <li><a href="#features" className="hover:underline">Features</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                    <button className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200">Donate Now</button>
                </motion.nav>
            ) : (
                // Blood Drop Navbar with scaling background
                <motion.nav
                    initial={{ backgroundSize: '120%' }} // Slightly larger start
                    animate={{ backgroundSize: '150%' }} // Grow to a larger size
                    transition={{
                        type: 'spring',
                        stiffness: 80, // Softer spring effect
                        damping: 20,
                        duration: 1.2, // Slightly longer duration for smoothness
                    }}
                    className="fixed top-10 left-10 h-96 w-48 flex flex-col justify-center items-center py-4 z-50 rounded-full"
                    style={{
                        backgroundImage: `url(${BD3})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover', // Ensures it fills the container
                    }}
                >
                    {/* Centered Content */}
                    <ul className="space-y-4 text-center">
                        <li>
                            <a href="#about" className="text-white hover:text-gray-200">About</a>
                        </li>
                        <li>
                            <a href="#features" className="text-white hover:text-gray-200">Features</a>
                        </li>
                        <li>
                            <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
                        </li>
                    </ul>
                </motion.nav>

            )}
        </>
    );
};

export default Navbar;
