/* eslint-disable react/prop-types */
import { FiEye, FiEyeOff, FiPhone, FiUser } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const PersonalInfoSection = ({ 
    t, 
    formData, 
    handleChange, 
    handleDateChange,
    isAdult,
    language,
    showPassword,
    setShowPassword 
}) => {
    return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
        <h4 className="font-medium text-lg text-gray-700 mb-6 flex items-center border-b pb-3">
            <FiUser className="mr-2 text-red-500" />
            {t.personalInfo}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.name} <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                placeholder={t.name}
            />
            </div>

            {/* Email */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email} <span className="text-red-500">*</span>
            </label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                placeholder="example@email.com"
            />
            </div>

            {/* Password */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.password} <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">{t.passwordHint}</span>
            </label>
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12 hover:border-gray-400"
                placeholder="••••••••"
                />
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-red-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
            </div>
            </div>

            {/* Phone */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.phone} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
                </div>
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                placeholder={language === 'en' ? "01XXXXXXXXX" : "01XXXXXXXXX"}
                />
            </div>
            </div>

            {/* Birth Date */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.birthDate} <span className="text-red-500">*</span>
            </label>
            <DatePicker
                selected={formData.birthDate}
                onChange={(date) => handleDateChange(date, 'birthDate')}
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                dropdownMode="select"
                placeholderText={language === 'en' ? "DD/MM/YYYY" : "يوم/شهر/سنة"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                required
            />
            {formData.birthDate && !isAdult && (
                <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-2 flex items-center"
                >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                {language === 'en' 
                    ? 'You must be at least 18 years old to donate' 
                    : 'يجب أن يكون عمرك 18 سنة على الأقل للتبرع'}
                </motion.p>
            )}
            </div>

            {/* Gender */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.gender} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
                {['male', 'female', 'other'].map((gender) => (
                <label 
                    key={gender} 
                    className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors ${
                    formData.gender === gender 
                        ? 'bg-red-50 border border-red-200' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                    <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    required
                    className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm">{t[gender]}</span>
                </label>
                ))}
            </div>
            </div>
        </div>
        </motion.div>
    );
};

export default PersonalInfoSection;