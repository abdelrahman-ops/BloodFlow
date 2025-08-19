// authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { authApi } from '../api';
import type { AxiosError } from 'axios';
import type { DonorRegisterDto, LoginDto, DonorProfileResponse, AdminRegisterDto } from '../types/apiTypes';
import useDonorStore from './donorStore';
import useAdminStore from './adminStore';

type UserRole = 'donor' | 'admin' | 'user';

interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
}

interface DonorUser extends BaseUser {
  role: 'donor';
  bloodType: string;
  address: string;
  age: number;
  availability: boolean;
  lastDonationDate: string;
  donationHistory: string[];
}

interface AdminUser extends BaseUser {
  role: 'admin';
  hospital?: {
    id: string;
    name: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
    location?: {
      type: string;
      coordinates: [number, number];
    };
  };
}

type User = DonorUser | AdminUser;

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  registerDonor: (data: DonorRegisterDto) => Promise<void>;
  registerAdmin: (data: AdminRegisterDto) => Promise<void>;
  login: (data: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateProfile: (data: DonorProfileResponse) => Promise<void>;
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token'),
  isLoading: false,
  error: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      registerDonor: async (formData) => {
        await handleAuthRequest({
          apiCall: authApi.registerDonor,
          payload: formData,
          errorMessage: 'Donor Registration failed',
        });
      },

      registerAdmin: async (formData) => {
        try {
          await handleAuthRequest({
            apiCall: authApi.registerAdmin,
            payload: formData,
            errorMessage: 'Admin registration failed',
          });
        } catch (error) {
          console.error('Admin registration error:', error);
          throw error;
        }
      },

      login: async (formData) => {
        await handleAuthRequest({
          apiCall: authApi.login,
          payload: formData,
          errorMessage: 'Login failed',
        });
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          localStorage.removeItem('auth-storage');
          localStorage.removeItem('donor-storage');
          localStorage.removeItem('admin-storage');

          set({
            ...initialState,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });

          // Clear related stores
          useDonorStore.getState().clearDonorStore();
          useAdminStore.getState().clearAdminStore();
        } catch (error) {
          console.error('Logout error:', error);
          Cookies.remove('token');
          localStorage.clear();
          set({
            ...initialState,
            isLoading: false,
          });
        }
      },

      loadUser: async () => {
        const { token } = get();
        
        if (get().isLoading || !token) {
          if (!token) {
            set({ isAuthenticated: false });
          }
          return;
        }

        set({ isLoading: true });

        try {
          const response = await authApi.getUserData();
          const userData = response.data;

          let user: User;
          if (userData.role === 'admin') {
            user = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              role: 'admin',
              hospital: userData.hospital
            };
            
            // Load admin-specific data
            await useAdminStore.getState().getAdminProfile();
            await useAdminStore.getState().getSystemOverview();
          } else {
            user = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              bloodType: userData.bloodType,
              address: `${userData.city}, ${userData.district}`,
              age: userData.age || 0,
              role: 'donor',
              availability: userData.donorProfile?.availability || false,
              lastDonationDate: userData.donorProfile?.lastDonationDate || '',
              donationHistory: userData.donorProfile?.donationHistory || [],
            };
            
            // Load donor-specific data
            await useDonorStore.getState().getDonorProfile();
            await useDonorStore.getState().getDonorStats();
          }
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Failed to load user:', error);

          if (error.response?.status === 401) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            Cookies.remove('token');
            return;
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          Cookies.remove('token');
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          const response = await authApi.updateUserProfile(data);
          const updatedUser = response.data;
          
          set({
            user: updatedUser,
            isLoading: false,
          });
          
          // Refresh profile data based on role
          if (updatedUser.role === 'admin') {
            await useAdminStore.getState().getAdminProfile();
          } else {
            await useDonorStore.getState().getDonorProfile();
          }
        } catch (error) {
          set({ 
            error: extractErrorMessage(error) || 'Profile update failed',
            isLoading: false 
          });
        }
      },

      changePassword: async (data) => {
        set({ isLoading: true });
        try {
          await authApi.changePassword(data);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: extractErrorMessage(error) || 'Password change failed',
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 2,
    }
  )
);

// Utility functions
const extractErrorMessage = (error: unknown): string => {
  if (typeof error !== 'object' || error === null) {
    return 'An unknown error occurred';
  }

  const axiosError = error as AxiosError;
  
  if (axiosError.response) {
    const responseData = axiosError.response.data as any;
    if (typeof responseData === 'object' && responseData !== null) {
      return (
        responseData.message ||
        responseData.error ||
        axiosError.message ||
        'Request failed'
      );
    }
    return axiosError.message;
  }

  return axiosError.message || 'Network error';
};

interface HandleAuthRequestParams<T> {
  apiCall: (data: T) => Promise<any>;
  payload: T;
  errorMessage: string;
}

const handleAuthRequest = async <T>({
  apiCall,
  payload,
  errorMessage,
}: HandleAuthRequestParams<T>) => {
  useAuthStore.setState({ isLoading: true, error: null });
  
  try {
    const response = await apiCall(payload);
    const { data } = response;

    console.log("Auth response:", data);

    if (!data.user) { // This might be the issue
        throw new Error('Invalid user data in response 666');
    }




    const token = data.token;
    const refreshToken = data.refreshToken;

    if (!data.token && data.message?.includes('success')) {
      useAuthStore.setState({ 
        isLoading: false,
        error: null
      });
      return;
    }

    if (!token) {
      throw new Error('Authentication token missing in response');
    }

    Cookies.set('token', token);
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken);
    }

    const user = data.user;

    if (!user || !user.id) {
      throw new Error('Invalid user data in response 777');
    }

    useAuthStore.setState({
      user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    // Load role-specific data after auth
    await useAuthStore.getState().loadUser();
  } catch (error) {
    console.error('Auth request failed:', error);
    useAuthStore.setState({ 
      error: extractErrorMessage(error) || errorMessage, 
      isLoading: false 
    });
    throw error;
  }
};

export default useAuthStore;