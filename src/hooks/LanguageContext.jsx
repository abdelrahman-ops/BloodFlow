/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";


const LanguageContext = createContext();


export const useLanguage = () => useContext(LanguageContext);


export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");


    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
        {children}
        </LanguageContext.Provider>
    );
};
