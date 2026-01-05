"use client";

import { useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function FirebaseAnalytics() {
  useEffect(() => {
    console.log("Firebase Config:", firebaseConfig);

    if (!firebaseConfig.apiKey) {
      console.error("Firebase API Key is missing! Check .env.local");
      return;
    }

    const app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    isSupported().then((supported) => {
      console.log("Firebase Analytics supported:", supported);
      if (supported) {
        const analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized:", analytics);
      }
    });
  }, []);

  return null;
}
