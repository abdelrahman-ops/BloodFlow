/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaTimes, FaCheckCircle, FaBell, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ notifications, onMarkAsRead, onDismiss, onClose }) => {
    const [notificationsState, setNotificationsState] = useState(notifications);
    const [isOpen, setIsOpen] = useState(true);
    const [autoCloseTimer, setAutoCloseTimer] = useState(null);

    // Animation durations (in seconds)
    const ANIMATION = {
        enter: 0,
        exit: 0,
        notification: 0,
        autoClose: 20 // seconds before auto-close
    };

    useEffect(() => {
        setNotificationsState(notifications);
    }, [notifications]);

    const handleMarkAsRead = (index) => {
        const updatedNotifications = [...notificationsState];
        updatedNotifications[index].read = true;
        setNotificationsState(updatedNotifications);
        onMarkAsRead(index);
    };

    const handleDismiss = (index) => {
        const updatedNotifications = [...notificationsState];
        updatedNotifications.splice(index, 1);
        setNotificationsState(updatedNotifications);
        onDismiss(index);
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'system':
                return <FaExclamationTriangle className="text-red-500" />;
            case 'emergency':
                return <FaExclamationTriangle className="text-yellow-500" />;
            case 'donation':
                return <FaCheckCircle className="text-green-500" />;
            case 'info':
                return <FaInfoCircle className="text-blue-500" />;
            default:
                return <FaBell className="text-gray-500" />;
        }
    };

    const startAutoCloseTimer = () => {
        if (autoCloseTimer) clearTimeout(autoCloseTimer);
        setAutoCloseTimer(setTimeout(() => {
            handleClose();
        }, ANIMATION.autoClose * 1000));
    };

    useEffect(() => {
        startAutoCloseTimer();
        return () => {
            if (autoCloseTimer) clearTimeout(autoCloseTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: ANIMATION.enter }}
                    className="fixed top-16 right-4 bg-white shadow-xl rounded-lg w-80 z-50 border border-gray-200"
                    onMouseEnter={() => clearTimeout(autoCloseTimer)}
                    onMouseLeave={startAutoCloseTimer}
                >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                        <div className="flex items-center">
                            <FaBell className="text-red-500 mr-2" />
                            <h4 className="text-lg font-bold text-gray-800">Notifications</h4>
                            {notificationsState.filter(n => !n.read).length > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {notificationsState.filter(n => !n.read).length}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close notifications"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notificationsState.length > 0 ? (
                            <ul>
                                {notificationsState.map((notification, index) => (
                                    <motion.li
                                        key={notification.id || index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: ANIMATION.notification }}
                                        className={`p-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                                            notification.read ? "bg-gray-50" : "bg-white"
                                        }`}
                                    >
                                        <div className="flex items-start">
                                            <div className="mt-1 mr-3">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h5 className={`text-sm font-medium ${
                                                        notification.read ? "text-gray-500" : "text-gray-800"
                                                    }`}>
                                                        {notification.title || 'Notification'}
                                                    </h5>
                                                    <span className="text-xs text-gray-400">
                                                        {notification.time || 'Just now'}
                                                    </span>
                                                </div>
                                                <p className={`text-sm mt-1 ${
                                                    notification.read ? "text-gray-400" : "text-gray-600"
                                                }`}>
                                                    {notification.message}
                                                </p>
                                                <div className="mt-3 flex justify-between items-center">
                                                    <button
                                                        className={`text-xs px-2 py-1 rounded transition-colors ${
                                                            notification.read
                                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                                        }`}
                                                        onClick={() => handleMarkAsRead(index)}
                                                        disabled={notification.read}
                                                    >
                                                        {notification.read ? 'Read' : 'Mark as Read'}
                                                    </button>
                                                    <button
                                                        className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                                                        onClick={() => handleDismiss(index)}
                                                        aria-label="Dismiss notification"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-6 text-center">
                                <FaCheckCircle className="mx-auto text-green-500 text-2xl mb-2" />
                                <p className="text-gray-500">No new notifications</p>
                                <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                            </div>
                        )}
                    </div>
                    {notificationsState.length > 0 && (
                        <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-between">
                            <button
                                onClick={() => {
                                    notificationsState.forEach((_, index) => handleMarkAsRead(index));
                                }}
                                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Mark all as read
                            </button>
                            <button
                                onClick={() => setNotificationsState([])}
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;