import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DonorRegister from "../components/register/DonorRegister";
import GeneralUserRegister from "../components/register/GeneralUserRegister";
import { useLanguageStore } from "../stores/languageStore";
import { FiDroplet, FiUser, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguageStore();

    const [role, setRole] = useState(null);
    const [showRoleSelection, setShowRoleSelection] = useState(true);

    const t = {
        en: {
            title: "Join BloodFlow Community",
            donor: "I Want to Donate",
            generalUser: "I Need Blood",
            registerAs: "Register as",
            donorDescription: "Join our network of lifesavers. Your donation can save up to 3 lives.",
            userDescription: "Find compatible donors in your area when you need blood.",
            donorBenefits: [
                "Help save lives in your community",
                "Get health checkups with each donation",
                "Receive notifications for urgent cases"
            ],
            recipientBenefits: [
                "Quick access to compatible donors",
                "Emergency request system",
                "Real-time donor matching"
            ],
            selectRole: "Select your role to continue",
            continue: "Continue"
        },
        ar: {
            title: "انضم إلى مجتمع BloodFlow",
            donor: "أريد التبرع",
            generalUser: "أحتاج إلى دم",
            registerAs: "سجل كـ",
            donorDescription: "انضم إلى شبكة منقذي الأرواح. تبرعك يمكن أن ينقذ حياة 3 أشخاص.",
            userDescription: "ابحث عن متبرعين متوافقين في منطقتك عندما تحتاج إلى دم.",
            donorBenefits: [
                "ساعد في إنقاذ الأرواح في مجتمعك",
                "احصل على فحوصات صحية مع كل تبرع",
                "تلقي إشعارات للحالات الطارئة"
            ],
            recipientBenefits: [
                "وصول سريع إلى المتبرعين المتوافقين",
                "نظام طلب طوارئ",
                "تطابق فوري مع المتبرعين"
            ],
            selectRole: "اختر دورك للمتابعة",
            continue: "متابعة"
        }
    }[language];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleParam = params.get("role");

        if (roleParam && ["donor", "generalUser"].includes(roleParam)) {
            setRole(roleParam);
            setShowRoleSelection(false);
        } else {
            setShowRoleSelection(true);
        }
    }, [location]);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        navigate(`/register?role=${selectedRole}`, { replace: true });
        setShowRoleSelection(false);
    };

    const handleBackToSelection = () => {
        setShowRoleSelection(true);
        navigate("/register", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4 py-8 md:py-12 mt-10">
            <div className="w-full max-w-4xl mx-4">
                <motion.div 
                    className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <AnimatePresence mode="wait">
                        {showRoleSelection ? (
                            <motion.div
                                key="role-selection"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-6 md:p-8"
                            >
                                {/* Header */}
                                <div className="p-6 text-center border-b border-gray-100">
                                    <h1 className="text-2xl md:text-3xl font-bold text-red-600">{t.title}</h1>
                                    {showRoleSelection && (
                                        <p className="text-gray-600 mt-2">{t.selectRole}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Donor Option */}
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-200 hover:bg-red-50 transition-all"
                                        onClick={() => handleRoleSelect("donor")}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="bg-red-100 p-3 rounded-full mr-4">
                                                <FiDroplet className="text-red-600 text-xl" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-800">{t.donor}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">{t.donorDescription}</p>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            {t.donorBenefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-red-500 mr-2">•</span>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex justify-end">
                                            <button className="flex items-center text-red-600 font-medium">
                                                {t.continue} <FiArrowRight className="ml-2" />
                                            </button>
                                        </div>
                                    </motion.div>

                                    {/* Recipient Option */}
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-200 hover:bg-red-50 transition-all"
                                        onClick={() => handleRoleSelect("generalUser")}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="bg-red-100 p-3 rounded-full mr-4">
                                                <FiUser className="text-red-600 text-xl" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-800">{t.generalUser}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">{t.userDescription}</p>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            {t.recipientBenefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-red-500 mr-2">•</span>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex justify-end">
                                            <button className="flex items-center text-red-600 font-medium">
                                                {t.continue} <FiArrowRight className="ml-2" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="registration-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Navigation Back */}
                                <div className="p-4 border-b border-gray-100">
                                    <button 
                                        onClick={handleBackToSelection}
                                        className="flex items-center text-red-600 text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                        {language === 'en' ? 'Back to selection' : 'العودة إلى الاختيار'}
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="p-6 md:p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={role}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {role === "donor" ? <DonorRegister /> : <GeneralUserRegister />}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;