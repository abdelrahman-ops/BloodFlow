import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [donors, setDonors] = useState([]);
    const [bloodInventory, setBloodInventory] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [analytics, setAnalytics] = useState({
        totalDonors: 0,
        totalBloodUnits: 0,
        donationsThisMonth: 0,
    });

    // Simulate fetching data with placeholders
    const fetchAdminData = async () => {
        try {
            // Simulate delay for fetching data
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Placeholder random data
            const donorsPlaceholder = [
                { id: 1, name: "John Doe", bloodType: "O+", lastDonationDate: "2023-12-10" },
                { id: 2, name: "Jane Smith", bloodType: "A-", lastDonationDate: "2023-11-15" },
                { id: 3, name: "Emily Johnson", bloodType: "B+", lastDonationDate: "2023-12-01" },
            ];
            const inventoryPlaceholder = [
                { bloodType: "O+", units: 25 },
                { bloodType: "A-", units: 15 },
                { bloodType: "B+", units: 10 },
                { bloodType: "AB-", units: 5 },
            ];
            const requestsPlaceholder = [
                { id: 101, bloodType: "A-", quantity: 3, status: "Pending" },
                { id: 102, bloodType: "O+", quantity: 2, status: "Approved" },
                { id: 103, bloodType: "B+", quantity: 4, status: "Pending" },
            ];
            const analyticsPlaceholder = {
                totalDonors: 152,
                totalBloodUnits: 55,
                donationsThisMonth: 28,
            };

            setDonors(donorsPlaceholder);
            setBloodInventory(inventoryPlaceholder);
            setPendingRequests(requestsPlaceholder);
            setAnalytics(analyticsPlaceholder);
        } catch (error) {
            console.error("Error fetching admin data", error);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">Hospital Admin Dashboard</h1>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => alert("Logging out...")}
                >
                    Logout
                </button>
            </div>

            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Card 1: Total Donors */}
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-700">Total Donors</h2>
                    <p className="text-4xl text-blue-600">{analytics.totalDonors}</p>
                </div>

                {/* Card 2: Total Blood Units */}
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-700">Total Blood Units</h2>
                    <p className="text-4xl text-red-600">{analytics.totalBloodUnits}</p>
                </div>

                {/* Card 3: Donations This Month */}
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-700">Donations This Month</h2>
                    <p className="text-4xl text-green-600">{analytics.donationsThisMonth}</p>
                </div>
            </div>

            {/* Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Donor Management Table */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Manage Donors</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Name</th>
                                <th className="border-b p-2">Blood Type</th>
                                <th className="border-b p-2">Last Donation</th>
                                <th className="border-b p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map((donor) => (
                                <tr key={donor.id}>
                                    <td className="border-b p-2">{donor.name}</td>
                                    <td className="border-b p-2">{donor.bloodType}</td>
                                    <td className="border-b p-2">{new Date(donor.lastDonationDate).toLocaleDateString()}</td>
                                    <td className="border-b p-2">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => alert(`Viewing details for ${donor.name}`)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Blood Inventory Table */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Blood Inventory</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Blood Type</th>
                                <th className="border-b p-2">Available Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloodInventory.map((item) => (
                                <tr key={item.bloodType}>
                                    <td className="border-b p-2">{item.bloodType}</td>
                                    <td className="border-b p-2">{item.units}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Pending Requests</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-2">Request ID</th>
                            <th className="border-b p-2">Blood Type</th>
                            <th className="border-b p-2">Quantity</th>
                            <th className="border-b p-2">Status</th>
                            <th className="border-b p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="border-b p-2">{request.id}</td>
                                <td className="border-b p-2">{request.bloodType}</td>
                                <td className="border-b p-2">{request.quantity}</td>
                                <td className="border-b p-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${
                                            request.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {request.status}
                                    </span>
                                </td>
                                <td className="border-b p-2">
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => alert(`Approving request ${request.id}`)}
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
