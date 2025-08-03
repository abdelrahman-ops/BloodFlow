/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLanguageStore } from './languageStore';

export const useEmergencyStore = create((set, get) => ({
  // State
  emergency: null,
  isLoading: false,
  error: null,
  progress: 0,
  donorResponses: [],
  isFulfilled: false,

  // Actions
  sendEmergencyRequest: async (formData) => {
    const { language } = useLanguageStore.getState();
    
    set({ isLoading: true, error: null, progress: 10 });

    try {
      // Prepare request data
      const requestData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        bloodType: formData.bloodType,
        unitsNeeded: Number(formData.units),
        urgency: formData.urgency,
        location: {
          governorate: formData.governorate,
          district: formData.district,
          coordinates: formData.coordinates || null
        },
        hospital: formData.hospital?.trim() || null,
        notes: formData.notes?.trim() || null
      };

      // Send to backend
      const response = await axios.post('/api/emergency', requestData);
      set({ emergency: response.data.emergencyRequest, progress: 30 });

      // Simulate notification progress
      await new Promise(resolve => {
        const interval = setInterval(() => {
          set(state => {
            const newProgress = state.progress + 5;
            if (newProgress >= 90) {
              clearInterval(interval);
              resolve();
              return { progress: 90 };
            }
            return { progress: newProgress };
          });
        }, 200);
      });

      // Complete the process
      set({ progress: 100, isFulfilled: false });
      toast.success(
        language === 'en' 
          ? 'Emergency alert sent to nearby donors!' 
          : 'تم إرسال تنبيه الطوارئ إلى المتبرعين القريبين!'
      );

      return response.data;
    } catch (error) {
      console.error('Emergency request failed:', error);
      const errorMsg = error.response?.data?.message || 
        (language === 'en' 
          ? 'Failed to send emergency alert' 
          : 'فشل إرسال تنبيه الطوارئ');
      
      set({ error: errorMsg, progress: 0 });
      toast.error(errorMsg);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  trackResponses: (emergencyId) => {
    const eventSource = new EventSource(`/api/emergency/${emergencyId}/updates`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'donor_response') {
        set(state => ({
          donorResponses: [...state.donorResponses, data],
          progress: Math.min(state.progress + 5, 95) // Increment progress slightly
        }));
        
        const { language } = useLanguageStore.getState();
        toast.info(
          language === 'en' 
            ? `${data.donorName} can help! Contact: ${data.phone}` 
            : `${data.donorName} يمكنه المساعدة! اتصل بـ: ${data.phone}`
        );
      }
      
      if (data.type === 'request_fulfilled') {
        set({ isFulfilled: true, progress: 100 });
        eventSource.close();
        
        const { language } = useLanguageStore.getState();
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
  },

  resetEmergency: () => {
    set({ 
      emergency: null,
      isLoading: false,
      error: null,
      progress: 0,
      donorResponses: [],
      isFulfilled: false
    });
  }
}));