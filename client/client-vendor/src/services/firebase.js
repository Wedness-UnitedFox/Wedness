import React from 'react';
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPHflOg7pyuoA8MR73FESclaDIFy-Zif4",
  authDomain: "wedness-vendor-client.firebaseapp.com",
  databaseURL: "https://wedness-vendor-client.firebaseio.com",
  projectId: "wedness-vendor-client",
  storageBucket: "wedness-vendor-client.appspot.com",
  messagingSenderId: "252074909461",
  appId: "1:252074909461:web:b6511a56744a6c22c4931c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase