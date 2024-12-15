

const EventsAndCampaigns = () => {
  const events = [
    { name: 'Blood Drive Cairo', date: '2024-12-10', location: 'Cairo Hospital' },
    { name: 'Awareness Campaign', date: '2024-12-15', location: 'Alexandria Mall' },
  ];

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for signing up as a volunteer!');
  };

  return (
    <div className="font-sans">
      {/* Header Section */}
      <section className="bg-red-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Events and Campaigns</h1>
        <p className="mt-4">Join our efforts to save lives through blood donation drives and awareness campaigns.</p>
      </section>

      {/* Event Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-600">Upcoming Events</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div key={index} className="p-4 shadow rounded">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Sign-Up */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-600">Sign Up as a Volunteer</h2>
          <form onSubmit={handleVolunteerSubmit} className="mt-8 max-w-2xl mx-auto space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="Your Email" />
            </div>
            <div>
              <label className="block text-gray-700">Preferred Location:</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="City or Venue" />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EventsAndCampaigns;
