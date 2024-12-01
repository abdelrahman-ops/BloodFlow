import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LandingPage from './pages/LandingPage'
import Join from './components/Join'

function App() {
    

    return (
        <>
            <Navbar />
            <Hero />
            <div className='pl-52 bg-gray-100'>
                
                <LandingPage />
                
                <Join />
            </div>
            <Footer />
            
        </>
    )
}

export default App
