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

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import { AuthProvider } from './hooks/AuthContext';
import { LanguageProvider } from './hooks/LanguageContext';


import './App.css';
import AdminDashboard from './pages/Dashboard/AdminDash';
import { DataProvider } from './context/DataContext';







function App() {
    return (
        <div className='bg-gray-100'>
            <AuthProvider>
            <DataProvider>
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
                        
                        <Route path="/donor/dashboard/:id" element={<DonorDash />} />
                        <Route path="/admin/dashboard/:id" element={<AdminDashboard />} />

                        <Route path="/login" element={<Login />}/>
                        <Route path='/register' element={<Register />}></Route>
                    </Routes>
                    <Footer />
                    <ScrollToTop />
                </Router>
            
            </LanguageProvider>
            </DataProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
