import { Link } from "react-router-dom";
import assets from '../assets/assets';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
    return (
        <footer
            id="contact"
            className="relative bg-cover bg-center bg-no-repeat text-white py-12 text-center"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url('${assets.images.doctors}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Overlay for smooth fading effect */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Footer Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12">
                {/* Logo or Title */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-red-500">BloodFlow</h2>
                    <p className="text-lg mt-2">Saving lives, one drop at a time.</p>
                </div>

                {/* Navigation Links */}
                <div className="mt-8 flex justify-center space-x-8">
                    <Link
                        to="/privacy-policy"
                        className="text-gray-300 hover:text-white transition duration-300 ease-in-out text-lg"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        to="/terms"
                        className="text-gray-300 hover:text-white transition duration-300 ease-in-out text-lg"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        to="/contact-us"
                        className="text-gray-300 hover:text-white transition duration-300 ease-in-out text-lg"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 flex justify-center space-x-6 text-2xl">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-red-500 transition duration-300 ease-in-out"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-red-500 transition duration-300 ease-in-out"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-red-500 transition duration-300 ease-in-out"
                    >
                        <IoLogoInstagram />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-red-500 transition duration-300 ease-in-out"
                    >
                        <FaLinkedinIn />
                    </a>
                </div>

                {/* Subscription Form */}
                <div className="mt-8">
                    <p className="text-xl mb-4">Stay updated with our latest news</p>
                    <div className="flex justify-center items-center space-x-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="py-2 px-4 rounded-l-lg border-2 border-red-500 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button className="py-2 px-6 rounded-r-lg bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-sm">
                    <p>&copy; 2024 BloodFlow Blood Bank. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
