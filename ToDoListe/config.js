import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCsgn1nP17WsUS70JFFG0lDjm4T0Sjl2ek",
    authDomain: "todolist-e15b1.firebaseapp.com",
    projectId: "todolist-e15b1",
    storageBucket: "todolist-e15b1.appspot.com",
    messagingSenderId: "770955815726",
    appId: "1:770955815726:web:6c5deeab18654c5c9ee8bf"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}