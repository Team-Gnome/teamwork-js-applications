import * as firebase from 'firebase';
import { navigo } from 'router';

export function initContentChange() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const email = user.email;
                const emailVerified = user.emailVerified;

                $('.flex-column').removeClass('hidden');
                $('#login-navbar-status').html(`You are currently logged with <strong><a href="#/user">${email}</a></strong>`);
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text('Sign out');
                resolve(user.uid);
            }
            else {
                $('#moto').removeClass('hidden');
                $('#register-btn').removeClass('hidden');
                $('#login-navbar-status').html('You are not currently logged in.');
                $('#sign-in-btn').text('Sign in');
            };
        });
    });
};

export function showContent() {
    $('#root').removeClass('hidden');
};
