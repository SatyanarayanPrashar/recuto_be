"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyBqKqZiWZ0XvCrVEo439msIzYre6miSsUA",
    authDomain: "recruto-47caf.firebaseapp.com",
    projectId: "recruto-47caf",
    storageBucket: "recruto-47caf.appspot.com",
    messagingSenderId: "1077484717798",
    appId: "1:1077484717798:web:e44d74fa2a1d6f5c541d27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();