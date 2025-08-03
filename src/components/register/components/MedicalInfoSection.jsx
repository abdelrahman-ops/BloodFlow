/* eslint-disable react/prop-types */
import { FiDroplet, FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const MedicalInfoSection = ({ 
  t, 
  formData, 
  handleChange, 
  handleDateChange,
  bloodTypes,
  language 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h4 className="font-medium text-lg text-gray-700 mb-6 flex items-center border-b pb-3">
        <FiDroplet className="mr-2 text-red-500" />
        {t.medicalInfo}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Blood Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.bloodType} <span className="text-red-500">*</span>
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white hover:border-gray-400"
          >
            <option value="">{t.selectOption}</option>
            {bloodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Last Donation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiCalendar className="inline mr-1" />
            {t.lastDonation}
          </label>
          <div className="flex space-x-2">
            <DatePicker
              selected={formData.lastDonationDate}
              onChange={(date) => handleDateChange(date, 'lastDonationDate')}
              maxDate={new Date()}
              placeholderText={t.selectOption}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
            />
            <button
              type="button"
              onClick={() => handleDateChange(null, 'lastDonationDate')}
              className="px-4 py-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.neverDonated}
            </button>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.medicalConditions}
          </label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
            placeholder={language === 'en' 
              ? "Any chronic diseases, medications, or health conditions..." 
              : "أي أمراض مزمنة، أدوية، أو حالات صحية..."}
          />
          <p className="text-xs text-gray-500 mt-1">
            {language === 'en' 
              ? "This helps us ensure your safety when donating" 
              : "هذا يساعدنا في ضمان سلامتك عند التبرع"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalInfoSection;