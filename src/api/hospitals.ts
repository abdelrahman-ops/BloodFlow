import api from './apiClient';

export const hospitalApi = {
    createHospital: (data: Record<string, any>) => api.post('/hospitals', data),
    getHospitals: () => api.get('/hospitals'),
    getHospitalById: (id: string) => api.get(`/hospitals/${id}`),
    updateHospital: (id: string, data: Record<string, any>) =>
        api.put(`/hospitals/${id}`, data),
    deleteHospital: (id: string) => api.delete(`/hospitals/${id}`),
};
