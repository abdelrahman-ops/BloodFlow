import { FiInfo } from "react-icons/fi";
import Switch from "react-switch";
import { motion } from "framer-motion";

const AvailabilityConsent = ({ 
  t, 
  formData, 
  handleChange, 
  isAvailable, 
  setIsAvailable,
  language
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="space-y-5">
        {/* Availability */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.availability}
            </label>
            <p className="text-xs text-gray-500">
              {language === 'en' 
                ? "You can change this later in your profile" 
                : "يمكنك تغيير هذا لاحقًا في ملفك الشخصي"}
            </p>
          </div>
          <Switch
            checked={isAvailable}
            onChange={(checked) => {
              setIsAvailable(checked);
              handleChange({ target: { name: "isAvailable", value: checked } });
            }}
            onColor="#dc2626"
            offColor="#d1d5db"
            onHandleColor="#fff"
            offHandleColor="#fff"
            handleDiameter={24}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
            activeBoxShadow="0px 0px 1px 10px rgba(220, 38, 38, 0.2)"
            height={28}
            width={56}
            className="react-switch"
          />
        </div>

        {/* Consent */}
        <div className="p-3 bg-red-50 rounded-lg">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="mt-1 rounded text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">{t.consent}</span>
          </label>
          <div className="mt-3 text-xs text-gray-600 flex items-start">
            <FiInfo className="flex-shrink-0 mr-2 mt-0.5 text-red-500" />
            <span>{t.eligibilityInfo}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AvailabilityConsent;