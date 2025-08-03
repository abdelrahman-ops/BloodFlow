/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaArrowRight, FaPhone, FaTint, FaMapMarkerAlt } from 'react-icons/fa';
import { PiDropFill } from 'react-icons/pi';

const DonorResults = ({
  showResults,
  setShowResults,
  results,
  currentPage,
  totalPages,
  paginate,
  indexOfFirstResult,
  indexOfLastResult,
  bloodType,
  location,
  language,
  content,
  isLoading
}) => {
  return (
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
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col"
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

            <div className="p-8 pb-4">
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
            </div>

            <div className="flex-1 overflow-y-auto px-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                    {results.slice(indexOfFirstResult, indexOfLastResult).map((donor) => (
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
                </>
              ) : (
                <div className="text-center py-12">
                  <PiDropFill className="mx-auto text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">{content.noResults}</p>
                </div>
              )}
            </div>

            {/* Pagination - Placed outside the scrollable area */}
            {results.length > 0 && totalPages > 1 && (
              <div className="p-8 pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonorResults;