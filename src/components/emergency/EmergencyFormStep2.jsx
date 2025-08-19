/* eslint-disable react/prop-types */
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdEmergency } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const EmergencyFormStep2 = ({
  formData,
  t,
  language,
  isAuthenticated,
  navigate,
  setStep,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaExclamationTriangle className="text-red-500" />
        {language === 'en' ? 'Review Your Request' : 'مراجعة طلبك'}
      </h2>

      <div className="bg-red-50 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.name[language]}
              </h3>
              <p className="text-base font-medium">{formData.name}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.phone[language]}
              </h3>
              <p className="text-base">{formData.phone}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.bloodType[language]}
              </h3>
              <p className="text-2xl font-bold text-red-600">{formData.bloodType}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.units[language]}
              </h3>
              <p className="text-base">{formData.units}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.urgency[language]}
              </h3>
              <p className="text-base font-medium">
                {t.urgencyOptions[formData.urgency][language]}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.location[language]}
              </h3>
              <p className="text-base">
                {formData.district}, {formData.governorate}
              </p>
            </div>
          </div>
          {formData.hospital && (
            <div className="md:col-span-2">
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.hospital[language]}
              </h3>
              <p className="text-base">{formData.hospital}</p>
            </div>
          )}
          {formData.notes && (
            <div className="md:col-span-2">
              <h3 className="text-xs font-medium text-red-700 mb-1">
                {t.formLabels.notes[language]}
              </h3>
              <p className="text-base">{formData.notes}</p>
            </div>
          )}
        </div>
      </div>

      {!isAuthenticated && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <p className="text-blue-800 mb-2 text-sm">{t.actions.loginPrompt[language]}</p>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium"
            >
              {t.actions.login[language]}
            </button>
            <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-xs font-medium">
              {t.actions.continueAsGuest[language]}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setStep(1)}
          className="text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 flex items-center gap-1 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t.actions.back[language]}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-600 flex items-center gap-1 transition-all text-sm ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <PulseLoader color="#ffffff" size={6} />
          ) : (
            <>
              {t.actions.submit[language]}
              <MdEmergency className="text-lg" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default EmergencyFormStep2;