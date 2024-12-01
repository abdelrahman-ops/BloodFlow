
import inventory from '../assets/inventory.jpg'
import support from '../assets/support.jpg'
import doctors from '../assets/doctors.jpg'
import donor from '../assets/donor.jpg'
function LandingPage() {
    return (
        <div className="min-h-screen">
            <section id="features" className="py-16 px-8 bg-gray-100">
                <h3 className="text-3xl font-bold text-center mb-8">Why Choose BloodFlow?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* First card with top-left border radius */}
                    <div className="bg-white shadow-md p-6 rounded-b-full rounded-tl-[1500px] rounded-tr-full flex flex-col justify-between overflow-hidden">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Real-Time Blood Inventory</h4>
                            <p className="mb-4">Track available blood types and ensure timely distribution during emergencies.</p>
                        </div>
                        <img 
                            src={inventory}
                            alt="Real-Time Blood Inventory"
                            className="w-48 h-48  rounded-full mx-auto"
                        />
                    </div>
                    
                    {/* Second card */}
                    <div className="bg-white shadow-md p-6 rounded-b-full rounded-tl-[1500px] rounded-tr-full flex flex-col justify-between overflow-hidden">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Integrated with Hospitals</h4>
                            <p className="mb-4">Seamlessly connect with healthcare centers for efficient blood requests and delivery.</p>
                        </div>
                        <img 
                            src={doctors}
                            alt="Integrated with Hospitals"
                            className="w-48 h-48 rounded-full mx-auto"
                        />
                    </div>
                    
                    {/* Third card */}
                    <div className="bg-white shadow-md p-6 rounded-b-full rounded-tl-[1500px] rounded-tr-full flex flex-col justify-between overflow-hidden">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Engage Donors Easily</h4>
                            <p className="mb-4">Use advanced technology to remind and engage donors through mobile apps and notifications.</p>
                        </div>
                        <img 
                            src={donor}
                            alt="Engage Donors Easily"
                            className="w-48 h-48 rounded-full mx-auto"
                        />
                    </div>

                    {/* Fourth card */}
                    <div className="bg-white shadow-md p-6 rounded-b-full rounded-tl-[1500px] rounded-tr-full flex flex-col justify-between overflow-hidden">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Community<br></br>Support</h4>
                            <p className="mb-4">Join a network of donors and recipients to build a supportive community.</p>
                        </div>
                        <img 
                            src={support}
                            alt="Community Support"
                            className="w-48 h-48 rounded-full mx-auto"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
