import Hero from "../components/Hero.jsx";
import Search from "../components/Search.jsx";
import Stats from "../components/Stats.jsx";
import Join from "../components/Join.jsx";
import Features from '../components/Features.jsx'

const HomePage = () => {
    return (
        <>
            <div className="font-sans">
                
                <Hero />
                <Search />
                <Stats />
                <Features />
                <div className="pl-0 md:pl-52">
                    
                    <Join />
                </div>
                
            </div>
        </>
        
    );
};

export default HomePage;
