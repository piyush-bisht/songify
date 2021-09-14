import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";

const config ={
    apiKey: "AIzaSyDDbmo5GRLP3H8TTJcFiTUCHkgTDH9qHMI",
    authDomain: "songify-9e677.firebaseapp.com",
    databaseURL: "https://songify-9e677-default-rtdb.firebaseio.com",
    projectId: "songify-9e677",
    storageBucket: "songify-9e677.appspot.com",
    messagingSenderId: "1046063845211",
    appId: "1:1046063845211:web:2360ca2e9f63ec3ffbd47e",
    measurementId: "G-S0YYR7F2WZ"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();