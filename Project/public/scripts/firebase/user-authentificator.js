import User from 'user';
import * as data from 'data';
import { navigo } from 'router';
import * as firebase from 'firebase';
import * as inputDataHandler from 'inputDataHandler';
import * as signInUserController from 'signInUserController';
import * as registerUserController from 'registerUserController';

const LOCALSTORAGE_AUTH_KEY_NAME = 'authkey';

export default class UserAuthentificator {
    static currentUserData() {
        const email = firebase.auth().currentUser.email;
        const uid = firebase.auth().currentUser.uid;

        return {
            email: email,
            uid: uid,
        };
    };

    static registerUser() {
        const userData = inputDataHandler.getUserInputData();
        const userEmail = userData.email;
        const userPassword = userData.password;

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then(() => {
                this.signIn(userEmail, userPassword)
                    .then(() => {
                        const user = new User(userData.username, userData.firstname, userData.lastname, userData.email);
                        data.addNewUserInDatabase(user);
                    })
                    .then(() => {
                        navigo.router.navigate('#/user');
                        toastr.success('Your registration is successful.')
                    });
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
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
        firebase.auth().signOut()
            .catch(() => toastr.warning('Something went wrong. Please try again!'));
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
                localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, this.currentUserData().uid);
            });
    };
};