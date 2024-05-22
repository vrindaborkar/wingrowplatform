import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAUxdUdNhrl8BSz_4MxKa0d6FwiCfgMtUE",
    authDomain: "otp-demo-cc2a7.firebaseapp.com",
    projectId: "otp-demo-cc2a7",
    storageBucket: "otp-demo-cc2a7.appspot.com",
    messagingSenderId: "646152500375",
    appId: "1:646152500375:web:389ef29c749b662bd8e5d2"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // var auth = firebase.auth();
export default firebase