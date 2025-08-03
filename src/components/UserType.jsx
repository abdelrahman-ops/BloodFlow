/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { useLanguageStore } from "../stores/languageStore";

const UserType = ({ closePopup, onSelection }) => {
    const { language } = useLanguageStore();

    const textContent = {
        en: {
            popupQuestion: "Are you a donor or do you need blood?",
            donorOption: "I am a donor",
            needBloodOption: "I need blood",
        },
        ar: {
            popupQuestion: "هل أنت متبرع أم تحتاج إلى دم؟",
            donorOption: "أنا متبرع",
            needBloodOption: "أحتاج إلى دم",
        },
    };

    const content = textContent[language];

    const handleSelection = (type) => {
        onSelection(type);
        closePopup();
    };

    return (
        <div className="fixed inset-0 bg-[#0D1321] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-[#0D1321] rounded-lg p-6 w-80 sm:w-96">
                <h4 className="text-lg font-semibold mb-4">{content.popupQuestion}</h4>
                
                <div className="flex flex-col gap-4 justify-center text-center">
                    <Link
                        to='/donate-blood'
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                        onClick={() => handleSelection('donor')}
                    >
                        {content.donorOption}
                    </Link>
                    <Link
                        to='/blood-requests'
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                        onClick={() => handleSelection('receiver')}
                    >
                        {content.needBloodOption}
                    </Link>
                </div>
                <button
                    className="mt-4 text-red-600 underline text-sm"
                    onClick={closePopup}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserType;
