/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { PiDropFill } from 'react-icons/pi';
import { IoMdLocate } from 'react-icons/io';
import { useState } from 'react';

const QuickSearch = ({ 
  language, 
  content, 
  bloodTypes,
  onSearch,
  isLoading,
  error
}) => {
  const [location, setLocation] = useState("");
  const [bloodType, setBloodType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, bloodType });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4">
        {content.searchTitle}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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
                required
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
  );
};

export default QuickSearch;