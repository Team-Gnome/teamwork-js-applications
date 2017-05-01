import loadTemplate from 'templates';
import { addNewUserInDatabase } from 'data';
import User from 'userAuthentication';

const $root = $('#root');

export function registerUser() {
    const username = $('#input-username').val();
    const firstName = $('#input-firstname').val();
    const lastName = $('#input-lastname').val();
    const password = $('#input-password').val();
    const email = $('#input-email').val();

    User.registerUser(email, password);

    // addNewUserInDatabase(username, firstName, lastName, password, email)
    //     .then( /* */ );
};

export function loadHandlebars(params) {
    loadTemplate('register')
        .then(template => {
            $root.html(template)
        })
        .then(() => {
            $('#send-btn-register').click(() => {
                registerUser();
            });
        });
}
