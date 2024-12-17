import { useState, useEffect } from 'react';

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
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 p-3 bg-red-500 text-white rounded-full shadow-lg 
                hover:bg-red-600 transition z-50">
                ↑
            </button>
        )
    );
}

export default ScrollToTop;
