import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Join from './components/Join';
import BloodTypeTree from './components/BloodTypeTree';
import ScrollToTop from './components/ScrollToTop'; // Import the new component
import Features from './pages/Features';
import { LanguageProvider } from './hooks/LanguageContext';

function App() {
    return (
        <>
        <LanguageProvider>
            <Navbar />
            <Hero />
            <div className="bg-gray-100 pl-0 md:pl-52">
                <Features />
                <BloodTypeTree />
                <Join />
            </div>
            <Footer />
            <ScrollToTop />
        </LanguageProvider>
        </>
    );
}

export default App;
