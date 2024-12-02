import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LandingPage from './pages/LandingPage';
import Join from './components/Join';
// import BloodType from './components/BloodType';
// import BloodTypeCompatibility from './components/blood2';
import BloodTypeTree from './components/BloodTypeTree';

function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <div className="bg-gray-100 pl-0 md:pl-52">
                <LandingPage />
                {/* <BloodType />
                <BloodTypeCompatibility /> */}
                <BloodTypeTree />
                <Join />
            </div>
            <Footer />
        </>
    );
}

export default App;
