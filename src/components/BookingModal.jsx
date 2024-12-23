import React, { useState } from "react";

const BookingModal = ({ onClose, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHospital, setSelectedHospital] = useState("");
    const [timeSlot, setTimeSlot] = useState("");

    const hospitals = [
        "Mansoura Emergency Hospital",
        "National Blood Bank",
        "Red Crescent Center",
        "City Hospital",
    ];

    const handleConfirm = () => {
        if (!selectedDate || !selectedHospital || !timeSlot) {
            alert("Please fill in all the fields!");
            return;
        }
        onConfirm({ date: selectedDate, hospital: selectedHospital, time: timeSlot });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md sm:w-full md:w-full lg:w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Book Your Donation Slot</h2>
                
                {/* Date Picker */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Select Date:</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                {/* Hospital Dropdown */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Select Hospital:</label>
                    <select
                        className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                    >
                        <option value="" disabled>Select a hospital</option>
                        {hospitals.map((hospital, index) => (
                            <option key={index} value={hospital}>{hospital}</option>
                        ))}
                    </select>
                </div>

                {/* Time Slot Picker */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Select Time Slot:</label>
                    <input
                        type="time"
                        className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
