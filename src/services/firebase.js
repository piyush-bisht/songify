import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";

const config ={
    apiKey: "AIzaSyBOmt3i_Nx4ebb3VFlIh9DO3euHDtl6N4I",
    authDomain: "songify-a8613.firebaseapp.com",
    databaseURL: "https://songify-a8613-default-rtdb.firebaseio.com",
    projectId: "songify-a8613",
    storageBucket: "songify-a8613.appspot.com",
    messagingSenderId: "139169318796",
    appId: "1:139169318796:web:8247e98649ec8b9d5838a9",
    measurementId: "G-1NYKVDQJG1"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();