// adminStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { adminApi } from '../api';
import type { AdminUser, Hospital } from '../types/apiTypes';
import useAuthStore from './authStore';

interface SystemStats {
    totalDonors: number;
    totalDonations: number;
    activeRequests: number;
    pendingRequests: number;
    hospitalsCount: number;
}

interface AdminState {
    adminProfile: {
        user: AdminUser | null;
        hospital: Hospital | null;
        stats: SystemStats | null;
    };
    users: {
        data: any[];
        total: number;
        page: number;
        limit: number;
    } | null;
    emergencies: any[];
    loading: boolean;
    error: string | null;
}

interface AdminActions {
    getAdminProfile: () => Promise<void>;
    getSystemOverview: () => Promise<void>;
    getAllUsers: (params?: {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
    }) => Promise<void>;
    getUserById: (id: string) => Promise<any>;
    updateUser: (id: string, data: any) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    getEmergencyRequests: () => Promise<void>;
    handleEmergencyRequest: (id: string, action: 'approve' | 'reject') => Promise<void>;
    clearError: () => void;
    clearAdminStore: () => void;
}

const initialState: AdminState = {
    adminProfile: {
        user: null,
        hospital: null,
        stats: null,
    },
    users: null,
    emergencies: [],
    loading: false,
    error: null,
};

const useAdminStore = create<AdminState & AdminActions>()(
    persist(
        (set, get) => ({
        ...initialState,

        getAdminProfile: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await adminApi.getAdminProfile();
            console.log('response from admin store', response)
            set({
                adminProfile: {
                user: response.data.user,
                hospital: response.data.hospital,
                stats: null, // Will be populated by getSystemOverview
                },
                loading: false,
            });
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch admin profile',
                loading: false,
            });
            }
        },

        getSystemOverview: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await adminApi.getSystemOverview();
            set(state => ({
                adminProfile: {
                ...state.adminProfile,
                stats: response.data,
                },
                loading: false,
            }));
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch system overview',
                loading: false,
            });
            }
        },

        getAllUsers: async (params = {}) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await adminApi.getAllUsers(params);
            set({
                users: response.data,
                loading: false,
            });
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch users',
                loading: false,
            });
            }
        },

        getUserById: async (id) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await adminApi.getUserById(id);
            set({ loading: false });
            return response.data;
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch user',
                loading: false,
            });
            throw error;
            }
        },

        updateUser: async (id, data) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            await adminApi.updateUser(id, data);
            if (get().users) {
                await get().getAllUsers({
                page: get().users?.page || 1,
                limit: get().users?.limit || 10,
                });
            }
            set({ loading: false });
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to update user',
                loading: false,
            });
            }
        },

        deleteUser: async (id) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            await adminApi.deleteUser(id);
            if (get().users) {
                await get().getAllUsers({
                page: get().users?.page || 1,
                limit: get().users?.limit || 10,
                });
            }
            set({ loading: false });
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to delete user',
                loading: false,
            });
            }
        },

        getEmergencyRequests: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await adminApi.getEmergencyRequests();
            set({
                emergencies: response.data,
                loading: false,
            });
            } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch emergencies',
                loading: false,
            });
            }
        },

        handleEmergencyRequest: async (id, action) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            await adminApi.handleEmergencyRequest(id, action);
            await get().getEmergencyRequests();
            set({ loading: false });
            } catch (error: any) {
            set({
                error: error.response?.data?.message || `Failed to ${action} emergency`,
                loading: false,
            });
            }
        },

        clearError: () => set({ error: null }),
        clearAdminStore: () => set(initialState),
        }),
        {
        name: 'admin-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            adminProfile: state.adminProfile,
        }),
        }
    )
);

export default useAdminStore;