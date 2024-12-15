import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BloodRequests from './pages/Request';
import DonateBlood from './pages/Donate';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import ContactUs from './pages/Contact';

import DonorDash from './pages/Dashboard/DonorDash';
import DonorLogin from './pages/Login/DonorLogin'
import HospitalLogin from './pages/Login/AdminLogin';

import ScrollToTop from './components/ScrollToTop';

import Navbar from './components/Navbar';
import Footer from './components/Footer'

import { LanguageProvider } from './hooks/LanguageContext';

import './App.css';
import AdminDash from './pages/Dashboard/AdminDash';




function App() {
    return (
        <div className='bg-gray-100'>
            <LanguageProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blood-requests" element={<BloodRequests />} />
                        <Route path="/donate-blood" element={<DonateBlood />} />
                        
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        
                        <Route path="/donor/dashboard" element={<DonorDash />} />
                        <Route path="/admin/dashboard" element={<AdminDash />} />
                        <Route path="/hospital/login" element={<HospitalLogin />}/>
                        <Route path="/user/login" element={<DonorLogin />}/>
                    </Routes>
                    <Footer />
                    <ScrollToTop />
                </Router>
            
        </LanguageProvider>
        </div>
    );
}

export default App;
