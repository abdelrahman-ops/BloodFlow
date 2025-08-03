import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegHospital, FaPhoneAlt, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { IoLogoInstagram, IoMdWater } from "react-icons/io";
import { GiHeartBeats } from "react-icons/gi";
import { motion } from "framer-motion";
import { BsDropletFill } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="relative bg-gray-900 text-white overflow-hidden">
            {/* Blood drop decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
                <BsDropletFill className="w-full h-full text-red-500" />
            </div>
            <div className="absolute bottom-10 right-10 w-40 h-40 opacity-5">
                <GiHeartBeats className="w-full h-full text-red-500" />
            </div>
            
            {/* Main footer content */}
            <div className="relative z-10 container mx-auto px-6 py-16 md:py-20 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-2">
                            <IoMdWater className="text-4xl text-red-500" />
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                                BloodFlow
                            </h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Connecting donors with those in need since 2024. Every drop counts in our mission to save lives.
                        </p>
                        <div className="flex space-x-4 text-xl">
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                                <IoLogoInstagram />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/donate" className="text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center space-x-2">
                                    <BsDropletFill className="text-red-500" />
                                    <span>Donate Blood</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/find-donors" className="text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center space-x-2">
                                    <FaRegHospital className="text-red-500" />
                                    <span>Find Donors</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/campaigns" className="text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center space-x-2">
                                    <GiHeartBeats className="text-red-500" />
                                    <span>Blood Drives</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center space-x-2">
                                    <IoMdWater className="text-red-500" />
                                    <span>About Us</span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-red-500 mt-1" />
                                <span className="text-gray-300">123 LifeSaver Street, BloodCity, BC 10001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhoneAlt className="text-red-500" />
                                <span className="text-gray-300">+1 (800) DONATE-NOW</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaRegClock className="text-red-500" />
                                <span className="text-gray-300">24/7 Emergency Hotline</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">
                            Stay Updated
                        </h3>
                        <p className="text-gray-300">
                            Join our newsletter for blood donation alerts and community updates.
                        </p>
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} BloodFlow. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                            Terms of Service
                        </Link>
                        <Link to="/faq" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                            FAQ
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Emergency CTA */}
            <div className="bg-gradient-to-r from-red-700 to-red-800 py-4 px-6 text-center">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                        <GiHeartBeats className="text-2xl text-white mr-3 animate-pulse" />
                        <span className="text-white font-bold text-lg">
                            EMERGENCY BLOOD NEED?
                        </span>
                    </div>
                    <a 
                        href="tel:+18003668433" 
                        className="bg-white text-red-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center"
                    >
                        <FaPhoneAlt className="mr-2" />
                        CALL NOW: 1-800-DONATE
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;