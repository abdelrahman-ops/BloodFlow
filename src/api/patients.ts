import api from './apiClient';

export const patientApi = {
    registerPatient: (data: Record<string, any>) => api.post('/patient/register', data),
    createRequest: (data: Record<string, any>) => api.post('/patient/request', data),
};
