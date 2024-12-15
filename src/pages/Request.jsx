/* eslint-disable no-unused-vars */
import { useState } from 'react';

const BloodRequests = () => {
    const [requests, setRequests] = useState([
        { bloodType: 'A+', quantity: 2, urgency: 'High', location: 'Cairo' },
        { bloodType: 'O-', quantity: 1, urgency: 'Medium', location: 'Alexandria' },
    ]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add validation and submission logic here
        alert('Your request has been submitted!');
    };

    return (
        <div className="font-sans">
        {/* Header Section */}
        <section className="bg-red-600 text-white py-16 text-center">
            <h1 className="text-4xl font-bold">Blood Requests</h1>
            <p className="mt-4">Submit or browse blood donation requests.</p>
        </section>

        {/* Request Form */}
        <section className="py-16 ">
            <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-600">Submit a Blood Request</h2>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-2xl mx-auto space-y-4">
                <div>
                <label className="block text-gray-700">Blood Type:</label>
                <select className="w-full p-2 border rounded">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
                </div>
                <div>
                <label className="block text-gray-700">Quantity (Units):</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="e.g., 2" />
                </div>
                <div>
                <label className="block text-gray-700">Urgency:</label>
                <select className="w-full p-2 border rounded">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </div>
                <div>
                <label className="block text-gray-700">Location:</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="e.g., Cairo" />
                </div>
                <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                Submit Request
                </button>
            </form>
            </div>
        </section>

        {/* Active Requests */}
        <section className="py-16 bg-white">
            <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-600">Active Blood Requests</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request, index) => (
                <div key={index} className="p-4 shadow rounded">
                    <p>
                    <strong>Blood Type:</strong> {request.bloodType}
                    </p>
                    <p>
                    <strong>Quantity:</strong> {request.quantity} Units
                    </p>
                    <p>
                    <strong>Urgency:</strong> {request.urgency}
                    </p>
                    <p>
                    <strong>Location:</strong> {request.location}
                    </p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-16 bg-gray-800 text-white text-center">
            <h2 className="text-3xl font-bold">Emergency Contact</h2>
            <p className="mt-4">For immediate assistance, call our hotline: <strong>123-456-7890</strong></p>
        </section>
        </div>
    );
};

export default BloodRequests;
