import { create } from 'zustand';
import { authApi } from '../services/api';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import axios from 'axios';

type User = {
    id: string;
    name: string;
    email: string;
    role: 'donor' | 'admin';
    bloodType?: string;
    address: string;
    age: number;
    phone: number;
    availability: boolean;
    lastDonationDate: Date;
    donationHistory: Date;
};

type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    data: any | null; // Add data field from DataContext
};

type AuthActions = {
    registerDonor: (data: Parameters<typeof authApi.registerDonor>[0]) => Promise<void>;
    registerQuickDonor: (data: Parameters<typeof authApi.registerQuickDonor>[0]) => Promise<void>;
    registerAdmin: (data: Parameters<typeof authApi.registerAdmin>[0]) => Promise<void>;
    login: (data: Parameters<typeof authApi.login>[0]) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
    clearError: () => void;
    storeData: (receivedData: any) => void; // From DataContext
    clearData: () => void; // From DataContext
};

const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: !!Cookies.get('token'),
            loading: false,
            error: null,
            data: null, // Initialize data

            registerDonor: async (data) => {
                set({ loading: true, error: null });
                try {
                    const response = await authApi.registerDonor(data);
                    set({
                        user: response.data.user,
                        token: response.data.token,
                        isAuthenticated: true,
                        loading: false,
                    });
                    Cookies.set('token', response.data.token);
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Registration failed', loading: false });
                }
            },

            registerQuickDonor: async (data) => {
                set({ loading: true, error: null });
                try {
                    const response = await authApi.registerQuickDonor(data);
                    set({
                        user: response.data.user,
                        token: response.data.token,
                        isAuthenticated: true,
                        loading: false,
                    });
                    Cookies.set('token', response.data.token);
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Quick registration failed', loading: false });
                }
            },

            registerAdmin: async (data) => {
                set({ loading: true, error: null });
                try {
                    const response = await authApi.registerAdmin(data);
                    set({
                        user: response.data.user,
                        token: response.data.token,
                        isAuthenticated: true,
                        loading: false,
                    });
                    Cookies.set('token', response.data.token);
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Admin registration failed', loading: false });
                }
            },

            login: async (data) => {
                set({ loading: true, error: null });
                try {
                    const response = await authApi.login(data);
                    set({
                        user: response.data.user,
                        token: response.data.token,
                        isAuthenticated: true,
                        loading: false,
                        data: response.data.user, // Store user data here as well
                    });
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Login failed', loading: false });
                }
            },

            logout: async () => {
                set({ loading: true });
                try {
                    await authApi.logout();
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        loading: false,
                        data: null,
                    });
                    Cookies.remove('token');
                    localStorage.removeItem('userData');
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Logout failed', loading: false });
                }
            },

            loadUser: async () => {
                set({ loading: true });
                try {
                    const token = Cookies.get('token');
                    if (!token) {
                        set({ 
                            isAuthenticated: false,
                            loading: false 
                        });
                        return;
                    }
                    
                    const response = await authApi.getUserData();
                    set({
                        user: response.data,
                        isAuthenticated: true,
                        loading: false,
                        data: response.data, // Store user data here as well
                    });
                    localStorage.setItem('userData', JSON.stringify(response.data));
                } catch (error: any) {
                    // Fallback to localStorage if API fails
                    const storedData = localStorage.getItem('userData');
                    if (storedData) {
                        set({
                            user: JSON.parse(storedData),
                            isAuthenticated: true,
                            loading: false,
                            data: JSON.parse(storedData),
                        });
                    } else {
                        Cookies.remove('token');
                        set({
                            user: null,
                            token: null,
                            isAuthenticated: false,
                            loading: false,
                            data: null,
                        });
                    }
                }
            },

            clearError: () => set({ error: null }),

            // DataContext functions
            storeData: (receivedData) => {
                set({ data: receivedData });
                localStorage.setItem('userData', JSON.stringify(receivedData));
            },

            clearData: () => {
                set({ data: null });
                localStorage.removeItem('userData');
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ 
                token: state.token, 
                user: state.user,
                data: state.data // Persist data as well
            }),
        }
    )
);

export default useAuthStore;