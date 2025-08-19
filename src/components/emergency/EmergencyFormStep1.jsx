/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FaPhone, FaHospital, FaUser, FaTint, FaNotesMedical, FaSpinner } from 'react-icons/fa';
import { PiDropFill } from "react-icons/pi";
import { MdLocationOn, MdGpsFixed } from 'react-icons/md';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import {url} from '../../api/constant/URL';

const EmergencyFormStep1 = ({
  formData,
  handleChange,
  setFormData,
  locationMethod,
  handleLocationMethod,
  governorates,
  bloodTypes,
  t,
  language,
  setStep
}) => {
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [hospitalSearch, setHospitalSearch] = useState('');
  const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoadingHospitals(true);
        const response = await axios.get(`${url}/hospitals'`);
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        toast.error(language === 'en' 
          ? 'Failed to load hospitals. Please try again later.' 
          : 'فشل تحميل المستشفيات. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoadingHospitals(false);
      }
    };

    fetchHospitals();
  }, [language]);

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(hospitalSearch.toLowerCase())
  );

  const handleHospitalSelect = (hospitalId, hospitalName) => {
    setFormData(prev => ({
      ...prev,
      hospital: hospitalId,
      hospitalName: hospitalName,
      coordinates: null
    }));
    setHospitalSearch(hospitalName);
    setShowHospitalDropdown(false);
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6"
    >
      <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
        <div className="grid grid-cols-1 gap-4">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FaUser className="mr-2 text-red-500" />
              {language === 'en' ? 'Patient Information' : 'معلومات المريض'}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.name[language]} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.phone[language]} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Blood Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FaTint className="mr-2 text-red-500" />
              {language === 'en' ? 'Blood Details' : 'تفاصيل الدم المطلوب'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.bloodType[language]} <span className="text-red-500">*</span>
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">{language === 'en' ? 'Select blood type' : 'اختر فصيلة الدم'}</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.units[language]} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PiDropFill className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="units"
                    min="1"
                    max="10"
                    value={formData.units}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.urgency[language]} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Object.entries(t.urgencyOptions).map(([key, value]) => (
                    <label key={key} className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all ${
                      formData.urgency === key 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-red-300'
                    }`}>
                      <input
                        type="radio"
                        name="urgency"
                        value={key}
                        checked={formData.urgency === key}
                        onChange={handleChange}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm">{value[language]}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <MdLocationOn className="mr-2 text-red-500" />
              {language === 'en' ? 'Location Information' : 'معلومات الموقع'}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.formLabels.location[language]} <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleLocationMethod('gps')}
                      className={`flex items-center justify-center gap-2 p-2 text-sm rounded-lg transition-all ${
                        locationMethod === 'gps'
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <MdGpsFixed />
                      {t.actions.getLocation[language]}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLocationMethod('manual')}
                      className={`flex items-center justify-center gap-2 p-2 text-sm rounded-lg transition-all ${
                        locationMethod === 'manual'
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <MdLocationOn />
                      {t.actions.manualLocation[language]}
                    </button>
                  </div>

                  {locationMethod === 'manual' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.formLabels.governorate[language]} <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="governorate"
                          value={formData.governorate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                        >
                          <option value="">{language === 'en' ? 'Select governorate' : 'اختر المحافظة'}</option>
                          {governorates.map(gov => (
                            <option key={gov.name} value={gov.name}>{gov.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.formLabels.district[language]} <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          required
                          disabled={!formData.governorate}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                        >
                          <option value="">{language === 'en' ? 'Select district' : 'اختر الحي/المدينة'}</option>
                          {formData.governorate && 
                            governorates
                              .find(g => g.name === formData.governorate)
                              ?.districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                              ))
                          }
                        </select>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Hospital Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.hospital[language]}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {loadingHospitals ? (
                      <FaSpinner className="text-gray-400 animate-spin" />
                    ) : (
                      <FaHospital className="text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={hospitalSearch}
                    onChange={(e) => {
                      setHospitalSearch(e.target.value);
                      setShowHospitalDropdown(true);
                    }}
                    onFocus={() => setShowHospitalDropdown(true)}
                    placeholder={language === 'en' ? 'Search hospitals...' : 'ابحث عن مستشفيات...'}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {showHospitalDropdown && hospitalSearch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
                  >
                    {filteredHospitals.length > 0 ? (
                      filteredHospitals.map(hospital => (
                        <div
                          key={hospital._id}
                          className={`p-2 hover:bg-red-50 cursor-pointer ${
                            formData.hospitalId === hospital._id ? 'bg-red-100' : ''
                          }`}
                          onClick={() => handleHospitalSelect(hospital._id, hospital.name)}
                        >
                          <div className="font-medium">{hospital.name}</div>
                          <div className="text-xs text-gray-500">
                            {hospital.address.city}, {hospital.address.street}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">
                        {language === 'en' ? 'No hospitals found' : 'لم يتم العثور على مستشفيات'}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Hidden input to store hospital ID */}
                <input
                  type="hidden"
                  name="hospitalId"
                  value={formData.hospitalId || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.formLabels.notes[language]}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <FaNotesMedical className="text-gray-400" />
                  </div>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium py-2 px-5 rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center gap-2"
          >
            {t.actions.next[language]}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmergencyFormStep1;