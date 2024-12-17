import { useState } from "react";
import { useLanguage } from "../hooks/LanguageContext";
import UserType from "./UserType";
import assets from '../assets/assets.js';

const Join = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { language } = useLanguage();

    const textContent = {
        en: {
            heading: "Become a Lifesaver Today!",
            description: "Sign up as a donor or make a request for blood in just a few clicks.",
            button: "Get Started",
            donorSuccess: "Thank you for your willingness to donate blood! You can now help save lives.",
            receiverSuccess: "Thank you for requesting blood! We will find a suitable donor for you.",
        },
        ar: {
            heading: "!كن منقذًا للأرواح اليوم",
            description: ".سجل كمتبرع أو قم بطلب دم في بضع نقرات فقط",
            button: "ابدأ الآن",
            donorSuccess: ".شكرًا لاستعدادك للتبرع بالدم! يمكنك الآن المساعدة في إنقاذ الأرواح",
            receiverSuccess: ".شكرًا لطلبك الدم! سنجد لك متبرعًا مناسبًا",
        },
    };

    const content = textContent[language];

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };



    return (
        <>
            <section
                id="donate"
                className={`relative bg-gradient-to-r from-red-600 to-red-900 text-white text-center 
                    py-8 px-4 sm:py-12 sm:px-8 shadow-lg ${
                    language === "ar" ? "rtl" : "ltr"
                }`}
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url('${assets.images.doctors}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-[#0D1321] bg-opacity-50 z-0"></div>
                <h3 className="text-2xl sm:text-4xl font-bold mb-4 z-10 relative">{content.heading}</h3>
                <p className="text-xs sm:text-base mt-4 z-10 relative">{content.description}</p>
                <button
                    className="mt-6 bg-white text-red-600 px-5 py-2 sm:px-6 sm:py-3 
                    rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300 z-10 relative"
                    onClick={handleButtonClick}
                >
                    {content.button}
                </button>
            </section>

            {showPopup && (
                <UserType closePopup={closePopup} />
            )}
        </>
    );
};

export default Join;
