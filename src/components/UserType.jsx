/* eslint-disable react/prop-types */
import { useLanguage } from "../hooks/LanguageContext";

const UserType = ({ closePopup, onSelection }) => {
    const { language } = useLanguage();

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-lg p-6 w-80 sm:w-96">
                <p className="text-lg font-bold mb-4">{content.popupQuestion}</p>
                <div className="flex flex-col gap-4">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                        onClick={() => handleSelection('donor')}
                    >
                        {content.donorOption}
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                        onClick={() => handleSelection('receiver')}
                    >
                        {content.needBloodOption}
                    </button>
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
