import { motion } from 'framer-motion';
// import { AiOutlineEye } from 'react-icons/ai';
import { IoResizeSharp } from "react-icons/io5";
import { useLanguage } from "../hooks/LanguageContext";
import assets from '../assets/assets.js'
// import { title } from 'framer-motion/client';

function Features() {

    const { language } = useLanguage();

    const labels = {
        en: {
            title: "Why Choose BloodFlow ?",

            cards : [
                {
                    title: 'Real-Time Blood Inventory',
                    description: 'Track available blood types and ensure timely distribution during emergencies.',
                    imgSrc: assets.images.inventory,
                    altText: 'Real-Time Blood Inventory',
                },
                {
                    title: 'Integrated with Hospitals',
                    description: 'Seamlessly connect with healthcare centers for efficient blood requests and delivery.',
                    imgSrc: assets.images.doctors,
                    altText: 'Integrated with Hospitals',
                },
                {
                    title: 'Engage Donors Easily',
                    description: 'Use advanced technology to remind and engage donors through mobile apps and notifications.',
                    imgSrc: assets.images.donor,
                    altText: 'Engage Donors Easily',
                },
                {
                    title: 'Community Support',
                    description: 'Join a network of donors and recipients to build a supportive community.',
                    imgSrc: assets.images.support,
                    altText: 'Community Support',
                },
            ]
        } , 

        ar: {
            title : "؟ BloodFlow لماذا تختار",

            cards: [
                {
                    title: "متابعة مخزون الدم في الوقت الحقيقي",
                    description: "تتبع فصائل الدم المتوفرة وضمان التوزيع السريع أثناء الطوارئ.",
                    imgSrc: assets.images.inventory,
                    altText: "متابعة مخزون الدم",
                },
                {
                    title: "التكامل مع المستشفيات",
                    description:
                        "التواصل السلس مع المراكز الصحية لتلبية طلبات الدم وتسليمها بكفاءة.",
                    imgSrc: assets.images.doctors,
                    altText: "التكامل مع المستشفيات",
                },
                {
                    title: "تفاعل سهل مع المتبرعين",
                    description:
                        "استخدام التكنولوجيا الحديثة لتذكير المتبرعين والتفاعل معهم عبر التطبيقات.",
                    imgSrc: assets.images.donor,
                    altText: "تفاعل سهل مع المتبرعين",
                },
                {
                    title: "دعم المجتمع",
                    description: "انضم إلى شبكة من المتبرعين والمستفيدين لبناء مجتمع داعم.",
                    imgSrc: assets.images.support,
                    altText: "دعم المجتمع",
                },
            ],
        }
    }

    const { title, cards } = labels[language];
    
    return (
        <div className={`min-h-screen ${language === "ar" ? "text-right" : "text-left"}`}>
            <section id="features" className="py-6 px-4 sm:px-8 bg-gray-100">
                <h3 className="text-3xl font-bold text-center mb-12">
                    {title}
                </h3>
                <div
                    className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 ${
                        language === "ar" ? "direction-rtl" : ""
                    }`}
                >
                    {/* Card Components */}
                    {
                        cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white shadow-md p-4 sm:p-6 
                                rounded-tl-2xl rounded-tr-[90px] rounded-b-[100px] mx-auto
                                flex flex-col justify-between items-center 
                                overflow-hidden transition-transform 
                                hover:scale-105 duration-300  relative"
                                // style={{ width: '250px', height: '400px' }}
                            >
                                <div className="text-center block max-w-40 justify-center">
                                    <h4 className="text-lg sm:text-xl font-bold  text-gray-800  max-h-20">
                                        {card.title}
                                    </h4>
                                    <p className="relative text-sm sm:text-base mt-2 text-gray-600">
                                        {card.description}
                                    </p>
                                </div>
                                

                                {/* Image container with the icon */}
                                <div className="relative w-full flex justify-center items-center mt-4">
                                    <img
                                        src={card.imgSrc}
                                        alt={card.altText}
                                        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full hover:scale-110"
                                    />
                                    <div className="absolute top-1 right-1 flex items-center justify-center w-8 h-8 bg-red-800 text-white rounded-full shadow-lg hover:bg-red-600 transition duration-300">
                                        <IoResizeSharp className="w-4 h-4" />
                                        {/* <AiOutlineEye className="w-4 h-4" /> */}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
}

export default Features;
