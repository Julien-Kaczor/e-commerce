    import firebase from 'firebase/app';
    import 'firebase/storage';

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDIi1lMiRiWPV1MAyWjaluItDG8Q91RDSo",
        authDomain: "e-commerce-181c0.firebaseapp.com",
        databaseURL: "https://e-commerce-181c0.firebaseio.com",
        projectId: "e-commerce-181c0",
        storageBucket: "e-commerce-181c0.appspot.com",
        messagingSenderId: "258585138015",
        appId: "1:258585138015:web:fb06f4251267d4ab"};
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const storage = firebase.storage();

    export {
        storage, firebase as default
    }