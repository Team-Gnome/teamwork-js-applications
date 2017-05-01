import loadTemplate from 'templates';
import User from 'userAuthentication';
import { navigo } from 'router';

const $root = $('#root');

export function signIn() {
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();

    User.signIn(email, password)
}

export function loadHandlebars(params) {
    loadTemplate('signIn')
        .then(template => {
            $root.html(template);
            User.initAuthStatusChange();

            $('#send-sign-in-btn').click(() => {
                signIn();

                setTimeout(() => {
                    navigo.router.navigate(`/user/${User.currentUser().uid}`);
                }, 500)
            });
        })
        .then(() => {
            setTimeout(() => {
                $root.removeClass('hidden');
            }, 500)
        });
}