/* eslint-disable react/no-unescaped-entities */
import assets from '../assets/assets.js';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { IoMdPulse, IoMdCar, IoMdMedical, IoMdFemale, IoMdWater } from 'react-icons/io';
import { GiHeartBeats } from 'react-icons/gi';

import 'swiper/css';
import 'swiper/css/pagination';

const Awareness = () => {
    const statistics = [
        {
            id: 1,
            image: assets.images.accident,
            title: "Road Traffic Accidents",
            description: "Every year, 1.3 million lives are lost to road accidents globally. Immediate blood transfusions are the difference between life and death in 40% of trauma cases.",
            icon: <IoMdCar className="stat-icon" />,
            color: "bg-gradient-to-br from-red-600 to-red-800",
            stat: "1.3M+ deaths annually",
            urgency: "URGENT NEED"
        },
        {
            id: 2,
            image: assets.images.surgery1,
            title: "Major Surgeries",
            description: "310 million major surgeries performed yearly require blood standby. Each open-heart surgery needs 1-5 units, while organ transplants require 10+ units.",
            icon: <IoMdMedical className="stat-icon" />,
            color: "bg-gradient-to-br from-blue-600 to-blue-800",
            stat: "310M+ procedures",
            urgency: "CRITICAL SUPPLY"
        },
        {
            id: 3,
            image: assets.images.child,
            title: "Childbirth Emergencies",
            description: "Every 2 minutes, a mother dies from pregnancy complications. Blood donations reduce maternal mortality by 45% in hemorrhage cases.",
            icon: <IoMdFemale className="stat-icon" />,
            color: "bg-gradient-to-br from-purple-600 to-purple-800",
            stat: "800+ daily deaths",
            urgency: "LIFE-SAVING IMPACT"
        },
    ];

    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-bl-[100px] rounded-tr-[100px] overflow-hidden mx-4 md:mx-8 lg:mx-16 mb-24 shadow-2xl">
            {/* Blood drop decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 opacity-5">
                <IoMdWater className="w-full h-full text-red-500" />
            </div>
            <div className="absolute bottom-20 right-20 w-32 h-32 opacity-5">
                <GiHeartBeats className="w-full h-full text-red-500" />
            </div>
            
            <div className="relative z-10 container mx-auto px-4">
                {/* Powerful header section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-4">
                            BLOOD SAVES LIVES
                        </div>
                    </motion.div>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6 rounded-full"></div>
                    <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
                        Your single donation can save up to <span className="text-red-400 font-bold">3 lives</span>. 
                        Here's where your blood makes the ultimate difference:
                    </p>
                </motion.div>

                {/* Enhanced Swiper Slider */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ 
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet bg-gray-400 opacity-50',
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-600 !opacity-100'
                    }}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    speed={1000}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    className="w-full rounded-3xl shadow-2xl hover:shadow-red-500/20 transition-shadow duration-300"
                >
                    {statistics.map((stat) => (
                        <SwiperSlide key={stat.id}>
                            <div className="relative flex flex-col lg:flex-row items-stretch w-full min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-3xl bg-gray-800 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
                                {/* Content Panel (Left Side) */}
                                <motion.div
                                    className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative z-10"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className={`absolute top-8 right-8 px-3 py-1 text-xs font-bold tracking-wider rounded-full ${stat.color} text-white`}>
                                        {stat.urgency}
                                    </div>
                                    
                                    <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full ${stat.color} text-white shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                    
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                        {stat.title}
                                    </h1>
                                    
                                    <div className="text-lg text-gray-300 leading-relaxed mb-8">
                                        {stat.description}
                                    </div>
                                    
                                    <div className="mt-auto">
                                        <div className="text-2xl font-bold text-red-400 mb-2">
                                            {stat.stat}
                                        </div>
                                        <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] font-medium">
                                            See Real Stories
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Image Panel (Right Side) */}
                                <motion.div
                                    className="w-full lg:w-3/5 h-[300px] lg:h-auto relative bg-gray-900"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10 lg:hidden"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10 hidden lg:block"></div>
                                    
                                    <img
                                        src={stat.image}
                                        alt={stat.title}
                                        className="absolute inset-0 w-full h-full object-cover object-center"
                                    />
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 lg:p-12">
                                        <div className="text-sm font-semibold tracking-wider text-red-300 mb-1">
                                            YOUR BLOOD CAN SAVE THEM
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold leading-tight">
                                            Every donation creates a <span className="text-red-300">ripple of hope</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Impact Statistics */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
                >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10 group">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-3 group-hover:from-red-400 group-hover:to-red-200 transition-all">
                            1:3
                        </div>
                        <div className="text-gray-400 mb-2">Ratio</div>
                        <div className="text-xl text-white font-medium">
                            One donation can save up to 3 lives
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10 group">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-3 group-hover:from-red-400 group-hover:to-red-200 transition-all">
                            38%
                        </div>
                        <div className="text-gray-400 mb-2">Of Population</div>
                        <div className="text-xl text-white font-medium">
                            Eligible to donate, but less than 10% do
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/10 group">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-3 group-hover:from-red-400 group-hover:to-red-200 transition-all">
                            24/7
                        </div>
                        <div className="text-gray-400 mb-2">Demand</div>
                        <div className="text-xl text-white font-medium">
                            Blood is needed every 2 seconds worldwide
                        </div>
                    </div>
                </motion.div>

                {/* Powerful CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                        <IoMdPulse className="mr-3 text-2xl animate-pulse group-hover:animate-none" />
                        <span className="font-bold text-xl tracking-wide">
                            REGISTER AS A LIFESAVER NOW
                        </span>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-full transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <p className="text-gray-400 mt-6 text-lg">
                        Join our community of <span className="text-red-300 font-medium">50,000+</span> regular donors
                    </p>
                </motion.div>
            </div>

            <style>{`
                .stat-icon {
                    width: 1.8rem;
                    height: 1.8rem;
                }
                .swiper-pagination {
                    bottom: 30px !important;
                }
                .swiper-pagination-bullet {
                    width: 14px;
                    height: 14px;
                    margin: 0 10px !important;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    transform: scale(1.3);
                    box-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
                }
            `}</style>
        </section>
    );
};

export default Awareness;