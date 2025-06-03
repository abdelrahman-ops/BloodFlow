import { FaHeartbeat, FaUsers, FaHandsHelping, FaHospital, FaAward } from 'react-icons/fa';
import { GiHealthPotion,  } from 'react-icons/gi';
import { IoMdTime } from 'react-icons/io';
import { motion } from 'framer-motion';
import { BsDropletFill } from 'react-icons/bs';

const AboutUs = () => {
    const stats = [
        { value: "10,000+", label: "Lives Saved", icon: <FaHeartbeat className="text-3xl" /> },
        { value: "50,000+", label: "Active Donors", icon: <FaUsers className="text-3xl" /> },
        { value: "200+", label: "Partner Hospitals", icon: <FaHospital className="text-3xl" /> },
        { value: "24/7", label: "Support", icon: <IoMdTime className="text-3xl" /> }
    ];

    const teamMembers = [
        { name: "Dr. Sarah Johnson", role: "Medical Director", bio: "Hematologist with 15+ years experience", img: "/team1.jpg" },
        { name: "Michael Chen", role: "Tech Lead", bio: "Built the platform to connect donors in real-time", img: "/team2.jpg" },
        { name: "Aisha Mohammed", role: "Community Outreach", bio: "Organizes blood drives across the region", img: "/team3.jpg" },
        { name: "David Wilson", role: "Donor Relations", bio: "Ensures positive donor experiences", img: "/team4.jpg" }
    ];

    const partners = [
        { name: "Red Cross", logo: "/red-cross-logo.png" },
        { name: "National Health", logo: "/national-health-logo.png" },
        { name: "City Medical", logo: "/city-medical-logo.png" },
        { name: "LifeBlood", logo: "/lifeblood-logo.png" }
    ];

    return (
        <div className="font-sans bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-red-700 to-red-600 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/blood-cells-pattern.png')] bg-repeat"></div>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 text-center relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Our <span className="text-yellow-300">Life-Saving</span> Mission
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Connecting heroes with those in need through innovative technology and compassionate community
                    </p>
                    <div className="mt-12 flex justify-center">
                        <BsDropletFill className="text-6xl animate-pulse" />
                    </div>
                </motion.div>
            </section>

            {/* Impact Stats */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-red-50 p-8 rounded-xl text-center"
                            >
                                <div className="text-red-600 mb-4 flex justify-center">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            <span className="border-b-4 border-red-600 pb-2">Our Story</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            BloodFlow was born from a personal tragedy when our founder lost a loved one due to blood shortage. This painful experience ignited a passion to create a solution that would prevent others from suffering the same loss.
                        </p>
                        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src="/team-meeting.jpg" 
                                alt="BloodFlow team working together" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                                <p className="text-white text-sm">
                                    The BloodFlow team at our annual life-saving summit
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-md"
                        >
                            <div className="flex items-center mb-4">
                                <GiHealthPotion className="text-red-600 text-3xl mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                To eliminate preventable deaths caused by blood shortages through an innovative platform that connects donors with recipients in real-time.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>Make blood donation simple and rewarding</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>Reduce response time during emergencies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>Build a community of regular, committed donors</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-md"
                        >
                            <div className="flex items-center mb-4">
                                <FaHandsHelping className="text-red-600 text-3xl mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                We envision a world where no life is lost due to lack of blood availability, where communities come together to support each other in times of need.
                            </p>
                            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                                <p className="text-gray-700 italic">
                                    "Every drop counts. Your donation could be the difference between life and death for someone in your community."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 bg-gradient-to-br from-red-700 to-red-800 text-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Lives We've Touched
                        </h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            Real stories from people whose lives were changed because someone chose to donate
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "My daughter needed emergency surgery and BloodFlow found 3 matching donors within hours. Those strangers became our angels.",
                                author: "Maria G., Mother",
                                img: "/testimonial1.jpg"
                            },
                            {
                                quote: "As a regular donor, I love how easy BloodFlow makes it to schedule donations and see my impact.",
                                author: "James T., 12-time Donor",
                                img: "/testimonial2.jpg"
                            },
                            {
                                quote: "During the earthquake crisis, BloodFlow coordinated over 500 donations in our area. Their system saved countless lives.",
                                author: "Dr. Patel, ER Chief",
                                img: "/testimonial3.jpg"
                            }
                        ].map((story, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white text-gray-800 rounded-xl overflow-hidden shadow-xl"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={story.img} 
                                        alt={story.author} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-lg italic mb-4">"{story.quote}"</p>
                                    <p className="font-bold text-red-600">— {story.author}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Meet Our <span className="text-red-600">Heroes</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            The passionate team working tirelessly behind the scenes to make every donation count
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img 
                                        src={member.img} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-red-600 mb-2">{member.role}</p>
                                    <p className="text-gray-600">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Trusted <span className="text-red-600">Partners</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We collaborate with leading healthcare organizations to maximize our impact
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
                    >
                        {partners.map((partner, index) => (
                            <div 
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
                            >
                                <img 
                                    src={partner.logo} 
                                    alt={partner.name} 
                                    className="h-16 object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Save Lives?
                        </h2>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Join our community of heroes today. Your donation could be the gift of life.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
                                Become a Donor
                            </button>
                            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-600 transition">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <BsDropletFill  className="text-red-500 text-3xl mr-2" />
                                <span className="text-2xl font-bold">BloodFlow</span>
                            </div>
                            <p className="text-gray-400">
                                Connecting donors with those in need to save lives, one drop at a time.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Home</a></li>
                                <li><a href="#" className="hover:text-white transition">Donate</a></li>
                                <li><a href="#" className="hover:text-white transition">Find Donors</a></li>
                                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>help@bloodflow.org</li>
                                <li>1-800-DONATE-NOW</li>
                                <li>123 LifeSaver St, BloodCity</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} BloodFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;