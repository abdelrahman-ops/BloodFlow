import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../../stores/languageStore";
import useAuthStore from "../../stores/authStore";
import { motion } from "framer-motion";
import { generateToken } from "../../services/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import FormHeader from "./components/FormHeader";
import PersonalInfoSection from "./components/PersonalInfoSection";
import MedicalInfoSection from "./components/MedicalInfoSection";
import LocationSection from "./components/LocationSection";
import AvailabilityConsent from "./components/AvailabilityConsent";
import FormFooter from "./components/FormFooter";


const DonorRegister = () => {
    const navigate = useNavigate();
    const { language } = useLanguageStore();
    const { registerDonor , loading: authLoading , error: authError  } = useAuthStore();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fcmToken, setFcmToken] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        birthDate: null,
        bloodType: "",
        governorate: "",
        district: "",
        exactLocation: "",
        readableAddress: "",
        coordinates: { lat: null, lon: null },
        locationCapturedAt: null,
        locationSource: null,
        lastDonationDate: null,
        medicalConditions: "",
        isAvailable: true,
        consent: false
    });

    // Get FCM token on component mount
    useEffect(() => {
        const getFcmToken = async () => {
            try {
                const token = await generateToken();
                // console.log('token from donor register:', token);
                
                if (token) {
                    setFcmToken(token);
                }
            } catch (error) {
                // console.error("Error getting FCM token:", error);
            }
        };

        getFcmToken();
    }, []);

    // Sample Egyptian governorates and districts
    useEffect(() => {
        const egyptGovernorates = [
            { name: "Cairo", districts: ["Maadi", "Mokattam", "Nasr City", "Heliopolis", "Zamalek", "Downtown", "Garden City", "Shubra"] },
            { name: "Giza", districts: ["Dokki", "Mohandessin", "Haram", "6th of October", "Sheikh Zayed City", "Agouza", "Faisal", "Boulaq Dakrour"] },
            { name: "Alexandria", districts: ["Sidi Gaber", "Montaza", "Agami", "Mansheya", "Smouha", "Loran", "San Stefano", "Gleem"] },
            { name: "Sharqia", districts: ["Zagazig", "10th of Ramadan City", "Abu Hammad", "Abu Kebir", "Belbeis", "Diarb Negm"] },
            { name: "Dakahlia", districts: ["Mansoura", "Talkha", "Mit Ghamr", "Aga", "Meniat El Nasr", "Sherbin", "Gamasa"] }
        ];
        
        setCities(egyptGovernorates);
        if (formData.governorate) {
            const selectedGov = egyptGovernorates.find(g => g.name === formData.governorate);
            setDistricts(selectedGov?.districts || []);
        }
    }, [formData.governorate]);


    useEffect(() => {
        if (authError) {
            toast.error(authError);
            useAuthStore.getState().clearError();
        }
    }, [authError]);

    const translations = {
        en: {
            title: "Join Egypt's Blood Donors Network",
            subtitle: "Your donation can save up to 3 lives in Egypt",
            personalInfo: "Personal Information",
            medicalInfo: "Medical Information",
            name: "Full Name",
            email: "Email",
            password: "Password",
            phone: "Phone Number",
            gender: "Gender",
            birthDate: "Date of Birth",
            bloodType: "Blood Type",
            governorate: "Governorate",
            district: "District",
            exactLocation: "Exact Location (Optional)",
            lastDonation: "Last Donation Date",
            medicalConditions: "Medical Conditions (Optional)",
            availability: "Available to Donate",
            consent: "I confirm I meet all donor eligibility requirements",
            haveAccount: "Already have an account?",
            login: "Login",
            male: "Male",
            female: "Female",
            other: "Other",
            selectOption: "Select an option",
            neverDonated: "Never donated",
            eligibilityInfo: "By registering, you confirm you're in good health, between 18-65 years, weight >50kg, and meet all donor requirements.",
            passwordHint: "Minimum 8 characters",
            requiredField: "Required field",
            useCurrentLocation: "Use my current location",
            enterManually: "Enter address manually",
            locateMe: "Locate Me",
            cityOnly: "Select city only",
            preciseLocation: "Precise location",
            locationInstructions: "Help us locate you faster in emergencies",
            geolocationUnsupported: "Geolocation is not supported by your browser",
            geocodeError: "Couldn't determine exact address from coordinates",
            locationErrorDefault: "Could not determine your location",
            ipFallbackNotice: "Using approximate location from IP address",
            mapPreview: "Map Preview",
            confirmLocation: "Confirm your location is correctly pinned",
            register: "Register as Donor",
            registering: "Registering...",
            notificationPermission: "Please enable notifications to receive emergency alerts",
            notificationBlocked: "Notifications blocked. You may miss important emergency alerts."
        },
        ar: {
            title: "انضم إلى شبكة متبرعي الدم في مصر",
            subtitle: "تبرعك يمكن أن ينقذ حياة 3 أشخاص في مصر",
            personalInfo: "المعلومات الشخصية",
            medicalInfo: "المعلومات الطبية",
            name: "الاسم بالكامل",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            phone: "رقم الهاتف",
            gender: "النوع",
            birthDate: "تاريخ الميلاد",
            bloodType: "فصيلة الدم",
            governorate: "المحافظة",
            district: "الحي/المدينة",
            exactLocation: "الموقع الدقيق (اختياري)",
            lastDonation: "تاريخ آخر تبرع",
            medicalConditions: "حالات طبية (اختياري)",
            availability: "متاح للتبرع حالياً",
            consent: "أؤكد أنني أستوفي جميع متطلبات أهلية التبرع",
            haveAccount: "لديك حساب بالفعل؟",
            login: "تسجيل الدخول",
            male: "ذكر",
            female: "أنثى",
            other: "آخر",
            selectOption: "اختر خيارًا",
            neverDonated: "لم أتبرع من قبل",
            eligibilityInfo: "بالتسجيل، تؤكد أنك بصحة جيدة، عمرك بين 18-65 سنة، وزنك أكثر من 50 كجم، وتستوفي جميع شروط التبرع.",
            passwordHint: "8 أحرف على الأقل",
            requiredField: "حقل مطلوب",
            useCurrentLocation: "استخدم موقعي الحالي",
            enterManually: "إدخال العنوان يدويًا",
            locateMe: "تحديد موقعي",
            cityOnly: "اختيار المحافظة فقط",
            preciseLocation: "تحديد دقيق",
            locationInstructions: "ساعدنا في تحديد موقعك بسرعة في حالات الطوارئ",
            geolocationUnsupported: "المتصفح الخاص بك لا يدعم خدمة الموقع",
            geocodeError: "تعذر تحديد العنوان الدقيق من الإحداثيات",
            locationErrorDefault: "تعذر تحديد موقعك",
            ipFallbackNotice: "جاري استخدام موقع تقريبي من عنوان IP",
            mapPreview: "معاينة الخريطة",
            confirmLocation: "تأكد من أن موقعك موضح بشكل صحيح",
            register: "التسجيل كمتبرع",
            registering: "جاري التسجيل...",
            notificationPermission: "يرجى تمكين الإشعارات لتلقي تنبيهات الطوارئ",
            notificationBlocked: "تم حظر الإشعارات. قد تفوتك تنبيهات الطوارئ المهمة."
        }
    };

    const t = translations[language];
    const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleDateChange = (date, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: date
        }));
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return 0;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const isAdult = calculateAge(formData.birthDate) >= 18;
    const isValid = formData.consent && isAdult;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isValid) {
            toast.error(t.requiredFieldsError || "Please fill all required fields");
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Prepare the data for the API
            const registrationData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                bloodType: formData.bloodType,
                city: formData.governorate,
                district: formData.district,
                gender: formData.gender,
                role: "donor",
                healthInfo: formData.medicalConditions,
                lastDonationDate: formData.lastDonationDate,
                availability: formData.isAvailable,
                exactLocation: formData.exactLocation,
                coordinates: formData.coordinates,
                fcmToken: fcmToken
            };

            // const response = await axios.post(
            //     "http://localhost:5000/api/auth/register",
            //     registrationData
            // );

            await registerDonor(registrationData);

            // Save token and user data
            // const { token, user } = response.data;
            // login(token, user);
            
            // Redirect to home
            navigate("/");
            toast.success(t.registrationSuccess || "Registration successful!");

        } catch (error) {
            console.error("Registration error:", error);
            const errorMessage = error.response?.data?.message || t.registrationError || "Registration failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto p-4 md:p-6"
        >
            <FormHeader title={t.title} subtitle={t.subtitle} />

            <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <PersonalInfoSection
                    t={t}
                    formData={formData}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    isAdult={isAdult}
                    language={language}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />

                <MedicalInfoSection
                    t={t}
                    formData={formData}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    bloodTypes={bloodTypes}
                    language={language}
                />

                <LocationSection
                    formData={formData}
                    setFormData={setFormData}
                    cities={cities}
                    districts={districts}
                    setDistricts={setDistricts}
                    language={language}
                />

                <AvailabilityConsent
                    t={t}
                    formData={formData}
                    handleChange={handleChange}
                    isAvailable={isAvailable}
                    setIsAvailable={setIsAvailable}
                    language={language}
                />

                <FormFooter 
                    t={t}
                    isValid={isValid}
                    navigate={navigate}
                    isSubmitting={isSubmitting}
                />
            </motion.form>
        </motion.div>
    );
};

export default DonorRegister;