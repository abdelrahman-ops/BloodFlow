/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useEmergencyNotification from '../components/emergency/EmergencyNotificationSystem';
import EmergencyHeader from '../components/emergency/EmergencyHeader';
import EmergencyProgressSteps from '../components/emergency/EmergencyProgressSteps';
import EmergencyFormStep1 from '../components/emergency/EmergencyFormStep1';
import EmergencyFormStep2 from '../components/emergency/EmergencyFormStep2';
import EmergencyFormStep3 from '../components/emergency/EmergencyFormStep3';
import useAuthStore from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';
import { toast } from 'react-toastify';
import axios from 'axios';

const EmergencyRequestPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore();
    const { language } = useLanguageStore();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationMethod, setLocationMethod] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const { notifyDonors, isLoading: isNotifying } = useEmergencyNotification();

    // Form state
    const [formData, setFormData] = useState({
        name: isAuthenticated ? user?.name : '',
        phone: isAuthenticated ? user?.phone : '',
        bloodType: isAuthenticated ? user?.bloodType : '',
        units: 1,
        urgency: 'Critical',
        governorate: '',
        district: '',
        hospital: '',
        notes: '',
        coordinates: null,
    });

    // Sample Egyptian governorates and districts
    const governorates = [
        { 
            name: language === 'en' ? "Cairo" : "القاهرة", 
            districts: [
                language === 'en' ? "Maadi" : "المعادي", 
                language === 'en' ? "Nasr City" : "مدينة نصر"
            ] 
        },
        { 
            name: language === 'en' ? "Giza" : "الجيزة", 
            districts: [
                language === 'en' ? "Dokki" : "الدقي", 
                language === 'en' ? "6 October" : "السادس من أكتوبر"
            ] 
        }
    ];

    // Blood type options
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // Translations
    const t = {
        title: {
            en: 'Emergency Blood Request',
            ar: 'طلب دم طارئ'
        },
        subtitle: {
            en: 'Immediate help for critical situations',
            ar: 'مساعدة فورية للحالات الحرجة'
        },
        steps: {
            details: { en: 'Details', ar: 'التفاصيل' },
            review: { en: 'Review', ar: 'مراجعة' },
            complete: { en: 'Complete', ar: 'إكمال' }
        },
        formLabels: {
            name: { en: 'Patient Name', ar: 'اسم المريض' },
            phone: { en: 'Phone Number', ar: 'رقم الهاتف' },
            bloodType: { en: 'Blood Type Needed', ar: 'فصيلة الدم المطلوبة' },
            units: { en: 'Units Needed', ar: 'عدد الوحدات' },
            urgency: { en: 'Urgency Level', ar: 'درجة الاستعجال' },
            location: { en: 'Location', ar: 'الموقع' },
            governorate: { en: 'Governorate', ar: 'المحافظة' },
            district: { en: 'District', ar: 'الحي/المدينة' },
            hospital: { en: 'Hospital (Optional)', ar: 'المستشفى (اختياري)' },
            notes: { en: 'Medical Notes', ar: 'ملاحظات طبية' }
        },
        actions: {
            getLocation: { en: 'Use My Location', ar: 'تحديد موقعي' },
            manualLocation: { en: 'Enter Manually', ar: 'إدخال يدوي' },
            next: { en: 'Continue', ar: 'متابعة' },
            back: { en: 'Back', ar: 'رجوع' },
            submit: { en: 'Send Emergency Alert', ar: 'إرسال تنبيه الطوارئ' },
            loginPrompt: { en: 'Login to track this request', ar: 'سجل الدخول لمتابعة الطلب' },
            login: { en: 'Login', ar: 'تسجيل الدخول' },
            continueAsGuest: { en: 'Continue as Guest', ar: 'المتابعة كزائر' }
        },
        urgencyOptions: {
            Critical: { en: 'Critical (Immediate)', ar: 'حرج (فوري)' },
            High: { en: 'High (Within 1 hour)', ar: 'عالي (خلال ساعة)' },
            Medium: { en: 'Medium (Today)', ar: 'متوسط (اليوم)' }
        },
        status: {
            alerting: { en: 'Alerting Nearby Donors', ar: 'تنبيه المتبرعين القريبين' },
            progress: { en: 'Notifying donors in your area...', ar: 'جاري إخطار المتبرعين في منطقتك...' },
            success: { en: 'Emergency request sent successfully!', ar: 'تم إرسال طلب الطوارئ بنجاح!' }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationMethod = (method) => {
        setLocationMethod(method);
        if (method === 'manual') {
            setFormData(prev => ({ ...prev, coordinates: null }));
        } else {
            getCurrentLocation();
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        coordinates: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }));
                },
                (error) => {
                    toast.error(language === 'en' 
                        ? 'Location access denied. Please enter manually.' 
                        : 'تم رفض إذن الموقع. يرجى الإدخال يدويًا.');
                    setLocationMethod('manual');
                }
            );
        } else {
            toast.error(language === 'en' 
                ? 'Geolocation not supported. Please enter manually.' 
                : 'المتصفح لا يدخدم تحديد الموقع. يرجى الإدخال يدويًا.');
            setLocationMethod('manual');
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submit button clicked');
    setIsSubmitting(true);
    
    try {
        // console.log('Form data being submitted:', formData);
        // 1. First validate required fields
        if (!formData.name || !formData.phone || !formData.bloodType || !formData.governorate) {
            const errorMsg = language === 'en' 
                ? 'Please fill all required fields' 
                : 'يرجى ملء جميع الحقول المطلوبة';
            console.error('Validation failed:', errorMsg); // Debug 3
            throw new Error(errorMsg);
        }

        // 2. Show initial progress
        setProgress(10);
        
        // 3. Send notification to donors
        const result = await notifyDonors(formData);
        setProgress(30);
        
        // 4. Simulate notification progress (UI effect)
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 5;
                if (newProgress >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return newProgress;
            });
        }, 200);

        // 5. If authenticated, track this request
        if (isAuthenticated) {
            await trackDonorResponses(result._id);
        }
        
        // 6. Complete the progress
        setProgress(100);
        setShowSuccess(true);
        
        // 7. Move to completion step after delay
        setTimeout(() => setStep(3), 1500);
        } catch (error) {
            setProgress(0);
            // Error toast is already shown by notifyDonors
        } finally {
            setIsSubmitting(false);
        }
    };

    const trackDonorResponses = async (requestId) => {
    try {
        // 1. Create EventSource connection for real-time updates
        const eventSource = new EventSource(`http://localhost:5000/api/emergency/${requestId}/updates`);
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            // 2. Update UI when donors respond
            if (data.type === 'donor_response') {
                toast.info(
                    language === 'en' 
                        ? `${data.donorName} can help! Contact: ${data.phone}` 
                        : `${data.donorName} يمكنه المساعدة! اتصل بـ: ${data.phone}`
                );
            }
            
            // 3. Close connection when request is fulfilled
            if (data.type === 'request_fulfilled') {
                eventSource.close();
                toast.success(
                    language === 'en'
                        ? 'Request fulfilled! Thank you donors!'
                        : 'تم تلبية الطلب! شكراً للمتبرعين!'
                );
            }
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => eventSource.close();
    } catch (error) {
        console.error('Error tracking donor responses:', error);
    }
};

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4 md:p-8 mt-10">
            <div className="max-w-4xl mx-auto">
                <EmergencyHeader 
                    title={t.title[language]} 
                    subtitle={t.subtitle[language]} 
                />
                
                <EmergencyProgressSteps 
                    step={step} 
                    steps={t.steps} 
                    language={language} 
                />

                {/* Form Content */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <EmergencyFormStep1
                                formData={formData}
                                handleChange={handleChange}
                                locationMethod={locationMethod}
                                handleLocationMethod={handleLocationMethod}
                                governorates={governorates}
                                bloodTypes={bloodTypes}
                                t={t}
                                language={language}
                                setStep={setStep}
                            />
                        )}

                        {step === 2 && (
                            <EmergencyFormStep2
                                formData={formData}
                                t={t}
                                language={language}
                                isAuthenticated={isAuthenticated}
                                navigate={navigate}
                                setStep={setStep}
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        )}

                        {step === 3 && (
                            <EmergencyFormStep3
                                showSuccess={showSuccess}
                                progress={progress}
                                t={t}
                                language={language}
                                navigate={navigate}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default EmergencyRequestPage;