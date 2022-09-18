import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: "AIzaSyBf4TkmpUXFPlEwWU1Um-Khb26EndsO87o",
  authDomain: "caffeineblog-c510a.firebaseapp.com",
  projectId: "caffeineblog-c510a",
  storageBucket: "caffeineblog-c510a.appspot.com",
  messagingSenderId: "921466992086",
  appId: "1:921466992086:web:271594f39e468901286077",
  measurementId: "G-V7YLS05GPC"
});

const fb = firebase;

export default fb;