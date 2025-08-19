import api from './apiClient';
import { DonorRegisterDto, LoginDto ,DonorProfileResponse, AdminRegisterDto, ChangePasswordDto } from '../types/apiTypes';

export const authApi = {
    registerDonor: (data: DonorRegisterDto) => api.post('/auth/register', data),
    registerAdmin: (data: AdminRegisterDto) => api.post('/admin/register-hospital-admin', data),
    login: (data: LoginDto) => api.post('/auth/login', data),
    getUserData: () => api.get('/auth/me'),
    updateUserProfile: (data: DonorProfileResponse) => api.put('/auth/update-profile', data),
    changePassword: (data: ChangePasswordDto) => api.put('/auth/change-password', data),
    logout: () => api.post('/auth/logout')
};
