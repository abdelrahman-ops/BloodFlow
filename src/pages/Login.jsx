import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import useAuthStore from "../stores/authStore";
import { useLanguageStore } from "../stores/languageStore";
import { toast } from "react-toastify";

const Login = () => {
    const { login, loading: authLoading, error: authError, clearError } = useAuthStore();
    const { language } = useLanguageStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const redirectTo = location.state?.from || "/";

    const translations = {
        en: {
            title: "Welcome Back",
            subtitle: "Sign in to continue to BloodFlow",
            email: "Email Address",
            password: "Password",
            login: "Login",
            noAccount: "Don't have an account?",
            signUp: "Sign up",
            forgotPassword: "Forgot password?",
            loading: "Authenticating...",
            errorTitle: "Login Failed",
            loginSuccess: "Login successful!"
        },
        ar: {
            title: "مرحباً بعودتك",
            subtitle: "سجل الدخول للمتابعة إلى BloodFlow",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            login: "تسجيل الدخول",
            noAccount: "ليس لديك حساب؟",
            signUp: "إنشاء حساب",
            forgotPassword: "نسيت كلمة المرور؟",
            loading: "جاري المصادقة...",
            errorTitle: "فشل تسجيل الدخول",
            loginSuccess: "تم تسجيل الدخول بنجاح!"
        }
    };

    const t = translations[language];

    // Handle auth errors from the store
    useEffect(() => {
        if (authError) {
            toast.error(authError);
            clearError();
        }
    }, [authError, clearError]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await login({ email, password });
            
            // Get the user data from the store after successful login
            const { user } = useAuthStore.getState();
            
            if (user) {
                toast.success(t.loginSuccess);
                
                if (user.role === "admin") {
                    navigate(`/admin/dashboard/${user.id}`);
                } else if (redirectTo && redirectTo !== "/login") {
                    navigate(redirectTo);
                } else {
                    navigate(`/dashboard/${user.id}`);
                }
            }
        } catch (error) {
            // Error is already handled by the store
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4 mt-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-red-600 p-6 text-center">
                        <div className="bg-white p-3 rounded-full inline-flex items-center justify-center mb-4">
                            <FiLock className="text-red-600 text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">{t.title}</h2>
                        <p className="text-red-100 mt-1">{t.subtitle}</p>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.email}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                        placeholder={language === 'en' ? "example@email.com" : "example@email.com"}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t.password}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                                <div className="mt-2 text-right">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/forgot-password")}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        {t.forgotPassword}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={authLoading}
                                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-md transition-all duration-300 font-medium ${
                                        authLoading
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-[1.01]'
                                    }`}
                                >
                                    {authLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {t.loading}
                                        </>
                                    ) : (
                                        <>
                                            {t.login} <FiArrowRight className="ml-2" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-600">{t.noAccount} </span>
                            <button
                                onClick={() => navigate("/register?role=generalUser", { state: { from: redirectTo } })}
                                className="text-red-600 font-medium hover:underline"
                            >
                                {t.signUp}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;