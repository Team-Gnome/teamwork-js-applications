import * as firebase from 'firebase';

export function initContentChange() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const email = user.email;
                const emailVerified = user.emailVerified;

                $('#login-navbar-status').html(`You are currently logged with <a href="#/user">${email}</a>`);
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text('Sign out');

                // if (!emailVerified) {
                //     $('#verify-btn').removeClass('hidden');
                //     $('#verify-btn').click(User.verifyAcocunt);
                // }

                resolve(user.uid);
            }
            else {
                $('#login-navbar-status').text('You are not currently logged in.');
                $('#sign-in-btn').text('Sign in');
                $('#register-btn').removeClass('hidden');
            };
        });
    });
};

export function showContent() {
    $('#root').removeClass('hidden');
};