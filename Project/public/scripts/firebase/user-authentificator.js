import { navigo } from 'router';
import * as firebase from 'firebase';

import User from 'user';
import * as data from 'data';
import * as inputDataHandler from 'inputDataHandler';
import * as signInUserController from 'signInUserController';
import * as registerUserController from 'registerUserController';

export default class UserAuthentificator {
    static currentUserData() {
        const email = firebase.auth().currentUser.email;
        const uid = firebase.auth().currentUser.uid;

        return {
            email: email,
            uid: uid,
        };
    };

    static registerUser(onSuccess, onError) {
        const userData = inputDataHandler.getUserInputData();

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
                    };
                };
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

                if (onSuccess) {
                    onSuccess();
                };
            });
    };

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => alert(`Verification e-mail sent to ${User.currentUser().email}`))
            .catch(() => alert('Something went wrong. Please try again!'));
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
                };
            });
    };
};