import * as firebase from 'firebase';

export default class User {

    static currentUser() {
        return firebase.auth().currentUser;
    }

    static register(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            }
            else {
                alert(errorMessage);
            }
            console.log('auth request sent')
        })
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password);
            });
    }

    static initAuthStatusChange() {
        firebase.auth().onAuthStateChanged(function (user) {
            $('#verify-btn').addClass('hidden');
            if (user) {
                // User is signed in.
                const email = user.email;
                const emailVerified = user.emailVerified;

                $('#login-navbar-text').text('Signed in as');
                $('#login-navbar-link').text(`${email}`);
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text('Sign out');

                if (!emailVerified) {
                    $('#verify-btn').removeClass('hidden');
                }
            }
            else {
                $('#login-navbar-text').text('Signed out');
                $('#sign-in-btn').text('Sign in');
                $('#register-btn').removeClass('hidden');
            }
        });
    }

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => alert(`Verification e-mail sent to ${User.currentUser.email}`));
    }

    static signOut() {
        firebase.auth().signOut();
    }

    static signIn(email, password) {
        console.log('here');
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            //handle errors
        });
    }
}