/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

const Notification = ({ notifications, onMarkAsRead, onDismiss }) => {
    const [notificationsState, setNotificationsState] = useState(notifications);

    const handleMarkAsRead = (index) => {
        const updatedNotifications = [...notificationsState];
        updatedNotifications[index].read = true;
        setNotificationsState(updatedNotifications);
        onMarkAsRead(index);
    };

    return (
        <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg w-80 z-50">
            <div className="p-4 border-b border-gray-200">
                <h4 className="text-lg font-bold text-red-600">Notifications</h4>
            </div>
            <ul className="max-h-72 overflow-y-auto">
                {notificationsState.length > 0 ? (
                    notificationsState.map((notification, index) => (
                        <li
                            key={index}
                            className={`p-4 border-b border-gray-200 ${
                                notification.read ? "bg-gray-100" : "bg-white"
                            }`}
                        >
                            <p
                                className={`text-sm ${
                                    notification.read
                                        ? "text-gray-500 line-through"
                                        : "text-gray-700"
                                }`}
                            >
                                {notification.message}
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                                <button
                                    className={`text-sm px-3 py-1 rounded ${
                                        notification.read
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                                    onClick={() => handleMarkAsRead(index)}
                                    disabled={notification.read}
                                >
                                    Mark as Read
                                </button>
                                <button
                                    className="text-gray-500 hover:text-red-600"
                                    onClick={onDismiss}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="p-4 text-center text-gray-500">
                        No new notifications.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Notification;
