/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getMessaging , getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
};



const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    // console.log(permission);
    
    if (permission === 'granted') {
        const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_REACT_APP_VAPID_KEY,
    });
        if (token) {
            // console.log("Token: ", token);
        } else {
            console.warn("No token received");
        }
        return token;
    }
    
}