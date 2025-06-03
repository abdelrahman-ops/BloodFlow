import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';
import { FaSearch, FaTint, FaPhone, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { PiDropFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

const SearchResults = () => {
    const { language } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get query parameters
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get('location') || '';
    const bloodTypeParam = queryParams.get('bloodType') || '';

    useEffect(() => {
        // Simulate API call
        const fetchResults = async () => {
            setIsLoading(true);
            try {
                // Mock data - in a real app you would fetch from an API
                setTimeout(() => {
                    const mockData = Array.from({ length: 12 }, (_, i) => ({
                        id: i + 1,
                        name: `Donor ${i + 1}`,
                        bloodType: bloodTypeParam,
                        city: locationParam || (i % 2 === 0 ? (language === 'en' ? "Riyadh" : "الرياض") : (language === 'en' ? "Jeddah" : "جدة")),
                        phone: `05${Math.floor(10000000 + Math.random() * 90000000)}`,
                        lastDonation: `${Math.floor(Math.random() * 12) + 1} ${language === 'en' ? 'months ago' : 'شهر مضت'}`,
                        available: Math.random() > 0.3
                    }));
                    setResults(mockData);
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error fetching results:", error);
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [locationParam, bloodTypeParam, language]);

    const content = {
        en: {
            title: "Search Results",
            noResults: "No donors found. Try a different search.",
            donorCard: {
                available: "Available for donation",
                lastDonation: "Last donated",
                contact: "Contact",
                location: "Location"
            },
            backButton: "Back to search"
        },
        ar: {
            title: "نتائج البحث",
            noResults: "لم يتم العثور على متبرعين. حاول بحثًا مختلفًا.",
            donorCard: {
                available: "متاح للتبرع",
                lastDonation: "آخر تبرع",
                contact: "اتصال",
                location: "الموقع"
            },
            backButton: "العودة إلى البحث"
        }
    }[language];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="container mx-auto px-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-red-600 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    {content.backButton}
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {content.title}
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    {language === 'en' 
                        ? `Showing results for ${bloodTypeParam} blood type${locationParam ? ` in ${locationParam}` : ''}`
                        : `عرض النتائج لفصيلة الدم ${bloodTypeParam}${locationParam ? ` في ${locationParam}` : ''}`}
                </p>

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((donor) => (
                            <motion.div
                                key={donor.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                                        <button className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300">
                                            {language === 'en' ? 'Request Donation' : 'طلب تبرع'}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <PiDropFill className="mx-auto text-5xl text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">{content.noResults}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;