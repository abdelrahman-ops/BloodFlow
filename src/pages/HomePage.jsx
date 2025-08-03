import Hero from "../components/hero/Hero.jsx";
import Features from '../components/home/Features.jsx'
import Awarness from "../components/home/Awarness.jsx";

const HomePage = () => {
    return (
        <>
            <div className="font-sans">
                <Hero />
                {/* <Search />
                <Stats /> */}
                <Features />
                <Awarness />
                {/* <Join /> */}
            </div>
        </>
        
    );
};

export default HomePage;
