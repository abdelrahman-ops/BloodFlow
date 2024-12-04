import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BloodRequests from './pages/Request';
import DonateBlood from './pages/Donate';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import ContactUs from './pages/Contact';

import ScrollToTop from './components/ScrollToTop';

import { LanguageProvider } from './hooks/LanguageContext';

import './App.css';

// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Join from './components/Join';
// import BloodTypeTree from './components/BloodTypeTree';
// import Features from './pages/Features';
// import Stats from './components/Stats';



function App() {
    return (
        <>
        {/* <LanguageProvider>
            <Navbar />
            <div className="relative">
                <Hero />
                <div className='relative lg:-mt-16 md:-mt-12 sm:-mt-8 z-30 bg-gray-100 pl-0 md:pl-52'>
                    <Stats />
                </div>
            </div>
            
            <div className="bg-gray-100 pl-0 md:pl-52">
                <Features />
                <BloodTypeTree />
                <Join />
            </div>
            <Footer />
            <ScrollToTop />
        </LanguageProvider> */}


        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blood-requests" element={<BloodRequests />} />
                    <Route path="/donate-blood" element={<DonateBlood />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
            </Router>
            <ScrollToTop />
        </LanguageProvider>
        </>
    );
}

export default App;
