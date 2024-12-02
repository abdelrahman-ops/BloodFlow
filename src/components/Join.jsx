const Join = () => {
    return (
        <section className="relative bg-gradient-to-r from-red-600 to-red-900 text-white text-center py-8 px-4 sm:py-12 sm:px-8 rounded-l-[100px] lg:rounded-tl-full shadow-lg">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4">
                Become a Lifesaver Today!
            </h3>
            <p className="text-xs sm:text-base mt-4">
                Sign up as a donor or make a request for blood in just a few clicks.
            </p>
            <button className="mt-6 bg-white text-red-600 px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
                Get Started
            </button>
        </section>
    );
};

export default Join;
