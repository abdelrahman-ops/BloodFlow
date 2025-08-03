import { FaHeartbeat } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useLanguageStore } from '../../stores/languageStore';

const EmergencyButton = () => {
    const { language } = useLanguageStore();
    const textContent = {
        en: {
            emergencyButton: "Emergency? Click Here",
        },
        ar: {
            emergencyButton: "حالة طارئة؟ اضغط هنا",
        },
    };

    const content = textContent[language];
    return (
        <Link 
            to="/emergency" 
            className="fixed right-4 bottom-4 md:right-6 md:bottom-6 px-4 py-2 md:px-5 md:py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold rounded-full shadow-lg transition-all duration-300 flex items-center z-50 animate-pulse"
            aria-label="Emergency blood request"
        >
            <FaHeartbeat className="mr-2" />
            <span className="hidden sm:inline">{content.emergencyButton}</span>
            <span className="sm:hidden">{language === 'en' ? 'Emergency' : 'طارئ'}</span>
        </Link>
    )
}

export default EmergencyButton