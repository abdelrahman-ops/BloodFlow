import assets from '../assets/assets.js';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const Awarness = () => {
    const statistics = [
        {
            id: 1,
            image: assets.images.accident,
            title: "Road Traffic Accidents",
            description:
                "Every year, road traffic accidents account for over 1.3 million deaths worldwide. In critical cases, blood transfusions are essential to save lives during emergency surgeries.",
        },
        {
            id: 2,
            image: assets.images.surgery1,
            title: "Major Surgeries",
            description:
                "More than 310 million major surgeries are performed annually, and a significant percentage of these procedures require blood transfusions.",
        },
        {
            id: 3,
            image: assets.images.child,
            title: "Childbirth Complications",
            description:
                "Severe bleeding during childbirth is one of the leading causes of maternal mortality globally. Blood donations ensure safer deliveries and save mothers' lives.",
        },
    ];

    return (
        <section className="relative pt-12 bg-[#0D1321] rounded-bl-[90px] mb-36 overflow-hidden">
            <div className="max-w-2xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-[#9D0208] mb-6 sm:text-4xl">
                    Why Donate Blood?
                </h2>
                <p className="text-[#F0EBD8] text-base sm:text-lg mb-8">
                    Blood donation saves lives in emergencies, surgeries, and childbirth complications. 
                    Here are real cases where your donation can make a difference:
                </p>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="w-full"
            >
                {statistics.map((stat) => (
                    <SwiperSlide key={stat.id}>
                        <div className="relative flex flex-col md:flex-row items-center w-full h-[400px] overflow-hidden">
                            {/* Left Content */}
                            <motion.div
                                className="w-full md:w-1/2 px-6 md:px-12 text-center md:text-left z-10"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-2xl md:text-4xl font-bold text-[#9D0208] mb-4">
                                    {stat.title}
                                </h1>
                                <p className="text-sm md:text-base text-[#F0EBD8] leading-relaxed">
                                    {stat.description}
                                </p>
                            </motion.div>

                            {/* Right Content - Image at Borders */}
                            <motion.div
                                className="absolute top-36 sm:top-0 md:top-0 lg:top-0 right-0  md:w-1/2 h-full w-full flex justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src={stat.image}
                                    alt={stat.title}
                                    className="w-full h-full object-cover md:rounded-tl-[90px]"
                                />
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Awarness;
