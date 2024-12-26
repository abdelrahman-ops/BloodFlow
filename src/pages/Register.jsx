import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Register = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState("donor"); // Default to donor
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        bloodType: "", // For donor
        age: "", // For donor
        gender: "", // For donor
        phone: "", // For donor
        hospitalName: "", // For admin
        hospitalLocation: "", // For admin
        contactNumber: "", // For admin
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const apiUrl = userType === "admin"
                ? "https://bfserver.vercel.app/api/auth/register"
                : "https://bfserver.vercel.app/api/auth/register";

            const payload = userType === "admin"
                ? {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        hospitalName: formData.hospitalName,
                        hospitalLocation: formData.hospitalLocation,
                        contactNumber: formData.contactNumber,
                }
                : {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        bloodType: formData.bloodType,
                        age: formData.age,
                        gender: formData.gender,
                        phone: formData.phone,
                };

            const response = await axios.post(apiUrl, payload);

            if (response.status === 201) {
                navigate("/login"); // Redirect to login after successful registration
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        // if (userType === "admin") {
        //     navigate("/hospital/login");
        // } else {
        //     navigate("/user/login");
        // }
        navigate('/login')
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-gray-100 mt-14"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), 
                rgba(0, 0, 0, 0)),url('${assets.images.hdonor}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-red-600">
                        {userType === "admin" ? "Admin Registration" : "Donor Registration"}
                    </h2>
                    <div className="flex">
                        <button
                            onClick={() => setUserType("donor")}
                            className={`px-4 py-2 rounded-l-lg ${
                                userType === "donor"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Donor
                        </button>
                        <button
                            onClick={() => setUserType("admin")}
                            className={`px-4 py-2 rounded-r-lg ${
                                userType === "admin"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Admin
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded p-4 mb-4">
                        {error}
                    </div>
                )}

                <div className="flex gap-8 flex-wrap">
                    <form onSubmit={handleRegister} className="flex-grow">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            {userType === "donor" && (
                                <>
                                    <div>
                                        <label htmlFor="bloodType" className="block text-gray-700 font-medium mb-2">
                                            Blood Type
                                        </label>
                                        <select
                                            id="bloodType"
                                            name="bloodType"
                                            value={formData.bloodType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                        >
                                            <option value="">Select your blood type</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                            placeholder="Enter your age"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                        >
                                            <option value="">Select your gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </>
                            )}

                            {userType === "admin" && (
                                <>
                                    <div>
                                        <label
                                            htmlFor="hospitalName"
                                            className="block text-gray-700 font-medium mb-2"
                                        >
                                            Hospital Name
                                        </label>
                                        <input
                                            type="text"
                                            id="hospitalName"
                                            name="hospitalName"
                                            value={formData.hospitalName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                            placeholder="Enter hospital name"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="hospitalLocation"
                                            className="block text-gray-700 font-medium mb-2"
                                        >
                                            Hospital Location
                                        </label>
                                        <input
                                            type="text"
                                            id="hospitalLocation"
                                            name="hospitalLocation"
                                            value={formData.hospitalLocation}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                            placeholder="Enter hospital location"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contactNumber"
                                            className="block text-gray-700 font-medium mb-2"
                                        >
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="contactNumber"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                                            placeholder="Enter contact number"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition ${
                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>
                            <button
                                type="button"
                                onClick={handleLoginRedirect}
                                className="text-red-600 hover:underline"
                            >
                                Already have an account? Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
