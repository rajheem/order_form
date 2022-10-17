import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

let firebaseApp=firebase.initializeApp({
        apiKey: "AIzaSyApWaSytdUchUd7bY2Cvtd2XQycRMbxP80",
        authDomain: "replenishment-order-form.firebaseapp.com",
        projectId: "replenishment-order-form",
        storageBucket: "replenishment-order-form.appspot.com",
        messagingSenderId: "448774367372",
        appId: "1:448774367372:web:d9de92dfbe50389524b3a9"
})

const db=firebaseApp.firestore();

export {db}

