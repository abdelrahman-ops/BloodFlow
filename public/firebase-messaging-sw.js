/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAP9yA8WprkqxQtHaCJrGewnNPv0pkTK40",
    authDomain: "bloodflow-4d8a2.firebaseapp.com",
    projectId: "bloodflow-4d8a2",
    storageBucket: "bloodflow-4d8a2.appspot.com",
    messagingSenderId: "992979190145",
    appId: "1:992979190145:web:1bc33e88a9a3ef209ea880",
    measurementId: "G-R7664SFR7E"
});

const messaging = firebase.messaging();
// console.log('Firebase Messaging Service Worker loaded.');
// console.log(messaging);

// Background message handler
messaging.onBackgroundMessage((payload) => {
    // console.log('Received background message: ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});