import loadTemplate from 'templates';
import UserAuthentificatior from 'userAuthentificatior';

const $root = $('#root');

export function getUserInputData() {
    const username = $('#input-username').val();
    const firstname = $('#input-firstname').val();
    const lastname = $('#input-lastname').val();
    const password = $('#input-password').val();
    const email = $('#input-email').val();

    return {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email
    };
};

export function loadHandlebars(params) {
    loadTemplate('register')
        .then(template => {
            $root.html(template)

            UserAuthentificatior.initAuthStatusChange();
        })
        .then(() => {
            $('#send-btn-register').click(() => {
                UserAuthentificatior.registerUser();
            });
        })
        .then(() => {
            setTimeout(() => {
                $root.removeClass('hidden');
            }, 500)
        });
};
