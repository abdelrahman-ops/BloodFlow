/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiMapPin, FiNavigation, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

const LocationSection = ({ 
  formData, 
  setFormData,
  cities,
  districts,
  setDistricts,
  language
}) => {
  const [locationMethod, setLocationMethod] = useState("city");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const t = {
    en: {
      governorate: "Governorate",
      district: "District",
      exactLocation: "Exact Location (Optional)",
      locationInstructions: "Help us locate you faster in emergencies",
      cityOnly: "Select city only",
      preciseLocation: "Precise location",
      locateMe: "Locate Me",
      geolocationUnsupported: "Geolocation is not supported by your browser",
      geocodeError: "Couldn't determine exact address from coordinates",
      locationErrorDefault: "Could not determine your location",
      ipFallbackNotice: "Using approximate location from IP address",
      mapPreview: "Map Preview",
      confirmLocation: "Confirm your location is correctly pinned",
      selectOption: "Select an option",
      tryAgain: "Try Again",
      locating: "Locating...",
      detectedLocation: "Detected location: ",
      capturedAt: "Captured at: "
    },
    ar: {
      governorate: "المحافظة",
      district: "الحي/المدينة",
      exactLocation: "الموقع الدقيق (اختياري)",
      locationInstructions: "ساعدنا في تحديد موقعك بسرعة في حالات الطوارئ",
      cityOnly: "اختيار المحافظة فقط",
      preciseLocation: "تحديد دقيق",
      locateMe: "تحديد موقعي",
      geolocationUnsupported: "المتصفح الخاص بك لا يدعم خدمة الموقع",
      geocodeError: "تعذر تحديد العنوان الدقيق من الإحداثيات",
      locationErrorDefault: "تعذر تحديد موقعك",
      ipFallbackNotice: "جاري استخدام موقع تقريبي من عنوان IP",
      mapPreview: "معاينة الخريطة",
      confirmLocation: "تأكد من أن موقعك موضح بشكل صحيح",
      selectOption: "اختر خيارًا",
      tryAgain: "حاول مرة أخرى",
      locating: "جاري تحديد الموقع...",
      detectedLocation: "تم تحديد الموقع: ",
      capturedAt: "تم التحديد في: "
    }
  }[language];

  const handleLocationMethodChange = (method) => {
    setLocationMethod(method);
    if (method === "city") {
      setFormData(prev => ({ ...prev, exactLocation: "" }));
    }
  };

  const matchCityFromCoordinates = (cityName) => {
    if (!cityName || !cities.length) return null;
    
    const exactMatch = cities.find(c => 
      c.name.toLowerCase() === cityName.toLowerCase()
    );
    if (exactMatch) return exactMatch;

    const partialMatch = cities.find(c => 
      cityName.toLowerCase().includes(c.name.toLowerCase()) || 
      c.name.toLowerCase().includes(cityName.toLowerCase())
    );
    
    return partialMatch || null;
  };

  const handleLocateMe = async () => {
    setIsLocating(true);
    setLocationError(null);

    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        
        setFormData(prev => ({
          ...prev,
          coordinates: { lat: latitude, lon: longitude },
          locationCapturedAt: new Date().toISOString(),
          locationSource: "gps"
        }));

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          
          if (!response.ok) throw new Error("Geocoding failed");

          const data = await response.json();
          const address = {
            road: data.address.road || '',
            neighbourhood: data.address.neighbourhood || '',
            suburb: data.address.suburb || '',
            city: data.address.city || data.address.town || '',
            governorate: data.address.state || '',
            country: data.address.country || ''
          };
          
          const formattedAddress = [
            address.road,
            address.neighbourhood,
            address.suburb,
            address.city,
            address.governorate
          ].filter(Boolean).join(', ');

          const matchedCity = matchCityFromCoordinates(address.city || address.governorate);

          setFormData(prev => ({
            ...prev,
            exactLocation: formattedAddress,
            governorate: matchedCity?.name || address.governorate,
            district: address.city || address.suburb
          }));

          setShowMap(true);
        } catch (geocodeError) {
          console.error("Geocoding error:", geocodeError);
          setLocationError(t.geocodeError);
          setShowMap(true);
        }
      } else {
        throw new Error(t.geolocationUnsupported);
      }
    } catch (gpsError) {
      console.error("GPS error:", gpsError);
      
      try {
        const ipRes = await fetch("https://ipapi.co/json/");
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          setFormData(prev => ({
            ...prev,
            coordinates: { lat: ipData.latitude, lon: ipData.longitude },
            governorate: ipData.region,
            district: ipData.city,
            locationCapturedAt: new Date().toISOString(),
            locationSource: "ip"
          }));
          setLocationError(t.ipFallbackNotice);
          setShowMap(true);
        } else {
          throw new Error("IP geolocation failed");
        }
      } catch (ipError) {
        console.error("IP geolocation error:", ipError);
        setLocationError(t.locationErrorDefault);
      }
    } finally {
      setIsLocating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Update districts when governorate changes
      if (name === "governorate") {
        const selectedGov = cities.find(g => g.name === value);
        setDistricts(selectedGov?.districts || []);
        return { ...newData, district: "" }; // Reset district when governorate changes
      }
      
      return newData;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h4 className="font-medium text-lg text-gray-700 mb-6 flex items-center border-b pb-3">
        <FiMapPin className="mr-2 text-red-500" />
        {language === 'en' ? "Location Information" : "معلومات الموقع"}
        <span className="text-xs text-gray-500 ml-2">({t.locationInstructions})</span>
      </h4>

      <div className="space-y-5">
        {/* Location Method Selection */}
        <div className="flex flex-col space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {language === 'en' ? "Location Method" : "طريقة تحديد الموقع"}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleLocationMethodChange("city")}
              className={`px-4 py-3 rounded-lg transition-all flex items-center justify-center ${
                locationMethod === "city"
                  ? "bg-red-50 text-red-600 border-2 border-red-200"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              aria-pressed={locationMethod === 'city'}
              aria-label={language === 'en' ? "Select city-based location method" : "تحديد الموقع حسب المدينة"}
            >
              <FiMapPin className="mr-2" />
              {t.cityOnly}
            </button>
            <button
              type="button"
              onClick={() => handleLocationMethodChange("precise")}
              className={`px-4 py-3 rounded-lg transition-all flex items-center justify-center ${
                locationMethod === "precise"
                  ? "bg-red-50 text-red-600 border-2 border-red-200"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              aria-pressed={locationMethod === 'precise'}
              aria-label={language === 'en' ? "Select precise location method" : "تحديد الموقع الدقيق"}
            >
              <FiNavigation className="mr-2" />
              {t.preciseLocation}
            </button>
          </div>
        </div>

        {/* City/District Selection */}
        {locationMethod === "city" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.governorate} <span className="text-red-500">*</span>
              </label>
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white hover:border-gray-400"
              >
                <option value="">{t.selectOption}</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.district} <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.governorate}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">{t.selectOption}</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* Precise Location */}
        {locationMethod === "precise" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.governorate} <span className="text-red-500">*</span>
                </label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white hover:border-gray-400"
                >
                  <option value="">{t.selectOption}</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.district} <span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  disabled={!formData.governorate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">{t.selectOption}</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.exactLocation}
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  name="exactLocation"
                  value={formData.exactLocation}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  placeholder={language === 'en' ? "Street, building, landmark..." : "الشارع، المبنى، معلم..."}
                />
                <button
                  type="button"
                  onClick={handleLocateMe}
                  disabled={isLocating}
                  className={`px-4 py-3 rounded-lg transition-colors flex items-center ${
                    isLocating
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                  aria-label={language === 'en' ? "Detect current location" : "تحديد الموقع الحالي"}
                >
                  <FiNavigation className="mr-2" />
                  {t.locateMe}
                </button>
              </div>
            </div>

            {/* Location Status */}
            <div className="space-y-3">
              {isLocating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center"
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.locating}
                </motion.div>
              )}

              {formData.exactLocation && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-start"
                >
                  <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p>
                      {t.detectedLocation}
                      <strong>{formData.exactLocation}</strong>
                    </p>
                    {formData.locationCapturedAt && (
                      <p className="text-xs mt-1">
                        {t.capturedAt}{new Date(formData.locationCapturedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {locationError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start"
                >
                  <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p>{locationError}</p>
                    <button 
                      type="button" 
                      onClick={handleLocateMe} 
                      className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FiRefreshCw className="mr-1" size={14} />
                      {t.tryAgain}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Map Preview */}
            {showMap && formData.coordinates && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.mapPreview}
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setShowMap(!showMap)} 
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showMap 
                      ? (language === 'en' ? 'Hide' : 'إخفاء') 
                      : (language === 'en' ? 'Show' : 'إظهار')}
                  </button>
                </div>
                
                <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      formData.coordinates.lon-0.005
                    }%2C${
                      formData.coordinates.lat-0.005
                    }%2C${
                      formData.coordinates.lon+0.005
                    }%2C${
                      formData.coordinates.lat+0.005
                    }&layer=mapnik&marker=${
                      formData.coordinates.lat
                    }%2C${
                      formData.coordinates.lon
                    }`}
                    title={t.mapPreview}
                    aria-label={t.mapPreview}
                  />
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {t.confirmLocation}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LocationSection;