import {
    load as loadTemplate
} from 'templates';

import {
    addNewUserInDatabase
} from 'data';

import User from 'userAuthentication';

const $root = $('#root');

function get(params) {
    loadTemplate('register')
        .then(template => {
            $root.html(template());
        });
}

function registerUser() {
    const username = $('#input-username').val();
    const firstName = $('#input-firstname').val();
    const lastName = $('#input-lastname').val();
    const password = $('#input-password').val();
    const email = $('#input-email').val();

    User.register(email, password);

    // addNewUserInDatabase(username, firstName, lastName, password, email)
    //     .then( /* */ );
};

export {
    get,
    registerUser
}