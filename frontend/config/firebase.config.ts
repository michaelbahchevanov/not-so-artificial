import { getApps, initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKEY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    // apiKey: "AIzaSyCSbhK5MJchj5uc8qXf8smtbuDtPBmoqzI",
    // authDomain: "not-so-artificial.firebaseapp.com",
    // projectId: "not-so-artificial",
    // storageBucket: "not-so-artificial.appspot.com",
    // messagingSenderId: "443365341927",
    // appId: "1:443365341927:web:cb89944a00988eafb04042",
    // measurementId: "G-WSEMV9MR3T"
};

if (!getApps.length) {
    initializeApp(firebaseConfig)
    if (typeof window !== "undefined") {
        if ("measurementId" in firebaseConfig) {
            getAnalytics()
        }
    }
}