/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyFormStep3 = ({ 
  showSuccess, 
  progress, 
  t, 
  language, 
  navigate 
}) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 text-center"
    >
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {t.status.success[language]}
            </h2>
            <p className="text-gray-600 text-sm">
              {language === 'en' 
                ? 'We have notified donors in your area. Expect calls soon.' 
                : 'لقد قمنا بإخطار المتبرعين في منطقتك. توقع المكالمات قريبًا.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            {t.status.progress[language]}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h3 className="font-medium text-gray-800 mb-1 text-sm">
            {language === 'en' ? 'What happens next?' : 'ماذا يحدث بعد ذلك؟'}
          </h3>
          <ul className="text-xs text-gray-600 space-y-1 text-left">
            <li className="flex items-start">
              <span className="text-red-500 mr-1">•</span>
              {language === 'en' 
                ? 'Nearby donors receive your request' 
                : 'يتلقى المتبرعون القريبون طلبك'}
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-1">•</span>
              {language === 'en' 
                ? 'Compatible donors will contact you' 
                : 'سيتواصل معك المتبرعون المتوافقون'}
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-1">•</span>
              {language === 'en' 
                ? 'Hospital will be notified if provided' 
                : 'سيتم إخطار المستشفى إذا تم تقديمه'}
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
        >
          {language === 'en' ? 'Return to Home' : 'العودة إلى الصفحة الرئيسية'}
        </button>
      </div>
    </motion.div>
  );
};

export default EmergencyFormStep3;