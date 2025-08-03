import { motion } from "framer-motion";

const FormFooter = ({ 
  t, 
  isValid, 
  navigate 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="space-y-5"
    >
      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-4 px-6 rounded-xl shadow-md transition-all duration-300 font-medium text-lg
            ${!isValid 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-[1.01] shadow-lg hover:shadow-red-200'}`}
      >
        {t.register}
      </button>

      {/* Login Link */}
      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-red-600 hover:text-red-700 transition-colors group"
        >
          {t.haveAccount} 
          <span className="ml-1 underline font-medium group-hover:text-red-800">
            {t.login}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default FormFooter;