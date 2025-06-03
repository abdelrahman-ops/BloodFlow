import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out. We will get back to you soon!');
  };

  const contactMethods = [
    {
      icon: <FaPhoneAlt className="text-3xl text-red-600" />,
      title: "Call Us",
      details: "+1 (800) DONATE-NOW",
      description: "Available 24/7 for emergencies"
    },
    {
      icon: <FaEnvelope className="text-3xl text-red-600" />,
      title: "Email Us",
      details: "help@bloodflow.org",
      description: "Typically respond within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-red-600" />,
      title: "Visit Us",
      details: "123 LifeSaver Street, BloodCity",
      description: "By appointment only"
    },
    {
      icon: <FaClock className="text-3xl text-red-600" />,
      title: "Hours",
      details: "Mon-Fri: 9AM-5PM",
      description: "Emergency support always available"
    }
  ];

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
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Have questions about donating blood or need assistance? Reach out to our team anytime.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-lg font-medium text-red-600 mb-2">{method.details}</p>
                <p className="text-gray-600">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
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
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="What's your question about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="5"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Find Our Headquarters
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-96">
            {/* Replace with your actual map embed */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Map would be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;