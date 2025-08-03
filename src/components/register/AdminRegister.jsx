// components/AdminRegister.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useLanguageStore } from "../../stores/languageStore";


const AdminRegister = () => {
    const navigate = useNavigate();
    const { language } = useLanguageStore();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        hospitalName: "",
        hospitalLocation: "",
        contactNumber: "",
    });
    
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError(language === 'en' ? "Passwords do not match." : "كلمات المرور غير متطابقة");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("https://bfserver.vercel.app/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                hospitalName: formData.hospitalName,
                hospitalLocation: formData.hospitalLocation,
                contactNumber: formData.contactNumber,
            });

            if (response.status === 201) {
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || (language === 'en' ? "Registration failed. Please try again." : "فشل التسجيل. يرجى المحاولة مرة أخرى."));
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    // Translation strings
    const translations = {
        en: {
            title: "Admin Registration",
            name: "Full Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            hospitalName: "Hospital Name",
            hospitalLocation: "Hospital Location",
            contactNumber: "Contact Number",
            register: "Register",
            loginRedirect: "Already have an account? Login"
        },
        ar: {
            title: "تسجيل مسؤول",
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            confirmPassword: "تأكيد كلمة المرور",
            hospitalName: "اسم المستشفى",
            hospitalLocation: "موقع المستشفى",
            contactNumber: "رقم الاتصال",
            register: "تسجيل",
            loginRedirect: "لديك حساب بالفعل؟ تسجيل الدخول"
        }
    };

    const t = translations[language];

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-gray-100 mt-14"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), 
                rgba(0, 0, 0, 0)),url('${assets.images.hdonor}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                direction: language === 'ar' ? 'rtl' : 'ltr'
            }}
        >
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-red-600">
                        {t.title}
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded p-4 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                {t.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.name}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                {t.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.email}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                {t.password}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.password}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                {t.confirmPassword}
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.confirmPassword}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="hospitalName"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                {t.hospitalName}
                            </label>
                            <input
                                type="text"
                                id="hospitalName"
                                name="hospitalName"
                                value={formData.hospitalName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.hospitalName}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="hospitalLocation"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                {t.hospitalLocation}
                            </label>
                            <input
                                type="text"
                                id="hospitalLocation"
                                name="hospitalLocation"
                                value={formData.hospitalLocation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.hospitalLocation}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contactNumber"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                {t.contactNumber}
                            </label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                placeholder={t.contactNumber}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? (language === 'en' ? "Registering..." : "جاري التسجيل...") : t.register}
                        </button>
                        <button
                            type="button"
                            onClick={handleLoginRedirect}
                            className="text-red-600 hover:underline"
                        >
                            {t.loginRedirect}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;