/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Cookies from "js-cookie";
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginSuccess = (token) =>{
        Cookies.set("token", token)
        login(token);
        
        navigate("/donor/dashboard");
        
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://server-e-commerce-seven.vercel.app/api/users/login",
                { email, password }
            );


            // console.log(response.data.data.token);

            
            

            if (response.data.data.token) {
                handleLoginSuccess(response.data.data.token);
            }else {
                console.error("Invalid credentials!");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Login</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded p-4 mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-6 text-gray-500">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/register", { state: { showSignUp: true } })}
                        className="text-red-600 hover:underline"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;