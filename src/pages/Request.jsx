/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

const BloodRequests = () => {
  const [requests, setRequests] = useState([
    { bloodType: 'A+', quantity: 2, urgency: 'High', location: 'Cairo', hospital: 'Mansoura Hospital' },
    { bloodType: 'O-', quantity: 1, urgency: 'Medium', location: 'Alexandria', hospital: 'Alex Hospital' },
  ]);

  const [formData, setFormData] = useState({
    bloodType: '',
    quantity: '',
    urgency: '',
    location: '',
    hospital: '',
    consentFile: null,
  });

  const [showDonors, setShowDonors] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  const compatibleDonors = [
    { name: 'John Doe', bloodType: 'A+', location: 'Cairo', contact: '123-456-7890' },
    { name: 'Jane Smith', bloodType: 'A+', location: 'Giza', contact: '987-654-3210' },
    { name: 'Ahmed Ali', bloodType: 'A+', location: 'Tanta', contact: '555-555-5555' },
  ];

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.bloodType || !formData.quantity || !formData.urgency || !formData.location || !formData.hospital || !formData.consentFile) {
      alert('Please fill in all fields and attach the required document.');
      return;
    }
    const newRequest = {
      bloodType: formData.bloodType,
      quantity: parseInt(formData.quantity),
      urgency: formData.urgency,
      location: formData.location,
      hospital: formData.hospital,
    };
    setRequests([...requests, newRequest]);
    setFormData({ bloodType: '', quantity: '', urgency: '', location: '', hospital: '', consentFile: null });
    alert('Your request has been submitted!');
    setShowDonors(true);
  };

  const handleShowSubscription = () => {
    setShowSubscriptionPopup(true);
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 text-center shadow-md">
        <h1 className="text-5xl font-extrabold">Blood Requests</h1>
        <p className="mt-4 text-lg">Submit or browse blood donation requests with ease and efficiency.</p>
      </section>

      {/* Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center text-red-600">Submit a Blood Request</h2>
          <p className="text-center text-gray-600 mt-2">Fill out the form below to submit your request for blood donation.</p>

          <form onSubmit={handleFormSubmit} className="mt-10 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium">Blood Type:</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleFormChange}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
                >
                  <option value="">Select Blood Type</option>
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
                <label className="block text-gray-700 font-medium">Quantity (Units):</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
                  placeholder="e.g., 2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Urgency:</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleFormChange}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
                >
                  <option value="">Select Urgency</option>
                  <option value="Low">Low - Needed within 1 week</option>
                  <option value="Medium">Medium - Needed within 3 days</option>
                  <option value="High">High - Needed immediately</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
                  placeholder="e.g., Cairo"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Hospital (if applicable):</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleFormChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
                placeholder="e.g., Mansoura Hospital"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Attach Consent/Doctor's Request:</label>
              <input
                type="file"
                name="consentFile"
                onChange={handleFormChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:shadow-lg"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* Compatible Donors */}
      {showDonors && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center text-red-600">Compatible Donors</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {compatibleDonors.map((donor, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <p className="text-gray-700 font-medium">
                    <strong>Name:</strong> {donor.name}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <strong>Blood Type:</strong> {donor.bloodType}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <strong>Location:</strong> {donor.location}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <strong>Contact:</strong> {donor.contact}
                  </p>
                </div>
              ))}
            </div>
            <button
              className="mt-10 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:shadow-lg"
              onClick={handleShowSubscription}
            >
              Find More Donors with Filters
            </button>
          </div>
        </section>
      )}

      {/* Subscription Button Component */}
      {showSubscriptionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-center mb-4">Subscription Plans</h3>
            <p className="text-gray-600 text-center mb-4">Advanced donor search options available with subscription plans.</p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:shadow-lg"
                onClick={() => setShowSubscriptionPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Component Placeholder */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Search Blood Requests</h2>
          <p className="mt-2 text-gray-600">Quickly find blood requests that match your criteria.</p>
          <div className="mt-6 max-w-md mx-auto">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
              placeholder="Search by blood type, location, or hospital"
            />
            <button className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:shadow-lg">Search</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodRequests;
