import firebase from 'firebase'; 
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyDvjfqifSx54f9XrxqfKjRrRMpVYot_OT8",
    authDomain: "booksanta-b2fd5.firebaseapp.com",
    projectId: "booksanta-b2fd5",
    storageBucket: "booksanta-b2fd5.appspot.com",
    messagingSenderId: "526137870691",
    appId: "1:526137870691:web:1c66b6e98a2198e1a22b56"
  };
firebase.initializeApp(firebaseConfig); 
export default firebase.firestore();