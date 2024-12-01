const Footer = () => {
    return (
        <footer id="contact" className="relative bg-gray-800 text-white pt-10 pb-8 text-center">
            {/* Smoother Wave SVG at the top */}
            {/* <div className="absolute inset-x-0 -top-28 z-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="w-full"
                >
                    <path
                        fill="#f3f4f6"
                        fillOpacity="1"
                        d="M0,224C48,192,96,160,192,149.3C288,139,384,149,480,154.7C576,160,672,160,768,170.7C864,181,960,203,1056,202.7C1152,203,1248,181,1344,154.7C1392,139,1440,128,1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div> */}
            {/* Footer Content */}
            
            <div className="relative">
                <p className="text-lg font-bold">Contact Us</p>
                <p>Email: <a href="mailto:support@BloodFlow.com" className="text-red-500 hover:underline">support@BloodFlow.com</a></p>
                <p>Phone: <a href="tel:+20123456789" className="text-red-500 hover:underline">+20 123 456 789</a></p>
                <p className="mt-4">© 2024 BloodFlow Blood Bank. All rights reserved.</p>
            </div>
            
        </footer>
    );
};

export default Footer;
