import React, { useState, useEffect } from "react";
import { 
  FaTimes, 
  FaCheckCircle, 
  FaBell, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaFilter,
  FaSpinner,
  FaTint,
  FaHeartbeat
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const Notification = ({ notifications, onMarkAsRead, onDismiss, onClose, isLoading }) => {
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isExpandedView, setIsExpandedView] = useState(false);

    // Mobile swipe handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setIsExpandedView(true),
        onSwipedRight: () => setIsExpandedView(false),
        trackMouse: true
    });

    // Filter notifications based on selection
    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'read') return notification.read;
        if (filter === 'unread') return !notification.read;
        return true;
    });

    const handleMarkAsRead = (id, e) => {
        e?.stopPropagation();
        onMarkAsRead(id);
    };

    const handleNotificationClick = (notification) => {
        if (window.innerWidth <= 768) { // Mobile behavior
            setSelectedNotification(notification);
            setIsExpandedView(true);
        }
    };

    const handleBackToList = () => {
        setIsExpandedView(false);
    };

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            const notificationElement = document.querySelector('.notification-container');
            if (notificationElement && !notificationElement.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex justify-end items-start pt-16 md:pt-4 px-2 md:px-4 bg-black bg-opacity-30">
            <motion.div 
                {...swipeHandlers}
                className="notification-container w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25 }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaBell className="text-white" />
                        <h2 className="font-bold text-lg">Blood Donation Alerts</h2>
                        {notifications.filter(n => !n.read).length > 0 && (
                            <span className="bg-white text-red-600 text-xs px-2 py-1 rounded-full">
                                {notifications.filter(n => !n.read).length}
                            </span>
                        )}
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                        aria-label="Close notifications"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Filter Controls */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 py-3 text-sm font-medium ${
                            filter === 'all' 
                                ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400' 
                                : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`flex-1 py-3 text-sm font-medium ${
                            filter === 'unread' 
                                ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400' 
                                : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        Unread
                    </button>
                    <button
                        onClick={() => setFilter('read')}
                        className={`flex-1 py-3 text-sm font-medium ${
                            filter === 'read' 
                                ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400' 
                                : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        Read
                    </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center p-8">
                        <FaSpinner className="animate-spin text-red-500 text-2xl" />
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredNotifications.length === 0 && (
                    <div className="p-6 text-center dark:text-gray-200">
                        <FaTint className="mx-auto text-red-400 text-4xl mb-3" />
                        <h3 className="text-lg font-medium">No notifications</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {filter === 'all' 
                                ? "You're all caught up!" 
                                : filter === 'read' 
                                    ? "No read notifications" 
                                    : "No unread notifications"}
                        </p>
                    </div>
                )}

                {/* Notification List */}
                {!isLoading && filteredNotifications.length > 0 && !isExpandedView && (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[60vh] overflow-y-auto">
                        {filteredNotifications.map((notification) => (
                            <motion.div
                                key={notification._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`p-4 ${
                                    notification.read 
                                        ? 'bg-gray-50 dark:bg-gray-700' 
                                        : 'bg-white dark:bg-gray-800'
                                } transition-colors`}
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className="flex items-start">
                                    <div className={`mt-1 mr-3 ${
                                        notification.read 
                                            ? 'text-gray-400 dark:text-gray-500' 
                                            : 'text-red-500 dark:text-red-400'
                                    }`}>
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className={`text-sm font-medium ${
                                                notification.read 
                                                    ? 'text-gray-500 dark:text-gray-400' 
                                                    : 'text-gray-900 dark:text-white'
                                            }`}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                                {formatTime(notification.createdAt)}
                                            </span>
                                        </div>
                                        <p className={`text-sm mt-1 ${
                                            notification.read 
                                                ? 'text-gray-400 dark:text-gray-500' 
                                                : 'text-gray-600 dark:text-gray-300'
                                        }`}>
                                            {notification.message.length > 100 
                                                ? `${notification.message.substring(0, 100)}...` 
                                                : notification.message}
                                        </p>
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                onClick={(e) => handleMarkAsRead(notification._id, e)}
                                                className={`text-xs px-3 py-1 rounded-full transition-all ${
                                                    notification.read
                                                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300'
                                                        : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                                                }`}
                                            >
                                                {notification.read ? 'Read' : 'Mark as Read'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Expanded View (Mobile) */}
                {isExpandedView && selectedNotification && (
                    <motion.div 
                        className="h-full"
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center bg-white dark:bg-gray-800">
                            <button 
                                onClick={handleBackToList}
                                className="mr-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                aria-label="Back to notifications"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <h3 className="font-medium dark:text-white">Notification</h3>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 h-full">
                            <div className="flex items-center mb-4">
                                <div className={`p-3 rounded-full ${
                                    selectedNotification.read 
                                        ? 'bg-gray-100 dark:bg-gray-700' 
                                        : 'bg-red-100 dark:bg-red-900'
                                }`}>
                                    {getNotificationIcon(selectedNotification.type)}
                                </div>
                                <div className="ml-3">
                                    <h2 className="font-bold text-lg dark:text-white">{selectedNotification.title}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {formatTime(selectedNotification.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                    {selectedNotification.message}
                                </p>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={(e) => {
                                        handleMarkAsRead(selectedNotification._id, e);
                                        handleBackToList();
                                    }}
                                    className={`px-4 py-2 rounded-full transition-all ${
                                        selectedNotification.read
                                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300'
                                            : 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-700'
                                    }`}
                                >
                                    {selectedNotification.read ? 'Marked as Read' : 'Mark as Read'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Footer Actions */}
                {!isExpandedView && filteredNotifications.length > 0 && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 flex justify-between border-t border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => {
                                const unreadIds = notifications
                                    .filter(n => !n.read)
                                    .map(n => n._id);
                                unreadIds.forEach(id => onMarkAsRead(id));
                            }}
                            className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            Mark all as read
                        </button>
                        <button
                            onClick={() => {
                                if (confirm('Clear all notifications?')) {
                                    onDismiss('all');
                                }
                            }}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

// Helper function to format time
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Helper function to get notification icon
function getNotificationIcon(type) {
    const baseClass = "text-lg";
    switch (type) {
        case 'emergency':
            return <FaExclamationTriangle className={`${baseClass} text-red-500`} />;
        case 'donation':
            return <FaTint className={`${baseClass} text-red-400`} />;
        case 'health':
            return <FaHeartbeat className={`${baseClass} text-green-500`} />;
        case 'info':
            return <FaInfoCircle className={`${baseClass} text-blue-500`} />;
        default:
            return <FaBell className={`${baseClass} text-gray-500`} />;
    }
}

export default Notification;