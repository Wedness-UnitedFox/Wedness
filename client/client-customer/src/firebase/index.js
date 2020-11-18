
import firebase from 'firebase'; 
import 'firebase/firestore'

export const config = {
    apiKey: "AIzaSyD6WKr4nBqVaGpVhjBEQ2v1FEDqWuLheko",
    authDomain: "letscodescv-5dbc0.firebaseapp.com",
    databaseURL: "https://letscodescv-5dbc0.firebaseio.com",
    projectId: "letscodescv-5dbc0",
    storageBucket: "letscodescv-5dbc0.appspot.com",
    messagingSenderId: "313319506594"
}
class FirebaseSDK {
    constructor() {
        if (!firebase.apps.length) { //avoid re-initializing
            firebase.initializeApp({
                apiKey: "AIzaSyDPHflOg7pyuoA8MR73FESclaDIFy-Zif4",
                authDomain: "wedness-vendor-client.firebaseapp.com",
                databaseURL: "https://wedness-vendor-client.firebaseio.com",
                projectId: "wedness-vendor-client",
                storageBucket: "wedness-vendor-client.appspot.com",
                messagingSenderId: "252074909461",
                appId: "1:252074909461:web:b6511a56744a6c22c4931c"
            });
        }
    }

    login = async (user, success_callback, failed_callback) => {
        await firebase.auth()
            // .createUserWithEmailAndPassword(user.email, user.password)
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }

    register = async (user, success_callback, failed_callback) => {
        await firebase.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                success_callback('User account created & signed in!') 
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    failed_callback
                }

                if (error.code === 'auth/invalid-email') {
                    failed_callback
                }

                console.error(error);
            }); 
    }

    onLogout = user => {
        firebase.auth().signOut().then(function () {
            console.log("Sign-out successful.");
        }).catch(function (error) {
            console.log("An error happened when signing out");
        });
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    get displayName() {
        return (firebase.auth().currentUser || {}).displayName;
    }
    get email() {
        return (firebase.auth().currentUser || {}).email;
    }

    chatsRef = () => {
        const db = firebase.firestore()
        return db.collection('chats')
    }
    invitationRef = () => {
        const db = firebase.firestore()
        return db.collection('invitations')
    }

}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK; 