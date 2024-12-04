// import React from 'react';

const AboutUs = () => {
    return (
        <div className="font-sans">
        {/* Header Section */}
        <section className="bg-red-600 text-white py-16 text-center">
            <div className="container mx-auto">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-4 text-lg">
                Learn more about our mission, vision, and the impact we aim to create.
            </p>
            </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-gray-100 text-center">
            <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-red-600">Our Mission</h2>
            <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
                Our goal is to connect blood donors and recipients, ensuring no one suffers due to a lack of blood availability. Together, we strive to save lives one drop at a time.
            </p>
            </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
            <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-600">Our Story</h2>
            <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
                It all started with a vision to simplify the process of blood donation and to bridge the gap between donors and those in need. Through technology and community support, we’ve built a platform that empowers people to save lives effortlessly.
            </p>
            </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-600">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                <div className="p-4 bg-white shadow-md rounded">
                <p className="text-gray-700">
                    “Thanks to this platform, I found a donor in just hours, saving my mother&apos;s life!”
                </p>
                <footer className="mt-4 text-red-600">- A Grateful Recipient</footer>
                </div>
                <div className="p-4 bg-white shadow-md rounded">
                <p className="text-gray-700">
                    “I never realized how easy it could be to donate blood until I joined here. It feels amazing to help.”
                </p>
                <footer className="mt-4 text-red-600">- A Dedicated Donor</footer>
                </div>
                <div className="p-4 bg-white shadow-md rounded">
                <p className="text-gray-700">
                    “This platform played a critical role during a local disaster by organizing donation drives efficiently.”
                </p>
                <footer className="mt-4 text-red-600">- A Community Leader</footer>
                </div>
            </div>
            </div>
        </section>

        {/* Team/Partners */}
        <section className="py-16 bg-white">
            <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-600">Our Team & Partners</h2>
            <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
                We work closely with hospitals, community organizations, and passionate individuals who believe in our cause.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                {/* Placeholder for logos or images */}
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
            <p>&copy; 2024 Blood Bank. All Rights Reserved.</p>
            <div className="mt-4 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                Contact Us
                </a>
            </div>
            </div>
        </footer>
        </div>
    );
};

export default AboutUs;
