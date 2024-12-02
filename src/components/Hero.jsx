// import hero from '../assets/hero.jpg';
import assets from '../assets/assets.js';
import { useLanguage } from '../hooks/LanguageContext.jsx';

const Hero = () => {
    const { language } = useLanguage();

    const textContent = {
        en: {
            heading: "Save Lives with Every Drop",
            description: "Join our mission to bridge the gap between blood donors and those in need. Together, we can make a difference.",
            button: "Learn More",
        },
        ar: {
            heading: "أنقذ الأرواح مع كل قطرة",
            description: "انضم إلى مهمتنا لسد الفجوة بين المتبرعين بالدم والمحتاجين. معًا، يمكننا إحداث فرق.",
            button: "تعرف أكثر",
        },
    };

    const content = textContent[language];

    return (
        <section id="about" className="relative w-full h-[70vh] md:h-[80vh] sm:h-[60vh]">
            <div className="absolute inset-0 z-0">
                <img
                    src={assets.images.hero}
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-red-500 bg-opacity-30 z-10"></div>
            <div className="absolute -bottom-6 w-full z-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="w-full h-50"
                >
                    <path
                        fill="#f3f4f6"
                        fillOpacity="1"
                        d="M0,224L48,218.7C96,213,192,203,288,176C384,149,480,107,576,117.3C672,128,768,192,864,208C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
            <div
                className={`relative z-30 flex flex-col items-center justify-center h-full text-white px-6 md:px-12 text-center ${
                    language === "ar" ? "rtl" : "ltr"
                }`}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {content.heading}
                </h2>
                <p className="mt-4 text-base md:text-lg lg:text-xl max-w-2xl">
                    {content.description}
                </p>
                <button className="mt-6 bg-white text-red-600 px-4 py-2 md:px-6 md:py-3 rounded font-semibold hover:bg-gray-200 transition duration-200">
                    {content.button}
                </button>
            </div>
        </section>
    );
};

export default Hero;
