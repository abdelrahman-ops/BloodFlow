import React from 'react';

const ContactUs = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out. We will get back to you soon!');
  };

  return (
    <div className="font-sans">
      <section className="bg-red-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4">We are here to help you with any queries or concerns.</p>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-600">Get in Touch</h2>
          <form onSubmit={handleFormSubmit} className="mt-8 max-w-2xl mx-auto space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="Your Email" />
            </div>
            <div>
              <label className="block text-gray-700">Message:</label>
              <textarea className="w-full p-2 border rounded" rows="4" placeholder="Your Message"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
