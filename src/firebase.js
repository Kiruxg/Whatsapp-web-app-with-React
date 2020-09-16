import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBwrU7xVjEI5UkcYiiI34BQv04yvs7Whck",
  authDomain: "whatsapp-mern-b640a.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-b640a.firebaseio.com",
  projectId: "whatsapp-mern-b640a",
  storageBucket: "whatsapp-mern-b640a.appspot.com",
  messagingSenderId: "952966119717",
  appId: "1:952966119717:web:653918c197cf1afb459acc",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
