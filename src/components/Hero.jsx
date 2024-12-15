// import hero from '../assets/hero.jpg';
import { Link } from 'react-router-dom';
import assets from '../assets/assets.js';
import { useLanguage } from '../hooks/LanguageContext.jsx';

const Hero = () => {
    const { language } = useLanguage();

    // const textContent = {
    //     en: {
    //         heading: "Save Lives with Every Drop",
    //         description: "Join our mission to bridge the gap between blood donors and those in need. Together, we can make a difference.",
    //         button: "Learn More",
    //     },
    //     ar: {
    //         heading: "أنقذ الأرواح مع كل قطرة",
    //         description: "انضم إلى مهمتنا لسد الفجوة بين المتبرعين بالدم والمحتاجين. معًا، يمكننا إحداث فرق.",
    //         button: "تعرف أكثر",
    //     },
    // };

    const textContent = {
        en: {
            heading: "Save Lives with Every Drop",
            description: "Join our mission to bridge the gap between blood donors and those in need. Together, we can make a difference.",
            donorOption: "I am a donor",
            needBloodOption: "I need blood",
        },
        ar: {
            heading: "أنقذ الأرواح مع كل قطرة",
            description: "انضم إلى مهمتنا لسد الفجوة بين المتبرعين بالدم والمحتاجين. معًا، يمكننا إحداث فرق",
            donorOption: "أنا متبرع",
            needBloodOption: "أحتاج إلى دم",
        },
    };

    const content = textContent[language];

    return (
        <section 
            className="relative text-white py-16 text-center h-[50vh] md:h-[60vh] sm:h-[45vh] mt-10"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url('${assets.images.inventory}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div
            className={`container mx-auto ${language === "ar" ? "rtl" : "ltr" }`}
        >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 z-10 relative">
                {content.heading}
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-lg lg:text-2xl z-10 relative">
                {content.description}
            </p>
            {/* <button className="mt-6 bg-white text-red-600 px-4 py-2 md:px-6 md:py-3 rounded font-semibold hover:bg-gray-200 transition duration-200">
                {content.button}
            </button> */}

            <div className="mt-6 flex flex-wrap justify-center gap-4 z-10 relative">
                <Link
                    to="/blood-requests"
                    className="px-6 py-3 bg-white text-red-600 rounded shadow hover:bg-gray-200 transition duration-200 blood"
                >
                    {content.needBloodOption}
                </Link>
                <Link
                    to="/donate-blood"
                    className="px-6 py-3 bg-white text-red-600 rounded shadow hover:bg-gray-200 transition duration-200 blood green"
                >
                    {content.donorOption}
                </Link>
            </div>
        </div>
        </section>
    );
};

export default Hero;
