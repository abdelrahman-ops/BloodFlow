import LoginForm from "../../components/LoginForm";

const DonorLogin = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-red-600 to-red-700">
            <div className="p-6 max-w-md w-full">
                <LoginForm role="donor" heading="Donor Login" />
            </div>
        </div>
    );
};

export default DonorLogin;
