// donorStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { donorApi } from '../api';
import type { Donation, DonorStats, BloodRequest, Donor } from '../types/apiTypes';
import useAuthStore from './authStore';

interface DonorProfileUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    bloodType: string;
    city: string;
    district: string;
    gender: string;
    role: string;
}

interface DonorProfileDonor {
    lastDonationDate: string | null;
    donationHistory: Donation[];
    donorLevel: 'Bronze' | 'Silver' | 'Gold' | null;
    points: number;
    availability: boolean;
    donationCount: number;
}

interface DonorState {
    donorProfile: {
        user: DonorProfileUser | null;
        donor: DonorProfileDonor | null;
    };
    stats: DonorStats | null;
    donationHistory: Donation[];
    nearbyRequests: BloodRequest[];
    donorList: {
        donors: Donor[];
        total: number;
        page: number;
        limit: number;
    } | null;
    loading: boolean;
    error: string | null;
}

interface DonorActions {
    getDonorProfile: () => Promise<void>;
    getDonorStats: () => Promise<void>;
    updateAvailability: (availability: boolean) => Promise<void>;
    getDonationHistory: () => Promise<void>;
    addDonation: (data: {
        hospital: string;
        request?: string;
        bloodType?: string;
        quantity?: number;
        notes?: string;
        date?: string;
    }) => Promise<void>;
    updateDonation: (donationId: string, data: {
        date?: string;
        hospital?: string;
        bloodType?: string;
        quantity?: number;
        notes?: string;
        status?: 'Completed' | 'Cancelled' | 'Pending';
    }) => Promise<void>;
    getNearbyRequests: () => Promise<void>;
    updateHealthInfo: (healthInfo: string) => Promise<void>;
    getAllDonors: (params?: {
        bloodType?: string;
        city?: string;
        district?: string;
        availability?: boolean;
        page?: number;
        limit?: number;
    }) => Promise<void>;
    clearError: () => void;
    clearDonorStore: () => void;
}

const initialState: DonorState = {
    donorProfile: {
        user: null,
        donor: null
    },
    stats: null,
    donationHistory: [],
    nearbyRequests: [],
    donorList: null,
    loading: false,
    error: null
};

const useDonorStore = create<DonorState & DonorActions>()(
    persist(
        (set, get) => ({
        ...initialState,

        getDonorProfile: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.getDonorData();
            set({
                donorProfile: {
                ...response.data,
                donor: response.data.donor
                    ? {
                        ...response.data.donor,
                        donationHistory: response.data.donor.donationHistory.map((donation: any) => ({
                        ...donation,
                        bloodType: donation.bloodType ?? response.data.user.bloodType
                        }))
                    }
                    : null
                },
                loading: false
            });
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch donor profile', 
                loading: false 
            });
            }
        },

        getDonorStats: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.getDonorStats();
            set({
                stats: {
                ...response.data,
                donorLevel: ['Bronze', 'Silver', 'Gold'].includes(response.data.donorLevel)
                    ? response.data.donorLevel as 'Bronze' | 'Silver' | 'Gold'
                    : 'Bronze'
                },
                loading: false
            });
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch donor stats', 
                loading: false 
            });
            }
        },

        updateAvailability: async (availability) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.updateAvailability(availability);
            set(state => ({
                donorProfile: {
                ...state.donorProfile,
                donor: {
                    ...(state.donorProfile.donor || {}),
                    availability: response.data.availability
                }
                },
                loading: false
            }));
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to update availability', 
                loading: false 
            });
            }
        },

        getDonationHistory: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.getDonationHistory();
            set({
                donationHistory: response.data,
                loading: false
            });
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch donation history', 
                loading: false 
            });
            }
        },

        addDonation: async (data) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.addDonation(data);
            set(state => ({
                donationHistory: [
                ...state.donationHistory,
                {
                    ...response.data.donation,
                    hospital: typeof response.data.donation.hospital === 'string'
                    ? {
                        id: response.data.donation.hospital,
                        name: '',
                        address: ''
                        }
                    : response.data.donation.hospital
                }
                ],
                stats: response.data.user ? {
                ...(state.stats || {}),
                points: response.data.user.points,
                donorLevel: response.data.user.donorLevel,
                lastDonationDate: response.data.user.lastDonationDate,
                totalDonations: response.data.user.donationCount
                } : state.stats,
                loading: false
            }));
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to add donation', 
                loading: false 
            });
            }
        },

        updateDonation: async (donationId, data) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            await donorApi.updateDonation(donationId, data);
            set(state => ({
                donationHistory: state.donationHistory.map(donation => {
                if (donation.id === donationId) {
                    const updatedDonation = { ...donation, ...data };
                    if (typeof updatedDonation.hospital === 'string') {
                    updatedDonation.hospital = {
                        id: updatedDonation.hospital,
                        name: '',
                        address: ''
                    };
                    }
                    return updatedDonation as Donation;
                }
                return donation;
                }),
                loading: false
            }));
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to update donation', 
                loading: false 
            });
            }
        },

        getNearbyRequests: async () => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.getNearbyRequests();
            set({
                nearbyRequests: response.data,
                loading: false
            });
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch nearby requests', 
                loading: false 
            });
            }
        },

        updateHealthInfo: async (healthInfo) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            await donorApi.updateHealthInfo(healthInfo);
            set({ loading: false });
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to update health info', 
                loading: false 
            });
            }
        },

        getAllDonors: async (params) => {
            if (!useAuthStore.getState().isAuthenticated) return;
            
            set({ loading: true, error: null });
            try {
            const response = await donorApi.getAllDonors(params);
            set({
                donorList: response.data,
                loading: false
            });
            } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch donors list', 
                loading: false 
            });
            }
        },

        clearError: () => set({ error: null }),

        clearDonorStore: () => set(initialState)
        }),
        {
        name: 'donor-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ 
            donorProfile: state.donorProfile,
            stats: state.stats,
            donationHistory: state.donationHistory
        }),
        }
    )
);

export default useDonorStore;