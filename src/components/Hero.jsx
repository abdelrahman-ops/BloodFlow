import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/LanguageContext';
import { FaSearch, FaTint, FaHeartbeat, FaHandsHelping, FaPhone, FaMapMarkerAlt, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PiDropFill } from 'react-icons/pi';
import { IoMdLocate } from 'react-icons/io';
import bloodDrop from '../assets/icons/blood.png';
import Stats from './Stats';
import { Link } from "react-router-dom";

const Hero = () => {
    const { language } = useLanguage();
    const [showResults, setShowResults] = useState(false);
    const [location, setLocation] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const resultsPerPage = 8;

    const textContent = {
        en: {
            heading: "Save Lives with Every Drop",
            description: "Join our mission to connect blood donors with those in need. Your donation can save up to 3 lives.",
            donorOption: "Become a Donor",
            needBloodOption: "Request Blood",
            searchPlaceholder: "Search by city or district...",
            bloodTypePlaceholder: "Select blood type",
            searchButton: "Find Donors",
            emergencyButton: "Emergency? Click Here",
            searchTitle: "Find Blood Donors",
            searchDescription: "Search our database of registered blood donors",
            noResults: "No donors found. Try a different search.",
            error: "Please select a blood type to search",
            donorCard: {
                available: "Available for donation",
                lastDonation: "Last donated",
                contact: "Contact",
                location: "Location"
            },
            pagination: {
                previous: "Previous",
                next: "Next",
                showing: "Showing",
                of: "of",
                results: "results"
            },
            stats: {
                donors: "Active Donors",
                donations: "Lives Saved",
                centers: "Donation Centers"
            }
        },
        ar: {
            heading: "أنقذ الأرواح بكل قطرة",
            description: "انضم إلى مهمتنا لربط المتبرعين بالدم مع المحتاجين. تبرعك يمكنه إنقاذ حتى 3 أرواح.",
            donorOption: "كن متبرعًا",
            needBloodOption: "طلب دم",
            searchPlaceholder: "ابحث حسب المدينة أو المنطقة...",
            bloodTypePlaceholder: "اختر فصيلة الدم",
            searchButton: "ابحث عن متبرعين",
            emergencyButton: "حالة طارئة؟ اضغط هنا",
            searchTitle: "ابحث عن متبرعين بالدم",
            searchDescription: "ابحث في قاعدة بيانات المتبرعين المسجلين لدينا",
            noResults: "لم يتم العثور على متبرعين. حاول بحثًا مختلفًا.",
            error: "الرجاء اختيار فصيلة الدم للبحث",
            donorCard: {
                available: "متاح للتبرع",
                lastDonation: "آخر تبرع",
                contact: "اتصال",
                location: "الموقع"
            },
            pagination: {
                previous: "السابق",
                next: "التالي",
                showing: "عرض",
                of: "من",
                results: "نتائج"
            },
            stats: {
                donors: "متبرعين نشطين",
                donations: "حياة تم إنقاذها",
                centers: "مراكز التبرع"
            }
        },
    };

    const content = textContent[language];
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        setResults([]);
        setIsLoading(true);
        setShowResults(false);

        if (!bloodType) {
            setError(content.error);
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            try {
                // Mock data - in a real app you would fetch from an API
                const mockData = Array.from({ length: 24 }, (_, i) => ({
                    id: i + 1,
                    name: `Donor ${i + 1}`,
                    bloodType: bloodType,
                    city: location || (i % 2 === 0 ? (language === 'en' ? "Riyadh" : "الرياض") : (language === 'en' ? "Jeddah" : "جدة")),
                    phone: `05${Math.floor(10000000 + Math.random() * 90000000)}`,
                    lastDonation: `${Math.floor(Math.random() * 12) + 1} ${language === 'en' ? 'months ago' : 'شهر مضت'}`,
                    available: Math.random() > 0.3
                }));

                setResults(mockData);
                setCurrentPage(1);
                setShowResults(true);
            } catch {
                setError(language === 'en' ? "Failed to load donor data" : "فشل تحميل بيانات المتبرعين");
            } finally {
                setIsLoading(false);
            }
        }, 800);
    };

    // Calculate pagination
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(results.length / resultsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="relative text-white min-h-screen flex items-center justify-center pt-16 pb-32">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 to-black/50" />
            <div 
                className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
                style={{ 
                    backgroundPosition: language === 'ar' ? 'left center' : 'right center',
                    filter: 'brightness(0.7)'
                }}
            />
            
            {/* Animated blood drops - optimized for performance */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-red-400/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 12}px`
                        }}
                        animate={{
                            y: [0, window.innerHeight],
                            opacity: [0.4, 0],
                            rotate: [0, Math.random() * 360]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 3
                        }}
                    >
                        <PiDropFill />
                    </motion.div>
                ))}
            </div>

            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 z-10 ${language === "ar" ? "rtl" : "ltr"}`}>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-8">
                    {/* Left content */}
                    <div className="w-full lg:w-1/2">
                        {/* Main heading with pulse animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left mb-8"
                        >
                            <div className="flex flex-col items-center lg:items-start mb-6">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="mb-4 lg:mb-6"
                                >
                                    <img 
                                        src={bloodDrop} 
                                        alt="Blood drop" 
                                        className="h-14 w-14 md:h-16 md:w-16 drop-shadow-lg" 
                                        loading="eager"
                                    />
                                </motion.div>
                                <motion.h1 
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {content.heading}
                                </motion.h1>
                            </div>
                            <motion.p 
                                className="text-lg md:text-xl mt-4 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {content.description}
                            </motion.p>
                        </motion.div>

                        {/* Search form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-4">
                                {content.searchTitle}
                            </h3>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="location" className="sr-only">
                                            {content.searchPlaceholder}
                                        </label>
                                        <div className="relative">
                                            <IoMdLocate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-300 text-xl" />
                                            <input
                                                type="text"
                                                id="location"
                                                placeholder={content.searchPlaceholder}
                                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-white/70 transition-all duration-200 hover:bg-white/30"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="bloodType" className="sr-only">
                                            {content.bloodTypePlaceholder}
                                        </label>
                                        <div className="relative">
                                            <PiDropFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-300 text-xl" />
                                            <select
                                                id="bloodType"
                                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 text-white appearance-none transition-all duration-200 hover:bg-white/30"
                                                value={bloodType}
                                                onChange={(e) => setBloodType(e.target.value)}
                                            >
                                                <option value="">{content.bloodTypePlaceholder}</option>
                                                {bloodTypes.map(type => (
                                                    <option key={type} value={type} className="text-gray-900">
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-red-500/30 ${isLoading ? 'opacity-80' : ''}`}
                                >
                                    {isLoading ? (
                                        <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            <FaSearch className="mr-2" />
                                            {content.searchButton}
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.div 
                                className="mt-4 bg-red-500/20 border-l-4 border-red-500 text-red-100 p-4 rounded-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Right content */}
                    <div className="w-full lg:w-1/2">
                        {/* Stats component */}
                        <div className="mb-10">
                            <Stats />
                        </div>

                        {/* Call-to-Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                        >
                            <Link
                                to="/donate-blood"
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-center"
                            >
                                <FaTint className="mr-3 text-xl" />
                                {content.donorOption}
                            </Link>
                            <Link
                                to="/blood-requests"
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-red-600 font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-center"
                            >
                                <FaHandsHelping className="mr-3 text-xl" />
                                {content.needBloodOption}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Results Panel */}
            <AnimatePresence>
                {showResults && (
                    <motion.div 
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowResults(false)}
                    >
                        <motion.div 
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors z-10"
                                onClick={() => setShowResults(false)}
                            >
                                <FaTimes className="text-2xl" />
                            </button>

                            <div className="overflow-y-auto h-full">
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800">
                                                {content.searchTitle}
                                            </h2>
                                            <p className="text-lg text-gray-600">
                                                {language === 'en' 
                                                    ? `Showing results for ${bloodType} blood type${location ? ` in ${location}` : ''}`
                                                    : `عرض النتائج لفصيلة الدم ${bloodType}${location ? ` في ${location}` : ''}`}
                                            </p>
                                        </div>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex justify-center items-center py-20">
                                            <div className="animate-pulse flex flex-col items-center">
                                                <PiDropFill className="text-red-500 text-5xl mb-4 animate-bounce" />
                                                <p className="text-gray-600">
                                                    {language === 'en' ? 'Searching for donors...' : 'جاري البحث عن متبرعين...'}
                                                </p>
                                            </div>
                                        </div>
                                    ) : results.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {currentResults.map((donor) => (
                                                    <motion.div
                                                        key={donor.id}
                                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="p-6">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-gray-800">
                                                                        {donor.name}
                                                                    </h3>
                                                                    <div className="flex items-center mt-1">
                                                                        <PiDropFill className={`text-red-500 mr-2 ${donor.available ? '' : 'opacity-50'}`} />
                                                                        <span className={`font-medium ${donor.available ? 'text-red-600' : 'text-gray-500'}`}>
                                                                            {donor.bloodType}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${donor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                    {donor.available ? content.donorCard.available : 'Not available'}
                                                                </span>
                                                            </div>

                                                            <div className="space-y-3 text-sm text-gray-600">
                                                                <div className="flex items-center">
                                                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                                                    <span>{donor.city}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaTint className="mr-2 text-gray-400" />
                                                                    <span>{content.donorCard.lastDonation}: {donor.lastDonation}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaPhone className="mr-2 text-gray-400" />
                                                                    <a href={`tel:${donor.phone}`} className="text-red-600 hover:underline">
                                                                        {content.donorCard.contact}
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            {donor.available && (
                                                                <button className="mt-4 w-full py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-colors duration-300">
                                                                    {language === 'en' ? 'Request Donation' : 'طلب تبرع'}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Pagination */}
                                            {totalPages > 1 && (
                                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                                    <div className="text-sm text-gray-600">
                                                        {content.pagination.showing} {indexOfFirstResult + 1}-{Math.min(indexOfLastResult, results.length)} {content.pagination.of} {results.length} {content.pagination.results}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => paginate(currentPage - 1)}
                                                            disabled={currentPage === 1}
                                                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                                        >
                                                            {language === 'ar' ? <FaArrowRight className="ml-1" /> : <FaArrowLeft className="mr-1" />}
                                                            {content.pagination.previous}
                                                        </button>
                                                        <button
                                                            onClick={() => paginate(currentPage + 1)}
                                                            disabled={currentPage === totalPages}
                                                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                                        >
                                                            {content.pagination.next}
                                                            {language === 'ar' ? <FaArrowLeft className="mr-1" /> : <FaArrowRight className="ml-1" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-12">
                                            <PiDropFill className="mx-auto text-5xl text-gray-300 mb-4" />
                                            <p className="text-gray-500 text-lg">{content.noResults}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Emergency button - fixed position */}
            <Link 
                to="/emergency" 
                className="fixed right-4 bottom-4 md:right-6 md:bottom-6 px-4 py-2 md:px-5 md:py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold rounded-full shadow-lg transition-all duration-300 flex items-center z-50 animate-pulse"
                aria-label="Emergency blood request"
            >
                <FaHeartbeat className="mr-2" />
                <span className="hidden sm:inline">{content.emergencyButton}</span>
                <span className="sm:hidden">{language === 'en' ? 'Emergency' : 'طارئ'}</span>
            </Link>

            {/* Scroll indicator for desktop */}
            <motion.div 
                className="hidden md:flex flex-col items-center absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-sm mb-2 opacity-80">
                    {language === 'en' ? 'Scroll down' : 'قم بالتمرير لأسفل'}
                </span>
                <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
                    <motion.div 
                        className="w-1 h-2 bg-white rounded-full mt-1"
                        animate={{ y: [0, 6], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;