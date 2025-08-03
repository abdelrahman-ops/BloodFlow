import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
    language: 'en',
    toggleLanguage: () => set((state) => ({
        language: state.language === 'en' ? 'ar' : 'en'
    }))
}));