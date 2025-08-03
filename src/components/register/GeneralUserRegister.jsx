import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../../stores/languageStore";
import { FiEye, FiEyeOff, FiPhone, FiUser, FiDroplet, FiMapPin, FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";

const GeneralUserRegister = () => {
    const navigate = useNavigate();
    const { language } = useLanguageStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        age: "",
        bloodType: "",
        governorate: "",
        district: "",
        medicalCondition: ""
    });

    const translations = {
        en: {
            title: "Create Recipient Account",
            subtitle: "Request blood donations when in need",
            name: "Full Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            phone: "Phone Number",
            gender: "Gender",
            age: "Age",
            bloodType: "Blood Type",
            location: "Location",
            governorate: "Governorate",
            district: "District/City",
            medicalCondition: "Medical Condition (Optional)",
            register: "Register as Recipient",
            haveAccount: "Already have an account?",
            login: "Login",
            male: "Male",
            female: "Female",
            other: "Other",
            selectOption: "Select an option",
            passwordHint: "Minimum 8 characters",
            requiredField: "Required field",
            eligibilityInfo: "By registering, you agree to our terms of service"
        },
        ar: {
            title: "إنشاء حساب مستفيد",
            subtitle: "طلب تبرعات الدم عند الحاجة",
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            confirmPassword: "تأكيد كلمة المرور",
            phone: "رقم الهاتف",
            gender: "الجنس",
            age: "العمر",
            bloodType: "فصيلة الدم",
            location: "الموقع",
            governorate: "المحافظة",
            district: "الحي/المدينة",
            medicalCondition: "حالة طبية (اختياري)",
            register: "التسجيل كمستفيد",
            haveAccount: "لديك حساب بالفعل؟",
            login: "تسجيل الدخول",
            male: "ذكر",
            female: "أنثى",
            other: "آخر",
            selectOption: "اختر خيارًا",
            passwordHint: "8 أحرف على الأقل",
            requiredField: "حقل مطلوب",
            eligibilityInfo: "بالتسجيل، أنت توافق على شروط الخدمة"
        }
    };

    const t = translations[language];

    const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    
    // Sample Egyptian governorates and districts
    const egyptGovernorates = [
        { name: language === 'en' ? "Cairo" : "القاهرة", districts: [language === 'en' ? "Maadi" : "المعادي", language === 'en' ? "Nasr City" : "مدينة نصر"] },
        { name: language === 'en' ? "Giza" : "الجيزة", districts: [language === 'en' ? "Dokki" : "الدقي", language === 'en' ? "6 October" : "السادس من أكتوبر"] },
        { name: language === 'en' ? "Alexandria" : "الإسكندرية", districts: [language === 'en' ? "Smouha" : "سموحة", language === 'en' ? "Mansheya" : "المنشية"] }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation and submission logic
        console.log(formData);
    };

    return (
        <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-8 text-center">
                <div className="bg-red-50 p-4 rounded-full inline-flex items-center justify-center mb-4">
                    <FiUser className="text-red-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-red-600">{t.title}</h3>
                <p className="text-gray-600 mt-2">{t.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder={t.name}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="example@email.com"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-red-600 transition-colors"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.confirmPassword} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12"
                            placeholder={t.confirmPassword}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-red-600 transition-colors"
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
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
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder={language === 'en' ? "01XXXXXXXXX" : "01XXXXXXXXX"}
                        />
                    </div>
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.gender} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {['male', 'female', 'other'].map((gender) => (
                            <label key={gender} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={formData.gender === gender}
                                    onChange={handleChange}
                                    required
                                    className="text-red-600 focus:ring-red-500"
                                />
                                <span>{t[gender]}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Age */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.age} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="100"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="18+"
                    />
                </div>

                {/* Blood Type */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        <FiDroplet className="inline mr-2 text-red-500" />
                        {t.bloodType} <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                    >
                        <option value="">{t.selectOption}</option>
                        {bloodTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Governorate */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        <FiMapPin className="inline mr-2 text-red-500" />
                        {t.governorate} <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="governorate"
                        value={formData.governorate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                    >
                        <option value="">{t.selectOption}</option>
                        {egyptGovernorates.map(gov => (
                            <option key={gov.name} value={gov.name}>{gov.name}</option>
                        ))}
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.district} <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        disabled={!formData.governorate}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                    >
                        <option value="">{t.selectOption}</option>
                        {formData.governorate && 
                            egyptGovernorates
                                .find(g => g.name === formData.governorate)
                                ?.districts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))
                        }
                    </select>
                </div>

                {/* Medical Condition */}
                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                        {t.medicalCondition}
                    </label>
                    <textarea
                        name="medicalCondition"
                        value={formData.medicalCondition}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder={language === 'en' ? "Describe your medical condition if applicable..." : "صف حالتك الطبية إن وجدت..."}
                    />
                </div>
            </div>

            {/* Consent */}
            <div className="mt-4">
                <div className="text-xs text-gray-600 flex items-start">
                    <FiInfo className="flex-shrink-0 mr-2 mt-0.5 text-red-500" />
                    <span>{t.eligibilityInfo}</span>
                </div>
            </div>

            <div className="mt-8">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                    {t.register}
                </button>
            </div>

            <div className="text-center mt-4">
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                    {t.haveAccount} <span className="underline">{t.login}</span>
                </button>
            </div>
        </motion.form>
    );
};

export default GeneralUserRegister;