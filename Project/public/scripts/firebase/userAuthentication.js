import * as firebase from 'firebase';
import { navigo } from 'router';
import * as signInUserController from 'signInUserController';

export default class User {

    static currentUser() {
        return {
            email: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid
        }
    };

    static registerUser(email, password, onSuccess, onError) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (onError) {
                    onError(error);
                } else {
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                }
            })
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password);
                if (onSuccess) {
                    onSuccess();
                }
            });
    };

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => alert(`Verification e-mail sent to ${User.currentUser().email}`))
            .catch(() => alert('Something went wrong. Please try again!'));
    };

    static initAuthStatusChange() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const email = user.email;
                const emailVerified = user.emailVerified;

                $('#login-navbar-status').text(`You are currently logged with ${email}`);
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text('Sign out');

                if (!emailVerified) {
                    $('#verify-btn').removeClass('hidden');
                    $('#verify-btn').click(User.verifyAcocunt);
                }

                return this.currentUser();
            }
            else {
                $('#login-navbar-status').text('You are not currently logged in.');
                $('#sign-in-btn').text('Sign in');
                $('#register-btn').removeClass('hidden');
            }

            $('#sign-in-btn').click(() => {
                if ($('#sign-in-btn').text() === 'Sign out') {
                    User.signOut();
                }
            });
        });
    };

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => alert(`Verification e-mail sent to ${User.currentUser.email}`));
    };

    static signOut() {
        firebase.auth().signOut()
            .catch(() => alert('Something went wrong. Please try again!'));
    };

    static signIn(email, password, onSuccess, onError) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                if (onError) {
                    onError(error);
                } else {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                }
            })
            .then(() => {
                if (onSuccess) {
                    onSuccess();
                }
            });
    };
}