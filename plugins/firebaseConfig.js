import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyBda1ADWAUrviIirvtI4YuHvZbzI6JrCc4",
    authDomain: "movieticket-37e01.firebaseapp.com",
    databaseURL: "https://movieticket-37e01.firebaseio.com",
    projectId: "movieticket-37e01",
    storageBucket: "movieticket-37e01.appspot.com",
    messagingSenderId: "879600586555",
    appId: "1:879600586555:web:a0bb50a7862b122c99b11e",
    measurementId: "G-YTRGK9HVJD"
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const storageRef = firebase.storage().ref();
export const imagesRef = storageRef.child('images/');
