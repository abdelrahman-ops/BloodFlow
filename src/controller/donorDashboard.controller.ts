import { useEffect, useState } from "react";
import { calculateNextDonation } from "../utils/donationUtils";
import useAuthStore from '../stores/authStore';
import useNotificationStore from '../stores/notificationStore';
import { useNavigate } from "react-router-dom";
import useDonorStore from "../stores/donorStore";
import { toast } from 'react-toastify';

export const useDonorDashboard = () => {
    const [nextDonationDate, setNextDonationDate] = useState("");
    const [daysUntilNextDonation, setDaysUntilNextDonation] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState("progress");
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
        donorProfile,
        stats,
        donationHistory,
        nearbyRequests,
        donorList,
        loading: donorLoading,
        error: donorError,
        getDonorProfile,
        getDonorStats,
        updateAvailability,
        getDonationHistory,
        addDonation,
        updateDonation,
        getNearbyRequests,
        getAllDonors,
        clearError
    } = useDonorStore();

    
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

        
        // Only fetch if:
        // 1. Opening notifications
        // 2. User is authenticated
        // 3. Notifications haven't been loaded yet
        
    const toggleDarkMode = () => setDarkMode(!darkMode);

    

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
        donorProfile,
        donorStats: stats,
        donationHistory,
        nearbyRequests,
        donorList,
        donorLoading,
        donorError,

        // Handlers
        setShowBookingModal,
        setShowAiModal,
        setActiveTab,
        toggleDarkMode,
        handleConfirmBooking,
        handleToggleAvailability,
        handleLogout,
        clearDonorError: clearError,
    };
};