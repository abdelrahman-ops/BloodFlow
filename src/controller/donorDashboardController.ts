// controllers/donorDashboardController.ts
import { useEffect, useState } from "react";
import { calculateNextDonation } from "../utils/donationUtils";
import useAuthStore from '../stores/authStore';
import useDonationStore from '../stores/donationStore';
import useNotificationStore from '../stores/notificationStore';
import { useNavigate } from "react-router-dom";

export const useDonorDashboard = () => {
    const [nextDonationDate, setNextDonationDate] = useState("");
    const [daysUntilNextDonation, setDaysUntilNextDonation] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState("progress");
    const navigate = useNavigate();

    // Zustand stores
    const { 
        user, 
        isAuthenticated, 
        loading: authLoading, 
        loadUser, 
        logout 
    } = useAuthStore();
    
    const { 
        donations, 
        loading: donationsLoading, 
        getDonations 
    } = useDonationStore();
    
    const { 
        notifications, 
        loading: notificationsLoading, 
        getUserNotifications, 
        markUserNotificationRead 
    } = useNotificationStore();

    useEffect(() => {
        loadUser();
        getDonations();
        getUserNotifications();
    }, [loadUser, getDonations, getUserNotifications]);

    useEffect(() => {
        if (user?.lastDonationDate) {
            const { nextDate, daysLeft } = calculateNextDonation(user.lastDonationDate);
            setDaysUntilNextDonation(daysLeft);
            setNextDonationDate(
                daysLeft > 0
                    ? `${daysLeft} days until next donation`
                    : "You can donate now!"
            );
        }
    }, [user]);

    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleMarkNotificationAsRead = async (id) => {
        try {
            await markUserNotificationRead(id);
            return { success: true, message: "Notification marked as read" };
        } catch {
            return { success: false, message: "Failed to mark notification as read" };
        }
    };

    const handleConfirmBooking = (bookingDetails) => {
        return { 
            success: true, 
            message: `Appointment booked for ${new Date(bookingDetails.date).toLocaleDateString()} at ${bookingDetails.hospital}` 
        };
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            return { success: true };
        } catch (error) {
            return { success: false, message: "Logout failed" };
        }
    };

    return {
        // State
        nextDonationDate,
        daysUntilNextDonation,
        showBookingModal,
        setShowBookingModal,
        showNotifications,
        setShowNotifications,
        showAiModal,
        setShowAiModal,
        darkMode,
        activeTab,
        setActiveTab,
        user,
        isAuthenticated,
        authLoading,
        donations,
        donationsLoading,
        notifications,
        notificationsLoading,
        
        // Handlers
        toggleNotifications,
        toggleDarkMode,
        handleMarkNotificationAsRead,
        handleConfirmBooking,
        handleLogout,
    };
};