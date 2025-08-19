import { useEffect, useState } from "react";
import { calculateNextDonation } from "../utils/donationUtils";
import useAuthStore from '../stores/authStore';
import useNotificationStore from '../stores/notificationStore';
import { useNavigate } from "react-router-dom";
import useDonorStore from "../stores/donor.store";
import { toast } from 'react-toastify';

export const useDonorDashboard = () => {

    const [showNotifications, setShowNotifications] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);

    const [notificationLoaded, setNotificationLoaded] = useState(false);
    const [shouldFetchNotifications, setShouldFetchNotifications] = useState(false);
    const navigate = useNavigate();

    // Zustand stores
    const { 
        user, 
        isAuthenticated, 
        isLoading: authLoading, 
        loadUser, 
        logout 
    } = useAuthStore();
    
    const { 
        notifications, 
        loading: notificationsLoading, 
        getUserNotifications, 
        markUserNotificationRead 
    } = useNotificationStore();

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await loadUser();
                
                if (user && user.role === 'donor') {
                    await Promise.all([
                        getDonorProfile(),
                        getDonorStats(),
                        getDonationHistory(),
                        getNearbyRequests()
                    ]);
                    
                    // Set flag for notifications but don't fetch yet
                    setShouldFetchNotifications(true);
                }

                if (user && user.role === 'admin') {
                    // Load admin-specific data here if needed
                    console.log('Admin user detected, loading admin dashboard');
                }

            } catch (error) {
                console.error("Failed to load initial data:", error);
                if (error.response?.status !== 401) {
                    toast.error("Failed to load dashboard data");
                }
            }
        };

        loadInitialData();

        // Cleanup function
        return () => {
            // Clear any pending requests if needed
        };
    }, [isAuthenticated, user?.role]);

    // Calculate next donation date
    useEffect(() => {
        const lastDonation = stats?.lastDonationDate || donorProfile?.donor?.lastDonationDate;
        
        if (lastDonation) {
            const { nextDate, daysLeft } = calculateNextDonation(new Date(lastDonation));
            setDaysUntilNextDonation(daysLeft);
            setNextDonationDate(
                daysLeft > 0
                    ? `${daysLeft} days until next donation`
                    : "You can donate now!"
            );
        }
    }, [stats, donorProfile]);

    // Notification handling
    const toggleNotifications = async () => {
        setShowNotifications(!showNotifications);
        
        // Only fetch if:
        // 1. Opening notifications
        // 2. User is authenticated
        // 3. Notifications haven't been loaded yet
        if (!showNotifications && isAuthenticated && !notificationLoaded) {
            try {
                await getUserNotifications();
                setNotificationLoaded(true);
            } catch (error) {
                console.error("Failed to load notifications:", error);
                if (error.response?.status !== 401) {
                    toast.error("Failed to load notifications");
                }
            }
        }
    };
    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleMarkNotificationAsRead = async (id) => {
        try {
            await markUserNotificationRead(id);
            return { success: true, message: "Notification marked as read" };
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Failed to mark notification as read" 
            };
        }
    };

    // Booking functions
    const handleConfirmBooking = async (bookingDetails) => {
        try {
            await addDonation({
                hospital: bookingDetails.hospital,
                date: bookingDetails.date,
                bloodType: bookingDetails.bloodType,
                quantity: bookingDetails.quantity
            });
            
            setShowBookingModal(false);
            toast.success(
                `Appointment booked for ${new Date(bookingDetails.date).toLocaleDateString()} at ${bookingDetails.hospital}`
            );
            await getDonationHistory(); // Refresh history
            
            return { success: true };
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error(error.response?.data?.message || "Failed to book appointment");
            return { success: false };
        }
    };

    // Availability toggle
    const handleToggleAvailability = async () => {
        const currentAvailability = donorProfile?.donor?.availability ?? false;
        try {
            await updateAvailability(!currentAvailability);
            toast.success(
                `You are now ${!currentAvailability ? "available" : "unavailable"} for donations`
            );
            return { success: true };
        } catch (error) {
            console.error("Availability update failed:", error);
            toast.error("Failed to update availability");
            return { success: false };
        }
    };

    // Logout handler
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            toast.success("Logged out successfully");
            return { success: true };
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed");
            return { success: false };
        }
    };

    return {
        // State
        nextDonationDate,
        daysUntilNextDonation,
        showBookingModal,
        showNotifications,
        showAiModal,
        darkMode,
        activeTab,
        user,
        isAuthenticated,
        authLoading,
        notifications,
        notificationsLoading,
        donorProfile,
        donorStats: stats,
        donationHistory,
        nearbyRequests,
        donorList,
        donorLoading,
        donorError,

        // Handlers
        setShowBookingModal,
        setShowNotifications,
        setShowAiModal,
        setActiveTab,
        toggleNotifications,
        toggleDarkMode,
        handleMarkNotificationAsRead,
        handleConfirmBooking,
        handleToggleAvailability,
        handleLogout,
        clearDonorError: clearError,
    };
};