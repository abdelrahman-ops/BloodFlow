import { create } from 'zustand';
import { notificationApi } from '../api/index';
import { toast } from 'react-toastify';
import { persist, createJSONStorage } from 'zustand/middleware';
import useAuthStore from './authStore';

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: string; // For additional notification categorization
  metadata?: Record<string, any>; // For any additional data
};

type NotificationState = {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  lastFetched: number | null; // timestamp of last fetch
};

type NotificationActions = {
  fetchNotifications: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  clearNotifications: () => void;
  clearError: () => void;
  refreshNotifications: () => Promise<void>;
};

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  lastFetched: null,
};

const useNotificationStore = create<NotificationState & NotificationActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchNotifications: async () => {
        const { user, isAuthenticated } = useAuthStore.getState();
        
        if (!isAuthenticated || !user) {
          set({ notifications: [], unreadCount: 0 });
          return;
        }

        set({ loading: true, error: null });
        
        try {
          let response;
          
          if (user.role === 'admin') {
            response = await notificationApi.getAdminNotifications();
          } else {
            response = await notificationApi.getUserNotifications();
          }

          const notifications = Array.isArray(response.data) 
            ? response.data 
            : response.data?.notifications || [];

          set({
            notifications,
            unreadCount: notifications.filter(n => !n.read).length,
            loading: false,
            lastFetched: Date.now(),
          });
        } catch (error: any) {
          // Don't show error toast for 401 (unauthorized)
          if (error.response?.status !== 401) {
            toast.error('Failed to load notifications');
          }
          set({ 
            loading: false, 
            error: error.response?.data?.message || 'Failed to load notifications',
            notifications: [],
            unreadCount: 0,
          });
        }
      },

      markNotificationRead: async (id) => {
        const { user, isAuthenticated } = useAuthStore.getState();
        
        if (!isAuthenticated || !user) {
          return;
        }

        set({ loading: true, error: null });
        
        try {
          if (user.role === 'admin') {
            await notificationApi.markAdminNotificationRead(id);
          } else {
            await notificationApi.markUserNotificationRead(id);
          }

          set((state) => {
            const updatedNotifications = state.notifications.map((notification) =>
              notification.id === id ? { ...notification, read: true } : notification
            );
            
            return {
              notifications: updatedNotifications,
              unreadCount: updatedNotifications.filter(n => !n.read).length,
              loading: false,
            };
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Failed to mark notification as read', 
            loading: false 
          });
        }
      },

      markAllNotificationsRead: async () => {
        const { user, isAuthenticated } = useAuthStore.getState();
        const { notifications } = get();
        
        if (!isAuthenticated || !user || notifications.length === 0) {
          return;
        }

        set({ loading: true, error: null });
        
        try {
          // Mark all unread notifications as read
          const unreadIds = notifications
            .filter(n => !n.read)
            .map(n => n.id);

          // In a real app, you might want to batch these requests
          if (unreadIds.length > 0) {
            if (user.role === 'admin') {
              await Promise.all(unreadIds.map(id => 
                notificationApi.markAdminNotificationRead(id)
              ));
            } else {
              await Promise.all(unreadIds.map(id => 
                notificationApi.markUserNotificationRead(id)
              ));
            }
          }

          set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0,
            loading: false,
          }));
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Failed to mark notifications as read', 
            loading: false 
          });
        }
      },

      refreshNotifications: async () => {
        // Only refresh if last fetch was more than 30 seconds ago
        const { lastFetched } = get();
        if (lastFetched && Date.now() - lastFetched < 30000) {
          return;
        }
        await get().fetchNotifications();
      },

      clearNotifications: () => set({ 
        notifications: [], 
        unreadCount: 0,
        lastFetched: null,
      }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        lastFetched: state.lastFetched,
      }),
    }
  )
);

// Subscribe to auth changes to automatically fetch notifications
useAuthStore.subscribe((state) => {
  if (state.isAuthenticated && state.user) {
    useNotificationStore.getState().fetchNotifications();
  } else {
    useNotificationStore.getState().clearNotifications();
  }
});

export default useNotificationStore;