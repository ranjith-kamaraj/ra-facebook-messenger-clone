import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyALrM3YnRqnsMyyT5Cb8MOmne8hhLlMN10",
    authDomain: "ra-facebook-messenger-clone.firebaseapp.com",
    databaseURL: "https://ra-facebook-messenger-clone.firebaseio.com",
    projectId: "ra-facebook-messenger-clone",
    storageBucket: "ra-facebook-messenger-clone.appspot.com",
    messagingSenderId: "194868236730",
    appId: "1:194868236730:web:4564de56911413a1334d83"
});

const database = firebaseApp.firestore();

export default database;