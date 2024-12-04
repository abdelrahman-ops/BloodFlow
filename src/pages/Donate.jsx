

const DonateBlood = () => {
    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        // Add validation and submission logic here
        alert('You are successfully registered as a donor!');
    };

    return (
        <div className="font-sans">
        {/* Header Section */}
        <section className="bg-red-600 text-white py-16 text-center">
            <h1 className="text-4xl font-bold">Donate Blood</h1>
            <p className="mt-4">Become a donor and help save lives!</p>
        </section>

        {/* Eligibility Checklist */}
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-600">Eligibility Checklist</h2>
            <ul className="mt-8 max-w-3xl mx-auto text-left list-disc space-y-2">
                <li>Donors must be between 18-65 years old.</li>
                <li>Minimum weight of 50 kg (110 lbs).</li>
                <li>Must not have donated blood in the last 12 weeks.</li>
                <li>No major illnesses or infections in the past 6 months.</li>
                <li>Good overall health and hydration.</li>
            </ul>
            </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 bg-white">
            <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-600">Register as a Donor</h2>
            <form onSubmit={handleRegistrationSubmit} className="mt-8 max-w-2xl mx-auto space-y-4">
                <div>
                <label className="block text-gray-700">Name:</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Your Name" />
                </div>
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
                <label className="block text-gray-700">Availability:</label>
                <input type="date" className="w-full p-2 border rounded" />
                </div>
                <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                Register
                </button>
            </form>
            </div>
        </section>

        {/* Donation Drives */}
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-600">Upcoming Donation Drives</h2>
            <p className="mt-4 text-gray-700">Stay tuned for upcoming events near you!</p>
            </div>
        </section>
        </div>
    );
};

export default DonateBlood;
