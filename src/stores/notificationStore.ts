import { create } from 'zustand';
import { notificationApi } from '../services/api';

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  // other notification fields
};

type NotificationState = {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
};

type NotificationActions = {
  getAdminNotifications: () => Promise<void>;
  markAdminNotificationRead: (id: string) => Promise<void>;
  getUserNotifications: () => Promise<void>;
  markUserNotificationRead: (id: string) => Promise<void>;
  clearNotifications: () => void;
  clearError: () => void;
};

const useNotificationStore = create<NotificationState & NotificationActions>((set) => ({
  notifications: [],
  loading: false,
  error: null,

  getAdminNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await notificationApi.getAdminNotifications();
      set({ notifications: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch admin notifications', loading: false });
    }
  },

  markAdminNotificationRead: async (id) => {
    set({ loading: true, error: null });
    try {
      await notificationApi.markAdminNotificationRead(id);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to mark notification as read', loading: false });
    }
  },

  getUserNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await notificationApi.getUserNotifications();
      set({ notifications: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch user notifications', loading: false });
    }
  },

  markUserNotificationRead: async (id) => {
    set({ loading: true, error: null });
    try {
      await notificationApi.markUserNotificationRead(id);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to mark notification as read', loading: false });
    }
  },

  clearNotifications: () => set({ notifications: [] }),
  clearError: () => set({ error: null }),
}));

export default useNotificationStore;