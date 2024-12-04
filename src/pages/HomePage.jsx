import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Search from "../components/Search.jsx";
import Stats from "../components/Stats.jsx";
import Join from "../components/Join.jsx";
import Features from '../components/Features.jsx'
import Footer from "../components/Footer.jsx";

const HomePage = () => {
    return (
        <>
            <div className="font-sans">
                <Navbar />
                <Hero />
                <Search />
                <Stats />
                <div className="bg-gray-100 pl-0 md:pl-52">
                    <Features />
                    <Join />
                </div>
                <Footer />
            </div>
        </>
        
    );
};

export default HomePage;
