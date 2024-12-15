import LoginForm from "../../components/LoginForm";

const HospitalLogin = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <div className="p-6 max-w-md w-full">
                <LoginForm role="hospital" heading="Hospital Admin Login" />
            </div>
        </div>
    );
};

export default HospitalLogin;
