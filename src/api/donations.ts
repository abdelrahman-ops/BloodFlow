import api from './apiClient';

export const donationApi = {
    createDonation: (data: Record<string, any>) => api.post('/donations/create', data),
    getDonationById: (id: string) => api.get(`/donations/${id}`),
    updateDonation: (id: string, data: Record<string, any>) =>
        api.put(`/donations/${id}`, data),
    deleteDonation: (id: string) => api.delete(`/donations/${id}`),
};
