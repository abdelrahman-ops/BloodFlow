import assets from '../assets/assets.js'


// import assets.arrows.top from '../assets/ggg.png';
// import assets.arrows.down from '../assets/gggg.png';

function BloodTypeTree() {
    return (
        <div className="py-12 px-4 sm:px-8 ">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Blood Type Compatibility Tree
            </h3>
            <div className="flex flex-col items-center">
                {/* Top Level: O- */}
                <div className="relative flex flex-col items-center mb-12">
                    {/* Arrows */}
                    <div className="flex flex-row items-center ">
                        <img
                            src={assets.arrows.top}
                            alt="Arrow pointing top"
                            className="h-16 w-16 pt-2 mr-2"
                        />
                        <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg mb-4">
                            O-
                        </div>
                        <img
                            src={assets.arrows.down}
                            alt="Arrow pointing down "
                            className="h-16 w-16"
                        />
                    </div>
                    {/* Relationships */}
                    <div className="flex justify-between w-full max-w-3xl gap-6">
                        
                        <div className="flex flex-col items-center">
                            {/* <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg mb-4">
                                Receive From
                            </div> */}
                            <div className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg">
                                O+, A-, B-, AB-
                            </div>
                        </div>

                        
                        <div className="flex flex-col items-center">
                            {/* <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg mb-4">
                                Donate To
                            </div> */}
                            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
                                O+, A-, B-, AB-
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Level: A-, B-, AB- */}
                {['A-', 'B-', 'AB-'].map((bloodType, index) => (
                    <div key={index} className="relative flex flex-col items-center mb-12">
                        
                        <div className="flex flex-row items-center ">
                            <img
                                src={assets.arrows.top}
                                alt="Arrow pointing top"
                                className="h-16 w-16 pt-2 mr-2"
                            />
                            <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg mb-4">
                                {bloodType}
                            </div>
                            <img
                                src={assets.arrows.down}
                                alt="Arrow pointing down "
                                className="h-16 w-16"
                                
                            />
                        </div>
                        
                        
                        <div className="flex justify-between w-full max-w-3xl gap-6">
                            
                            <div className="flex flex-col items-center">
                                <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                                    O-, A-, B-, AB-
                                </div>
                            </div>

                            
                            <div className="flex flex-col items-center">
                                
                                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
                                    A-, A+, AB-, AB+
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BloodTypeTree;
