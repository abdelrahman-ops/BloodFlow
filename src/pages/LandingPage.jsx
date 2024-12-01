import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai'; // Importing the open icon from React Icons
import inventory from '../assets/inventory.jpg';
import support from '../assets/support.jpg';
import doctors from '../assets/doctors.jpg';
import donor from '../assets/donor.jpg';

function LandingPage() {
    return (
        <div className="min-h-screen">
            <section id="features" className="py-16 px-4 sm:px-8 bg-gray-100">
                <h3 className="text-3xl font-bold text-center mb-12">
                    Why Choose BloodFlow?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {/* Card Components */}
                    {[
                        {
                            title: 'Real-Time Blood Inventory',
                            description: 'Track available blood types and ensure timely distribution during emergencies.',
                            imgSrc: inventory,
                            altText: 'Real-Time Blood Inventory',
                        },
                        {
                            title: 'Integrated with Hospitals',
                            description: 'Seamlessly connect with healthcare centers for efficient blood requests and delivery.',
                            imgSrc: doctors,
                            altText: 'Integrated with Hospitals',
                        },
                        {
                            title: 'Engage Donors Easily',
                            description: 'Use advanced technology to remind and engage donors through mobile apps and notifications.',
                            imgSrc: donor,
                            altText: 'Engage Donors Easily',
                        },
                        {
                            title: 'Community Support',
                            description: 'Join a network of donors and recipients to build a supportive community.',
                            imgSrc: support,
                            altText: 'Community Support',
                        },
                    ].map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white shadow-md p-4 sm:p-6 rounded-b-full rounded-tl-[1500px] 
                            rounded-tr-full flex flex-col justify-between items-center overflow-hidden transition-transform 
                            hover:scale-105 duration-300 w-full sm:w-[95%] md:w-[85%] lg:w-full mx-auto relative hover:bg-red-500 hover:bg-opacity-30"
                        >
                            <h4 className="text-lg sm:text-xl font-bold mb-4 text-center">
                                {card.title}
                            </h4>
                            <p className="mb-6 text-sm sm:text-base text-center">
                                {card.description}
                            </p>

                            {/* Image container with the icon */}
                            <div className="relative w-full flex justify-center items-center">
                                <img
                                    src={card.imgSrc}
                                    alt={card.altText}
                                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full hover:scale-110"
                                />
                                <div className="absolute top-1 right-1 flex items-center justify-center w-8 h-8 bg-red-800 text-white rounded-full shadow-lg hover:bg-red-600 transition duration-300">
                                    <AiOutlineEye className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
