import api from './apiClient';

export const adminApi = {
    getAdminProfile: () => api.get('/auth/me'),
    getSystemOverview: () => api.get('/admin/overview'),
    getAllUsers: (params?: any) => api.get('/admin/users', { params }),
    getUserById: (id: string) => api.get(`/admin/users/${id}`),
    updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
    deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
    getEmergencyRequests: () => api.get('/admin/emergencies'),
    handleEmergencyRequest: (id: string, action: 'approve' | 'reject') => 
    api.put(`/admin/emergencies/${id}/${action}`),
};
