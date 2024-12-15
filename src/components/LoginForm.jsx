/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ heading }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (credentials.email === "donor@bloodflow.com" && credentials.password === "donor123") {
            navigate("/donor/dashboard");
        } else if (credentials.email === "admin@hospital.com" && credentials.password === "admin123") {
            navigate("/admin/dashboard");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold text-center mb-4 text-red-600">{heading}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Login
                </motion.button>
            </form>
        </motion.div>
    );
};

export default LoginForm;
