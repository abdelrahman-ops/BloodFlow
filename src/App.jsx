import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BloodRequests from './pages/Request';
import DonateBlood from './pages/Donate';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import ContactUs from './pages/Contact';

import Register from './pages/Register';
import Login from './pages/Login'

import DonorDash from './pages/Dashboard/DonorDash';

import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import ScrollToTop from './components/ui/ScrollToTop'

import './App.css';
import AdminDashboard from './pages/Dashboard/AdminDash';
import EmergencyRequestPage from './pages/Emergency';
import { useEffect } from 'react';
import { generateToken , messaging } from './services/firebase';
import { onMessage } from 'firebase/messaging';




function App() {

    if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
        console.log('Service Worker registered:', registration);
        })
        .catch((err) => {
        console.error('Service Worker registration failed:', err);
        });
    }

    useEffect(() => {
        generateToken();
        onMessage(messaging, (payload) => {
            console.log('payload', payload);
            console.log('messaging', messaging);
            
        })
    },[]);

    useEffect(() => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
    }, []);

    return (
        <div className='bg-gray-100'>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blood-requests" element={<BloodRequests />} />
                        <Route path="/donate-blood" element={<DonateBlood />} />
                        <Route path="/emergency" element={<EmergencyRequestPage />} />
                        
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        
                        <Route path="/donor/dashboard/:id" element={<DonorDash />} />
                        <Route path="/admin/dashboard/:id" element={<AdminDashboard />} />

                        <Route path="/login" element={<Login />}/>
                        <Route path='/register' element={<Register />}></Route>
                    </Routes>
                    <Footer />
                    <ScrollToTop />
                </Router>
        </div>
    );
}

export default App;
