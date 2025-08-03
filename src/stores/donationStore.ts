import { create } from 'zustand';
import { donationApi } from '../services/api';

type Donation = {
  id: string;
  donorId: string;
  hospitalId: string;
  bloodType: string;
  units: number;
  status: string;
  date: string;
  // other donation fields
};

type DonationState = {
  donations: Donation[];
  currentDonation: Donation | null;
  loading: boolean;
  error: string | null;
};

type DonationActions = {
  createDonation: (data: Parameters<typeof donationApi.createDonation>[0]) => Promise<void>;
  getDonations: () => Promise<void>;
  getDonationById: (id: string) => Promise<void>;
  updateDonation: (id: string, data: Parameters<typeof donationApi.updateDonation>[1]) => Promise<void>;
  deleteDonation: (id: string) => Promise<void>;
  clearCurrentDonation: () => void;
  clearError: () => void;
};

const useDonationStore = create<DonationState & DonationActions>((set) => ({
  donations: [],
  currentDonation: null,
  loading: false,
  error: null,

  createDonation: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await donationApi.createDonation(data);
      set((state) => ({
        donations: [...state.donations, response.data],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create donation', loading: false });
    }
  },

  getDonations: async () => {
    set({ loading: true, error: null });
    try {
      const response = await donationApi.getDonations();
      set({ donations: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch donations', loading: false });
    }
  },

  getDonationById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await donationApi.getDonationById(id);
      set({ currentDonation: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch donation', loading: false });
    }
  },

  updateDonation: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await donationApi.updateDonation(id, data);
      set((state) => ({
        donations: state.donations.map((donation) =>
          donation.id === id ? response.data : donation
        ),
        currentDonation: response.data,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update donation', loading: false });
    }
  },

  deleteDonation: async (id) => {
    set({ loading: true, error: null });
    try {
      await donationApi.deleteDonation(id);
      set((state) => ({
        donations: state.donations.filter((donation) => donation.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete donation', loading: false });
    }
  },

  clearCurrentDonation: () => set({ currentDonation: null }),
  clearError: () => set({ error: null }),
}));

export default useDonationStore;