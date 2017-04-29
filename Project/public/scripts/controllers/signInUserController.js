import {
    load as loadTemplate
} from 'templates';

import User from 'userAuthentication';

const $root = $('#root');

function get(params) {
    loadTemplate('signIn')
        .then(template => {
            $root.html(template());
        })
}

function signIn() {
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();

    User.signIn(email, password);
}

export {
    get,
    signIn
}