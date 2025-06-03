import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ language, content, bloodTypes }) => {
    const [location, setLocation] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        
        if (!bloodType) {
            setError(content.searchError || 'Please select a blood type');
            return;
        }

        // Navigate to search results page with query parameters
        navigate(`/search-donors?location=${encodeURIComponent(location)}&bloodType=${encodeURIComponent(bloodType)}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
            <h3 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Find Blood Donors' : 'ابحث عن متبرعين بالدم'}
            </h3>
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="location" className="sr-only">
                            {content.searchPlaceholder}
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="location"
                                placeholder={content.searchPlaceholder}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-white/70"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-white/70" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="bloodType" className="sr-only">
                            {content.bloodTypePlaceholder}
                        </label>
                        <select
                            id="bloodType"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 text-white appearance-none"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                        >
                            <option value="" disabled>
                                {content.bloodTypePlaceholder}
                            </option>
                            {bloodTypes.map(type => (
                                <option key={type} value={type} className="text-gray-900">
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {error && (
                    <p className="text-red-300 text-sm -mb-2">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                    <FaSearch className="mr-2" />
                    {content.searchButton}
                </button>
            </form>
        </motion.div>
    );
};

export default SearchForm;