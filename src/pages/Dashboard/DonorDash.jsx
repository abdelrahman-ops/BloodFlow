import  { useState } from 'react';

const DonorDash = () => {
  const [donations] = useState([
    { date: '2024-11-01', bloodType: 'O+', location: 'Cairo Hospital' },
    { date: '2024-09-15', bloodType: 'A-', location: 'Alexandria Clinic' },
  ]);

  return (
    <div className="font-sans">
      <section className="bg-red-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
        <p className="mt-4">Manage your donations and blood requests.</p>
      </section>

      {/* Donation History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-600">Donation History</h2>
          <ul className="mt-8 space-y-4 max-w-2xl mx-auto">
            {donations.map((donation, index) => (
              <li
                key={index}
                className="p-4 shadow rounded flex justify-between items-center"
              >
                <span>{donation.date}</span>
                <span>{donation.bloodType}</span>
                <span>{donation.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DonorDash;
