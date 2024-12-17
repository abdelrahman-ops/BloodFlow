/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";


const RoleContext = createContext();

export const useRole = () => {
    return useContext(RoleContext);
};


export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    
    const chooseRole = (selectedRole) => {
        setRole(selectedRole);
    };

    const clearRole = () => {
        setRole(null);
    };

    return (
        <RoleContext.Provider value={{ role, chooseRole, clearRole }}>
            {children}
        </RoleContext.Provider>
    );
};
