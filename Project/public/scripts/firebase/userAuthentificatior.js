import * as firebase from 'firebase';
import { navigo } from 'router';
import * as signInUserController from 'signInUserController';
import * as registerUserController from 'registerUserController';
import * as data from 'data';
import User from 'user';

export default class UserAuthentificatior {

    static currentUserData() {
        const email = firebase.auth().currentUser.email;
        const uid = firebase.auth().currentUser.uid;

        return {
            email: email,
            uid: uid,
        };
    };

    static registerUser(onSuccess, onError) {
        const userData = registerUserController.getUserInputData();

        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (onError) {
                    onError(error);
                }
                else {
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                }
            })
            .then(() => {
                let uid;
                firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
                    .then(() => {
                        uid = this.currentUserData().uid;
                    })
                    .then(() => {
                        const user = new User(userData.username, userData.firstname, userData.lastname, userData.email);
                        data.addNewUserInDatabase(uid, user);
                    })
                    .then(() => {
                        navigo.router.navigate('#/user');
                    });
                // .catch((error) => {

                // });

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
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const email = user.email;
                    const emailVerified = user.emailVerified;

                    $('#login-navbar-status').html(`You are currently logged with <a href="#/user">${email}</a>`);
                    $('#register-btn').addClass('hidden');
                    $('#sign-in-btn').text('Sign out');

                    if (!emailVerified) {
                        $('#verify-btn').removeClass('hidden');
                        $('#verify-btn').click(User.verifyAcocunt);
                    }

                    resolve(user.uid);
                }
                else {
                    $('#login-navbar-status').text('You are not currently logged in.');
                    $('#sign-in-btn').text('Sign in');
                    $('#register-btn').removeClass('hidden');
                }
            })
        })
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
        return firebase.auth().signInWithEmailAndPassword(email, password)
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