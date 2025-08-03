import { useState, useEffect } from 'react';
import { CiDesktopMouse2 } from "react-icons/ci";
import { motion } from 'framer-motion';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        isVisible && (
            <motion.div
            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                onClick={scrollToTop}
                className="fixed bottom-8 left-8 p-3 bg-red-500 text-white rounded-full shadow-lg 
                hover:bg-red-600 transition z-50">
                <CiDesktopMouse2 className='w-6 h-6'/>
            </motion.div>
        )
    );
}

export default ScrollToTop;
