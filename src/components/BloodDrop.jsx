
import { Link } from 'react-router-dom'
import assets from '../assets/assets'
import { motion } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';

const BloodDrop = () => {

    const { language } = useLanguageStore();

    const labels = {
        en: {
            about: "About Us",
            events: "Events",
            features: "Features",
            contact: "Contact Us",
            login: "Login",
            loginAs: "Login As",
            hospital: "Hospital Admin",
            donor: "Donor",
            close: "Close",
        },
        ar: {
            about: "عن المشروع",
            events: "أحداث",
            features: "الميزات",
            contact: "تواصل معنا",
            login: "سجل",
            loginAs: "تسجيل الدخول كـ",
            hospital: "مسؤول المستشفى",
            donor: "متبرع",
            close: "إغلاق",
        },
    };

    return (
    <motion.nav
                    initial={{ backgroundSize: '120%' }}
                    animate={{ backgroundSize: '150%' }} 
                    transition={{
                        type: 'spring',
                        stiffness: 80,
                        damping: 20,
                        duration: 1.2,
                    }}
                    className=" top-20 left-10 h-56 w-40  justify-center items-center py-4 z-50 rounded-full hidden md:flex fixed  blood"
                    style={{
                        backgroundImage: `url(${assets.icons.blood})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                
                    <ul className="flex flex-col justify-center items-center space-y-4 text-white text-sm">
                        <li> <Link to="/about-us" className=" hover:text-gray-200"> {labels[language].about} </Link> </li>
                        <li> <Link to="/events" className="hover:text-gray-200"> {labels[language].events} </Link> </li>
                        <li> <Link to="/contact-us" className="hover:text-gray-200"> {labels[language].contact} </Link> </li>
                    </ul>
                </motion.nav>
    )
}

export default BloodDrop
