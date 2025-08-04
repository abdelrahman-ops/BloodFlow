import { useEffect, useState } from "react";
import axios from "axios";

const BloodTypeTree = () => {
  const compatibility = {
    "O+": ["O+", "A+", "B+", "AB+"],
    "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
  };

    return (
        <div className="mt-8 bg-gray-300 p-4 rounded-3xl shadow-xl col-span-1">
        <h3 className="text-2xl font-bold text-center text-red-600">Blood Type Compatibility</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {Object.keys(compatibility).map((type) => (
            <div key={type} className="p-4 bg-white border rounded-3xl shadow-sm">
                <h4 className="text-xl font-bold text-red-600">{type}</h4>
                <p className="mt-2 text-gray-700">
                    Can donate to: <br />
                    {compatibility[type].join(", ")}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
};

const DonateBlood = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    bloodType: "",
    hospitalId: "",
    amount: "", 
    availability: "",
  });

  const [eligibility, setEligibility] = useState({
    ageRange: false,
    weight: false,
    donationGap: false,
    health: false,
    hydration: false,
  });

  const [allChecked, setAllChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 
  const [hospitals, setHospitals] = useState([]); // Store hospitals
  const [loadingHospitals, setLoadingHospitals] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("https://bfserver.vercel.app/api/hospitals");
        setHospitals(response.data); // Assuming the response contains the list of hospitals
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setErrorMessage("Failed to fetch hospitals. Please try again.");
      } finally {
        setLoadingHospitals(false);
      }
    };

    fetchHospitals();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEligibilityChange = (e) => {
    const { name, checked } = e.target;
    const updatedEligibility = { ...eligibility, [name]: checked };
    setEligibility(updatedEligibility);
    setAllChecked(Object.values(updatedEligibility).every((val) => val));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!allChecked) {
      setErrorMessage("Please ensure you meet all eligibility criteria.");
      return;
    }

    const { name, gender, age, bloodType, hospitalId, amount } = formData;
    if (!name || !gender || !age || !bloodType || !hospitalId || !amount) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const registerResponse = await axios.post("https://bfserver.vercel.app/api/auth/register/quick", {
        name,
        gender,
        age,
        bloodType,
        type: "quick",
      });

      const donorId = registerResponse.data.user.id;
      // console.log("donor ID: ",donorId);
      // console.log("Hospital ID: ",hospitalId);

      await axios.post("https://bfserver.vercel.app/api/donations/create", {
        donorId,
        hospitalId,
        bloodType,
        amount,
        status:"Pending",
      });

      setSuccessMessage("You are successfully registered and a donation record has been created!");
      setFormData({ name: "", gender: "", age: "", bloodType: "", hospitalId: "", amount: 1 });
      setEligibility({
        ageRange: false,
        weight: false,
        donationGap: false,
        health: false,
        hydration: false,
      });
      setAllChecked(false);
    } catch (error) {
      console.error("Error registering donor or creating donation record:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to register or add donation. Please try again."
      );
    }
  };

  return (
    <div className="font-sans">
    <section className="py-16 bg-gray-100">
            {/* Header Section */}
            <section className=" text-red-600 py-6 text-center">
                <h1 className="text-4xl font-bold">Donate Blood</h1>
                <p className="mt-4">Become a donor and help save lives!</p>
                <div className="mt-6">
                <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-white text-red-600 px-6 py-2 rounded hover:bg-gray-100 shadow"
                >
                    Sign Up / Login
                </button>
                </div>
            </section>
        
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
        
            {/* Registration Form */}
            <div className="bg-white shadow-xl p-8 rounded-3xl col-span-1">
                <h2 className="text-3xl font-bold text-red-600">Register as a Donor</h2>
                <form onSubmit={handleRegistrationSubmit} className="mt-8 space-y-4">
                    <div><label className="block text-gray-700">Name:</label>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Your Name"
                        />
                    </div>
                    
                    <div><label className="block text-gray-700">Gender:</label>
                        <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                            className="w-5 h-5 text-red-600"
                            />
                            <span>Male</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                            className="w-5 h-5 text-red-600"
                            />
                            <span>Female</span>
                        </label>
                        </div>
                    </div>
                    
                    <div><label className="block text-gray-700">Age:</label>
                        <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Your Age"
                        />
                    </div>
                    
                    <div><label className="block text-gray-700">Blood Type:</label>
                        <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        >
                        <option value="">Select Blood Type</option>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                            <option key={type} value={type}>
                            {type}
                            </option>
                        ))}
                        </select>
                    </div>
                    
                    <div><label className="block text-gray-700">Hospital:</label>
                        {loadingHospitals ? (
                        <p>Loading hospitals...</p>
                        ) : (
                        <select
                            name="hospitalId"
                            value={formData.hospitalId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Hospital</option>
                            {hospitals.map((hospital) => (
                            <option key={hospital._id} value={hospital._id}>
                                {hospital.name}
                            </option>
                            ))}
                        </select>
                        )}
                    </div>
                    
                    <div><label className="block text-gray-700">Amount (in liters):</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="0.1"
                            step="0.1"
                        />
                    </div>

                    <div><label className="block text-gray-700">Availability:</label>
                        <input
                        type="date"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        />
                    </div>
                    
                    
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-2 rounded w-full hover:bg-red-700"
                    >
                        Register and Donate
                    </button>

                    {errorMessage && (
                        <p className="text-red-600 text-sm">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-600 text-sm">{successMessage}</p>
                    )}
                </form>
            </div>

            {/* Eligibility Checklist */}
            <div className=" col-span-1">
                <div className="bg-white shadow-xl p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold text-red-600">Eligibility Checklist</h2>
                    <div className="mt-8 space-y-4">
                    {[
                        { label: "Donors must be between 18-65 years old.", name: "ageRange" },
                        { label: "Minimum weight of 50 kg (110 lbs).", name: "weight" },
                        { label: "Must not have donated blood in the last 12 weeks.", name: "donationGap" },
                        { label: "No major illnesses or infections in the past 6 months.", name: "health" },
                        { label: "Good overall health and hydration.", name: "hydration" },
                    ].map(({ label, name }) => (
                        <label key={name} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name={name}
                            checked={eligibility[name]}
                            onChange={handleEligibilityChange}
                            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-gray-700">{label}</span>
                        </label>
                    ))}
                    </div>
                    {allChecked && (
                    <p className="mt-4 text-green-600 font-bold">You can donate!</p>
                    )}
                </div>
                

                <BloodTypeTree />
            </div>
            
            
        </div>

    </section>
    </div>
    );
};

export default DonateBlood;
