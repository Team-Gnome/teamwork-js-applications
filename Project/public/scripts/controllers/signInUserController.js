import loadTemplate from 'templates';
import UserAuthentificatior from 'userAuthentificatior';
import { navigo } from 'router';

const $root = $('#root');

export function signIn() {
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();

    return new Promise((resolve, reject) => {
        resolve(UserAuthentificatior.signIn(email, password))
    });
}

export function loadHandlebars(params) {
    loadTemplate('signIn')
        .then(template => {

            $root.html(template);

            $('#send-sign-in-btn').click(() => {
                signIn()
                    .then(() => {
                        UserAuthentificatior.initAuthStatusChange()
                            .then((uid) => {
                                navigo.router.navigate('#/user');
                            });
                    });
            });
        })
        .then(() => {
            setTimeout(() => {
                $root.removeClass('hidden');
            }, 500)
        });
}