import hero from '../assets/hero.jpg'

const Hero = () => {
    return (
        <header className="relative w-full h-screen">
            <div className="absolute inset-0 z-0">
                <img
                src={hero}
                alt="Hero"
                className="w-full h-full object-cover"
                />
            </div>
        <div className="absolute inset-0 bg-red-500 bg-opacity-30 z-10"></div>
        <div className="absolute bottom-0 w-full z-20">
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
        <div className="relative z-30 flex flex-col items-center justify-center h-full text-white px-8">
            <h2 className="text-4xl font-bold">Save Lives with Every Drop</h2>
            <p className="mt-4 text-lg">
            Join our mission to bridge the gap between blood donors and those in need. Together, we can make a difference.
            </p>
            <button className="mt-6 bg-white text-red-600 px-6 py-3 rounded font-semibold hover:bg-gray-200">
            Learn More
            </button>
        </div>
        </header>
    );
}

export default Hero