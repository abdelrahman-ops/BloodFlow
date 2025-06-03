import { FaCalendarAlt, FaMapMarkerAlt, FaUserPlus, FaClock, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EventsAndCampaigns = () => {
  const events = [
    { 
      id: 1,
      name: 'Annual Blood Drive', 
      date: '2024-12-10', 
      time: '9:00 AM - 5:00 PM',
      location: 'Cairo Central Hospital', 
      description: 'Join us for our biggest blood drive of the year with special rewards for donors',
      image: '/blood-drive-event.jpg'
    },
    { 
      id: 2,
      name: 'Blood Donation Awareness Week', 
      date: '2024-12-15', 
      time: '10:00 AM - 8:00 PM',
      location: 'Alexandria City Mall', 
      description: 'Educational campaign about the importance of regular blood donation',
      image: '/awareness-event.jpg'
    },
    { 
      id: 3,
      name: 'Emergency Blood Drive', 
      date: '2024-12-20', 
      time: '8:00 AM - 6:00 PM',
      location: 'Giza Community Center', 
      description: 'Urgent call for donors to address critical shortages',
      image: '/emergency-drive.jpg'
    },
    { 
      id: 4,
      name: 'Youth Donation Challenge', 
      date: '2025-01-05', 
      time: '11:00 AM - 7:00 PM',
      location: 'Heliopolis University', 
      description: 'Special event encouraging young donors with campus competitions',
      image: '/youth-event.jpg'
    }
  ];

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for signing up as a volunteer! We will contact you soon.');
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-600 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/blood-cells-pattern.png')] bg-repeat opacity-20"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Join Our Life-Saving Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Participate in blood drives and awareness campaigns across the region
          </motion.p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming <span className="text-red-600">Events</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find blood donation drives and awareness campaigns near you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Upcoming
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaCalendarAlt className="mr-2 text-red-600" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaClock className="mr-2 text-red-600" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-red-600" />
                    <span>{event.location}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
                      View Details
                    </button>
                    <button className="text-red-600 font-medium hover:text-red-700 transition">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-xl shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <FaUserPlus className="text-3xl text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Become a Volunteer
              </h2>
              <p className="text-gray-600">
                Help us organize events and save more lives
              </p>
            </div>
            
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+20 123 456 7890"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">City</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your City"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Availability</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Why do you want to volunteer with us?</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="Tell us about your motivation..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="agree-terms"
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-600">
                  I agree to the terms and conditions
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <FaHeart /> Join as Volunteer
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Whether donating blood or volunteering your time, your contribution saves lives.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
                Find an Event Near You
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-600 transition">
                Learn About Donating
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsAndCampaigns;