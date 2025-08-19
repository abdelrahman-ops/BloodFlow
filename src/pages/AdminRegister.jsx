/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FiShield, FiMapPin, FiMail, FiPhone, FiLock, FiUser, FiArrowRight, FiDroplet } from "react-icons/fi";
import { FaRegHospital } from "react-icons/fa6";
import { useLanguageStore } from "../stores/languageStore";
import useAuthStore  from "../stores/authStore";
import { generateToken } from "../services/firebase";

/**
 * Type definition for Admin registration data
 * @typedef {Object} AdminRegisterDto
 * @property {string} name - Admin's full name
 * @property {string} email - Admin's email address
 * @property {string} password - Admin's password
 * @property {string} phone - Admin's phone number
 * @property {string} hospitalId - Hospital ID
 * @property {string} hospitalName - Hospital name
 * @property {string} hospitalPhone - Hospital phone number
 * @property {string} street - Hospital street address
 * @property {string} city - Hospital city
 * @property {string} state - Hospital state/province
 * @property {string} postalCode - Hospital postal code
 * @property {string|number} lat - Hospital latitude coordinate
 * @property {string|number} lng - Hospital longitude coordinate
 * @property {string} fcmToken - Firebase Cloud Messaging token
 */

const HospitalAdminRegister = () => {
    const navigate = useNavigate();
    const { language } = useLanguageStore();
    const { registerAdmin, isLoading } = useAuthStore();

    const [step, setStep] = useState(1);
    const [fcmToken, setFcmToken] = useState(null);
    const [formData, setFormData] = useState({
        // Admin personal info
        name: '',
        email: '',
        password: '',
        phone: '',
        
        // Hospital info
        hospitalId: '',
        hospitalName: '',
        hospitalPhone: '',
        
        // Address info
        street: '',
        city: '',
        state: '',
        postalCode: '',
        lat: '',
        lng: '',
        fcmToken: ''
    });

    // Get FCM token on component mount
    useEffect(() => {
        const getFcmToken = async () => {
            try {
                const token = await generateToken();
                if (token) {
                    setFcmToken(token);
                    setFormData(prev => ({ ...prev, fcmToken: token }));
                }
            } catch (error) {
                console.error("Error getting FCM token:", error);
            }
        };

        getFcmToken();
    }, []);

    // Translation strings
    const t = {
        en: {
            title: "Hospital Administrator Registration",
            subtitle: "Join our network of lifesaving hospitals",
            adminTitle: "Administrator Information",
            hospitalTitle: "Hospital Information",
            locationTitle: "Hospital Location",
            name: "Full Name",
            email: "Email Address",
            password: "Password",
            phone: "Phone Number",
            hospitalName: "Hospital Name",
            hospitalPhone: "Hospital Phone",
            street: "Street Address",
            city: "City",
            state: "State/Province",
            postalCode: "Postal Code",
            coordinates: "Coordinates (Lat, Lng)",
            next: "Next",
            previous: "Previous",
            register: "Complete Registration",
            adminDescription: "Enter your personal information to create your administrator account.",
            hospitalDescription: "Provide details about your medical facility.",
            locationDescription: "Help donors find your hospital by providing accurate location information.",
            benefits: [
                "Manage blood inventory in real-time",
                "Request donors for urgent needs",
                "Access to analytics and reporting",
                "Coordinate blood drives and campaigns"
            ],
            registrationSuccess: "Registration successful! Redirecting to dashboard...",
            registrationError: "Registration failed. Please try again.",
            validationErrors: {
                required: "Please fill all required fields",
                email: "Please enter a valid email address",
                passwordLength: "Password must be at least 6 characters",
                coordinates: "Please enter valid coordinates"
            }
        },
        ar: {
            title: "تسجيل مسؤول المستشفى",
            subtitle: "انضم إلى شبكتنا من المستشفيات المنقذة للحياة",
            adminTitle: "معلومات المسؤول",
            hospitalTitle: "معلومات المستشفى",
            locationTitle: "موقع المستشفى",
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            phone: "رقم الهاتف",
            hospitalName: "اسم المستشفى",
            hospitalPhone: "هاتف المستشفى",
            street: "عنوان الشارع",
            city: "المدينة",
            state: "الولاية/المحافظة",
            postalCode: "الرمز البريدي",
            coordinates: "الإحداثيات (خط العرض، خط الطول)",
            next: "التالي",
            previous: "السابق",
            register: "إكمال التسجيل",
            adminDescription: "أدخل معلوماتك الشخصية لإنشاء حساب المسؤول.",
            hospitalDescription: "قدم تفاصيل عن منشأتك الطبية.",
            locationDescription: "ساعد المتبرعين في العثور على مستشفاك من خلال تقديم معلومات الموقع الدقيقة.",
            benefits: [
                "إدارة مخزون الدم في الوقت الحقيقي",
                "طلب متبرعين للحالات الطارئة",
                "الوصول إلى التحليلات والتقارير",
                "تنسيق حملات التبرع بالدم"
            ],
            registrationSuccess: "تم التسجيل بنجاح! جارٍ التوجيه إلى لوحة التحكم...",
            registrationError: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
            validationErrors: {
                required: "يرجى ملء جميع الحقول المطلوبة",
                email: "يرجى إدخال بريد إلكتروني صحيح",
                passwordLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
                coordinates: "يرجى إدخال إحداثيات صالحة"
            }
        }
    }[language];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateStep = (currentStep) => {
        const validations = {
            1: () => {
                if (!formData.name || !formData.email || !formData.password || !formData.phone) {
                    toast.error(t.validationErrors.required);
                    return false;
                }
                if (formData.password.length < 6) {
                    toast.error(t.validationErrors.passwordLength);
                    return false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    toast.error(t.validationErrors.email);
                    return false;
                }
                return true;
            },
            2: () => {
                if (!formData.hospitalName || !formData.hospitalPhone) {
                    toast.error(t.validationErrors.required);
                    return false;
                }
                return true;
            },
            3: () => {
                if (!formData.street || !formData.city || !formData.state || !formData.postalCode || 
                    !formData.lat || !formData.lng) {
                    toast.error(t.validationErrors.required);
                    return false;
                }
                if (isNaN(parseFloat(formData.lat)) || isNaN(parseFloat(formData.lng))) {
                    toast.error(t.validationErrors.coordinates);
                    return false;
                }
                return true;
            }
        };

        return validations[currentStep] ? validations[currentStep]() : true;
    };

    const nextStep = (e) => {
        if (e) e.preventDefault();
        if (!validateStep(step)) return;
        setStep(step + 1);
    };

    const prevStep = (e) => {
        if (e) e.preventDefault();
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(3)) return;

        try {
            const registrationData = {
                ...formData,
                lat: parseFloat(formData.lat),
                lng: parseFloat(formData.lng)
            };

            await registerAdmin(registrationData);
            
            toast.success(t.registrationSuccess);
            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            console.error("Registration error:", err);
            let errorMessage = t.registrationError;
            
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message.includes('token')) {
                // Special case for missing token but successful registration
                toast.success("Registration successful! Please login");
                navigate('/login');
                return;
            }
            
            toast.error(errorMessage);
        }
    };

    // Form sections configuration
    const formSections = [
        {
            title: t.adminTitle,
            icon: <FiUser className="mr-2 text-red-600" />,
            description: t.adminDescription,
            fields: [
                {
                    label: t.name,
                    name: "name",
                    type: "text",
                    icon: <FiUser className="absolute left-3 top-3.5 text-gray-400" />,
                    required: true
                },
                {
                    label: t.email,
                    name: "email",
                    type: "email",
                    icon: <FiMail className="absolute left-3 top-3.5 text-gray-400" />,
                    required: true
                },
                {
                    label: t.password,
                    name: "password",
                    type: "password",
                    icon: <FiLock className="absolute left-3 top-3.5 text-gray-400" />,
                    required: true,
                    minLength: 6
                },
                {
                    label: t.phone,
                    name: "phone",
                    type: "tel",
                    icon: <FiPhone className="absolute left-3 top-3.5 text-gray-400" />,
                    required: true
                }
            ]
        },
        {
            title: t.hospitalTitle,
            icon: <FaRegHospital className="mr-2 text-red-600" />,
            description: t.hospitalDescription,
            fields: [
                {
                    label: t.hospitalName,
                    name: "hospitalName",
                    type: "text",
                    icon: <FaRegHospital className="absolute left-3 top-3.5 text-gray-400" />,
                    required: true
                },
                {
                    label: t.hospitalPhone,
                    name: "hospitalPhone",
                    type: "tel",
                    icon: <FiPhone className="absolute left-3 top-3.5 text-gray-400" />,
                    required: true
                }
            ]
        },
        {
            title: t.locationTitle,
            icon: <FiMapPin className="mr-2 text-red-600" />,
            description: t.locationDescription,
            fields: [
                {
                    label: t.street,
                    name: "street",
                    type: "text",
                    required: true
                },
                {
                    label: t.city,
                    name: "city",
                    type: "text",
                    required: true
                },
                {
                    label: t.state,
                    name: "state",
                    type: "text",
                    required: true
                },
                {
                    label: t.postalCode,
                    name: "postalCode",
                    type: "text",
                    required: true
                },
                {
                    label: t.coordinates,
                    name: "coordinates",
                    type: "custom",
                    required: true,
                    children: (
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                name="lat"
                                value={formData.lat}
                                onChange={handleChange}
                                placeholder="Latitude"
                                step="any"
                                required
                                disabled={isLoading}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500 disabled:bg-gray-100"
                            />
                            <input
                                type="number"
                                name="lng"
                                value={formData.lng}
                                onChange={handleChange}
                                placeholder="Longitude"
                                step="any"
                                required
                                disabled={isLoading}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500 disabled:bg-gray-100"
                            />
                        </div>
                    )
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4 py-8 md:py-12">
            <div className="w-full max-w-4xl mx-4">
                <motion.div 
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="p-6 md:p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="bg-red-100 p-3 rounded-full">
                                    <FiShield className="text-red-600 text-2xl" />
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-red-600">{t.title}</h1>
                            <p className="text-gray-600 mt-2">{t.subtitle}</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Side - Benefits */}
                            <div className="md:w-1/3 bg-red-50 rounded-xl p-6 hidden md:block">
                                <h3 className="text-lg font-semibold text-red-700 mb-4">
                                    {language === 'en' ? 'Administrator Benefits' : 'فوائد المسؤول'}
                                </h3>
                                <ul className="space-y-3">
                                    {t.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="bg-red-100 text-red-600 rounded-full p-1 mr-3">
                                                <FiDroplet className="h-4 w-4" />
                                            </span>
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 bg-white p-4 rounded-lg border border-red-100">
                                    <p className="text-sm text-gray-600">
                                        {language === 'en' 
                                            ? "By registering, you agree to our terms and confirm this is a legitimate medical facility."
                                            : "بالتسجيل، فإنك توافق على شروطنا وتؤكد أن هذه منشأة طبية قانونية."}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="md:w-2/3">
                                {/* Progress Steps */}
                                <div className="flex justify-between mb-8 relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                                    <div 
                                        className="absolute top-1/2 left-0 h-1 bg-red-600 -z-10 transition-all duration-300" 
                                        style={{ width: `${(step / 3) * 100}%` }}
                                    ></div>
                                    {formSections.map((_, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                step >= index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <span className="text-xs mt-2 text-gray-600">
                                                {formSections[index].title}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: step > 1 ? 50 : -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: step > 1 ? -50 : 50 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                                    {formSections[step - 1].icon}
                                                    {formSections[step - 1].title}
                                                </h2>
                                                <p className="text-gray-600 mb-6">{formSections[step - 1].description}</p>
                                                
                                                <div className="space-y-4">
                                                    {formSections[step - 1].fields.map((field, index) => (
                                                        <div key={index}>
                                                            <label className="block text-gray-700 mb-1">{field.label}</label>
                                                            {field.type === 'custom' ? (
                                                                field.children
                                                            ) : (
                                                                <div className="relative">
                                                                    <input
                                                                        type={field.type}
                                                                        name={field.name}
                                                                        value={formData[field.name]}
                                                                        onChange={handleChange}
                                                                        required={field.required}
                                                                        minLength={field.minLength}
                                                                        disabled={isLoading}
                                                                        className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:border-red-500 focus:ring-red-500 disabled:bg-gray-100"
                                                                    />
                                                                    {field.icon}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="mt-8 flex justify-between">
                                        {step > 1 ? (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                disabled={isLoading}
                                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                {t.previous}
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}
                                        
                                        {step < 3 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={isLoading}
                                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {t.next} <FiArrowRight className="ml-2" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center ${
                                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        {t.register}
                                                    </>
                                                ) : (
                                                    <>
                                                        {t.register} <FiArrowRight className="ml-2" />
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HospitalAdminRegister;