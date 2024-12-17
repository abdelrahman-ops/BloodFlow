import Hero from "../components/Hero.jsx";
import Search from "../components/Search.jsx";
import Stats from "../components/Stats.jsx";
import Join from "../components/Join.jsx";
import Features from '../components/Features.jsx'
import Awarness from "../components/Awarness.jsx";

const HomePage = () => {
    return (
        <>
            <div className="font-sans">
                <Hero />
                <Search />
                <Stats />
                <Features />
                <Awarness />
                <Join />
            </div>
        </>
        
    );
};

export default HomePage;
