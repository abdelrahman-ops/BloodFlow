import { create } from 'zustand';

export const useDonorStore = create((set) => ({
    user: null,
    darkMode: false,
    activeTab: 'progress',
    showBookingModal: false,
    showAiModal: false,
    showNotifications: false,
    notifications: [],
    donations: [],
    achievements: [],
    coupons: [],

    // Actions
    setUser: (user) => set({ user }),
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setShowBookingModal: (show) => set({ showBookingModal: show }),
    setShowAiModal: (show) => set({ showAiModal: show }),
    setShowNotifications: (show) => set({ showNotifications: show }),
    markNotificationAsRead: (id) => 
        set((state) => ({
        notifications: state.notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        )
        })),
    addDonation: (donation) => 
        set((state) => ({ donations: [...state.donations, donation] })),

    // Async actions
    fetchDonorData: async () => {
        const res = await fetch('/api/donor');
        const data = await res.json();
        set({ 
        user: data.user,
        notifications: data.notifications,
        donations: data.donations,
        achievements: data.achievements,
        coupons: data.coupons
        });
    }
}));