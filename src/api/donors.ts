import api from './apiClient';
import { DonorProfileResponse, DonorStatsResponse, DonationHistoryResponse, AddDonationDto, UpdateDonationDto } from '../types/apiTypes';

export const donorApi = {
    getDonorData: () => api.get<DonorProfileResponse>('/donors/profile'),
    getDonorStats: () => api.get<DonorStatsResponse>('/donors/stats'),
    updateAvailability: (availability: boolean) =>
        api.put('/donors/availability', { availability }),
    getDonationHistory: () => api.get<DonationHistoryResponse>('/donors/donations'),
    addDonation: (data: AddDonationDto) => api.post('/donors/donations', data),
    updateDonation: (id: string, data: UpdateDonationDto) =>
        api.put(`/donors/donations/${id}`, data),
    getNearbyRequests: () => api.get('/donors/nearby-requests'),
    updateHealthInfo: (healthInfo: string) =>
        api.put('/donors/health-info', { healthInfo }),
    getAllDonors: (params?: Record<string, any>) => api.get('/donors', { params }),
};
