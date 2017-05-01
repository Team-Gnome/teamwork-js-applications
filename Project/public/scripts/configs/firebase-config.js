import * as firebase from 'firebase';

export const firebaseDb = (function () {
    const config = {
        apiKey: "AIzaSyCmLp7HdYLSZ2txUxwG9HOYz857-24CuEo",
        authDomain: "gnome-teamwork-e0bde.firebaseapp.com",
        databaseURL: "https://gnome-teamwork-e0bde.firebaseio.com",
        projectId: "gnome-teamwork-e0bde",
        storageBucket: "gnome-teamwork-e0bde.appspot.com",
        messagingSenderId: "1086114400704"
    };

    firebase.initializeApp(config);

    return firebase.database();
}());
