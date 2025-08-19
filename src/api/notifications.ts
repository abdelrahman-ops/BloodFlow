import api from './apiClient';

export const notificationApi = {
    getAdminNotifications: () => api.get('/notification'),
    markAdminNotificationRead: (id: string) => api.put(`/notification/${id}/read`),
    getUserNotifications: () => api.get('/notification'),
    markUserNotificationRead: (id: string) => api.put(`/notification/${id}/read`),
};
