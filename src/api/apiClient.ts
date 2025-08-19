import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { url } from './constant/URL';

const api: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const refreshClient = axios.create({
  baseURL: url,
  withCredentials: true,
});

// Track if we're currently refreshing token
let isRefreshing = false;

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Skip if no request config or not a 401 error
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Skip auth endpoints to avoid loops
    if (originalRequest.url?.includes('/auth/')) {
      return Promise.reject(error);
    }

    const refreshToken = Cookies.get('refreshToken');
    
    // If no refresh token, reject but don't redirect here
    if (!refreshToken) {
      return Promise.reject(error);
    }

    // If we're already refreshing, wait for it to complete
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        // Wait until token is refreshed
        const interval = setInterval(() => {
          if (!isRefreshing) {
            clearInterval(interval);
            // Retry the original request with new token
            api(originalRequest).then(resolve).catch(reject);
          }
        }, 100);
      });
    }

    isRefreshing = true;

    try {
      const { data } = await refreshClient.post('/auth/refresh', { refreshToken });
      
      Cookies.set('token', data.token);
      Cookies.set('refreshToken', data.refreshToken);

      // Update the original request header
      originalRequest.headers.Authorization = `Bearer ${data.token}`;
      
      // Retry the original request
      return api(originalRequest);
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      // Only redirect if this was a protected API call
      if (shouldRedirect(originalRequest.url)) {
        logoutAndRedirect();
      }
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);

function shouldRedirect(url?: string): boolean {
  if (!url) return false;
  // List endpoints that should trigger redirect when auth fails
  const protectedEndpoints = [
    '/user/',
    '/profile/',
    '/settings/',
    // Add other protected endpoints
  ];
  return protectedEndpoints.some(endpoint => url.includes(endpoint));
}

function logoutAndRedirect() {
  Cookies.remove('token');
  Cookies.remove('refreshToken');
  // Prevent multiple redirects
  if (!window.location.pathname.startsWith('/login')) {
    window.location.href = '/login';
  }
}

export default api;