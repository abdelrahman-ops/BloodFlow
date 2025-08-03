import { motion } from 'framer-motion';
import { IoResizeSharp, IoWaterOutline, IoPulse, IoPeople, IoHeartOutline } from "react-icons/io5";
import assets from '../../assets/assets.js';
import { useLanguageStore } from "../../stores/languageStore.ts";

function Features() {
    const { language } = useLanguageStore();

    const labels = {
        en: {
            title: "Why Choose BloodFlow?",
            subtitle: "Saving Lives Through Innovation",
            cards: [
                {
                    title: 'Real-Time Blood Tracking',
                    description: 'Our live inventory system shows available blood types and quantities across all partner hospitals in real-time.',
                    imgSrc: assets.images.unit,
                    altText: 'Real-Time Blood Inventory',
                    icon: <IoWaterOutline className="feature-icon" />,
                    color: "bg-red-100"
                },
                {
                    title: 'Hospital Network',
                    description: 'Direct integration with 200+ healthcare centers for instant blood requests and rapid delivery.',
                    imgSrc: assets.images.donor,
                    altText: 'Integrated with Hospitals',
                    icon: <IoPulse className="feature-icon" />,
                    color: "bg-blue-100"
                },
                {
                    title: 'Donor Engagement',
                    description: 'Smart notifications and rewards system to keep donors engaged and committed to regular donations.',
                    imgSrc: assets.images.hdonor,
                    altText: 'Engage Donors Easily',
                    icon: <IoPeople className="feature-icon" />,
                    color: "bg-purple-100"
                },
                {
                    title: 'Life Community',
                    description: 'Join 50,000+ members in our lifesaving community with events, stories, and support networks.',
                    imgSrc: assets.images.support1,
                    altText: 'Community Support',
                    icon: <IoHeartOutline className="feature-icon" />,
                    color: "bg-green-100"
                },
            ],
            stats: [
                { value: "10,000+", label: "Lives Saved" },
                { value: "50,000+", label: "Active Donors" },
                { value: "200+", label: "Partner Hospitals" },
                { value: "24/7", label: "Support" }
            ]
        }, 
        ar: {
            title: "؟ BloodFlow لماذا تختار",
            subtitle: "الابتكار من خلال إنقاذ الأرواح",
            cards: [
                {
                    title: "تتبع الدم في الوقت الفعلي",
                    description: "نظام المخزون الحي يعرض فصائل الدم والكميات المتاحة في جميع المستشفيات الشريكة في الوقت الفعلي.",
                    imgSrc: assets.images.inventory,
                    altText: "متابعة مخزون الدم",
                    icon: <IoWaterOutline className="feature-icon" />,
                    color: "bg-red-100"
                },
                {
                    title: "شبكة المستشفيات",
                    description: "تكامل مباشر مع أكثر من 200 مركز صحي لطلبات الدم الفورية والتسليم السريع.",
                    imgSrc: assets.images.doctors,
                    altText: "التكامل مع المستشفيات",
                    icon: <IoPulse className="feature-icon" />,
                    color: "bg-blue-100"
                },
                {
                    title: "إشراك المتبرعين",
                    description: "نظام إشعارات ذكي ومكافآت للحفاظ على تفاعل المتبرعين والتزامهم بالتبرع المنتظم.",
                    imgSrc: assets.images.donor,
                    altText: "تفاعل سهل مع المتبرعين",
                    icon: <IoPeople className="feature-icon" />,
                    color: "bg-purple-100"
                },
                {
                    title: "مجتمع الحياة",
                    description: "انضم إلى أكثر من 50,000 عضو في مجتمعنا المنقذ للحياة مع الأحداث والقصص وشبكات الدعم.",
                    imgSrc: assets.images.support,
                    altText: "دعم المجتمع",
                    icon: <IoHeartOutline className="feature-icon" />,
                    color: "bg-green-100"
                },
            ],
            stats: [
                { value: "10,000+", label: "حياة تم إنقاذها" },
                { value: "50,000+", label: "متبرعين نشطين" },
                { value: "200+", label: "مستشفى شريك" },
                { value: "24/7", label: "دعم" }
            ]
        }
    }

    const { title, subtitle, cards, stats } = labels[language];
    
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-red-600 opacity-10 transform -skew-y-3 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-5 transform translate-x-32 translate-y-32"></div>
            
            <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 relative z-10">
                {/* Header section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 px-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Features grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${language === "ar" ? "direction-rtl" : ""}`}>
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`${card.color} p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center`}
                        >
                            {/* Icon with animated background */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-white opacity-20 rounded-full w-24 h-24 transform scale-110"></div>
                                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                                    {card.icon}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                            <p className="text-gray-600 mb-6">{card.description}</p>
                            
                            {/* Image with hover effect */}
                            <div className="mt-auto relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-red-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                <img
                                    src={card.imgSrc}
                                    alt={card.altText}
                                    className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            
                            {/* Resize icon */}
                            <button className="mt-6 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
                                <IoResizeSharp className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <span className="font-bold text-lg">
                            {language === 'en' ? 'Join Our Lifesaving Community Today' : 'انضم إلى مجتمعنا المنقذ للحياة اليوم'}
                        </span>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .feature-icon {
                    width: 2rem;
                    height: 2rem;
                    color: #e53e3e;
                }
            `}</style>
        </div>
    );
}

export default Features;