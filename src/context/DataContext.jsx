/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);


    const storeData = (receivedData) => {
        // console.log("Setting data in context:", receivedData);
        setData(receivedData);
        localStorage.setItem('userData', JSON.stringify(receivedData));
    };

    const clearData = () => {
        setData(null);
        localStorage.removeItem('userData')
    };
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    // 
                    const response = await axios.get('https://bfserver.vercel.app/api/auth/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    });
                    storeData(response.data);
                    console.log(response.data, "response from context");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                const storedData = localStorage.getItem('userData');
                if (storedData) {
                    setData(JSON.parse(storedData));
                }
            }
        };
    
        fetchUserData();
    }, []);
    

    return (
        <DataContext.Provider value={{storeData , clearData , data }}>
            {children}
        </DataContext.Provider>
    );
};