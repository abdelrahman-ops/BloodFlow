import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLanguageStore } from '../../stores/languageStore';


const useEmergencyNotification = () => {
    const { language } = useLanguageStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const notifyDonors = async (formData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            // 1. Prepare the emergency request data
            const requestData = {
                name: String(formData.name),
                phone: String(formData.phone),
                bloodType: String(formData.bloodType),
                unitsNeeded: String(formData.units),
                urgency: String(formData.urgency),
                location: `${formData.governorate}, ${formData.district}`,
                hospital: String(formData.hospital || ''),
                notes: String(formData.notes || ''),
                coordinates: formData.coordinates ? JSON.stringify(formData.coordinates) : ''
            };

            // 2. Send to backend
            const response = await axios.post('http://localhost:5000/api/emergency', requestData);
            
            // 3. Show success message
            toast.success(
                language === 'en' 
                    ? 'Emergency alert sent to nearby donors!' 
                    : 'تم إرسال تنبيه الطوارئ إلى المتبرعين القريبين!'
            );

            return response.data;
        } catch (error) {
            console.error('Emergency notification error:', error);
            const errorMsg = error.response?.data?.message || 
                (language === 'en' 
                    ? 'Failed to send emergency alert' 
                    : 'فشل إرسال تنبيه الطوارئ');
            
            setError(errorMsg);
            toast.error(errorMsg);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { notifyDonors, isLoading, error };
};

export default useEmergencyNotification;