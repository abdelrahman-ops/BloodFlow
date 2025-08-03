import axios, { AxiosError, AxiosResponse } from 'axios';
import { url } from '../constant/URL';
import Cookies from 'js-cookie';

const API_BASE_URL = url;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token if available
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
        // Handle unauthorized access
        Cookies.remove('token');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    registerDonor: (data: {
        name: string;
        email: string;
        password: string;
        bloodType: string;
        // other donor fields
    }) => api.post('/auth/register', data),

    registerQuickDonor: (data: {
        name: string;
        email: string;
        bloodType: string;
        // other quick donor fields
    }) => api.post('/auth/register/quick', data),

    registerAdmin: (data: {
        name: string;
        email: string;
        password: string;
        // other admin fields
    }) => api.post('/auth/register/admin', data),

    login: (data: { email: string; password: string }) =>
        api.post('/auth/login', data),

    logout: () => api.post('/auth/logout'),

    getUserData: () => api.get('/auth/me'),

    getAdminData: () => api.get('/auth/admin'),
};

// Hospital API
export const hospitalApi = {
    createHospital: (data: {
        name: string;
        address: string;
        contact: string;
        // other hospital fields
    }) => api.post('/hospitals', data),

    getHospitals: () => api.get('/hospitals'),

    getHospitalById: (id: string) => api.get(`/hospitals/${id}`),

    updateHospital: (id: string, data: {
        name?: string;
        address?: string;
        contact?: string;
        // other updatable fields
    }) => api.put(`/hospitals/${id}`, data),

    deleteHospital: (id: string) => api.delete(`/hospitals/${id}`),
};

// Donation API
export const donationApi = {
    createDonation: (data: {
        donorId: string;
        hospitalId: string;
        bloodType: string;
        units: number;
        // other donation fields
    }) => api.post('/donations/create', data),

    getDonations: () => api.get('/donations'),

    getDonationById: (id: string) => api.get(`/donations/${id}`),

    updateDonation: (id: string, data: {
        status?: string;
        units?: number;
        // other updatable fields
    }) => api.put(`/donations/${id}`, data),

    deleteDonation: (id: string) => api.delete(`/donations/${id}`),
};

// Notification API
export const notificationApi = {
    getAdminNotifications: () => api.get('/notifications/admin'),

    markAdminNotificationRead: (id: string) =>
        api.put(`/notifications/admin/${id}/read`),

    getUserNotifications: () => api.get('/notification'),

    markUserNotificationRead: (id: string) =>
        api.put(`/notifications/user/${id}/read`),
};

// Patient API
export const patientApi = {
    registerPatient: (data: {
        name: string;
        hospitalId: string;
        bloodType: string;
        // other patient fields
    }) => api.post('/patient/register', data),

    createRequest: (data: {
        patientId: string;
        requiredBloodType: string;
        unitsNeeded: number;
        // other request fields
    }) => api.post('/patient/request', data),
};

export default api;