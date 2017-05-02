import loadTemplate from 'templates';
import UserAuthentificatior from 'userAuthentificatior';

const $root = $('#root');

export function loadHandlebars(params) {
    loadTemplate('home')
        .then(template => {
            $root.html(template);

            UserAuthentificatior.initAuthStatusChange();

            $('#sign-in-btn').click(() => {
                if ($('#sign-in-btn').text() === 'Sign out') {
                    UserAuthentificatior.signOut();
                }
            });
        })
        .then(() => {
            setTimeout(() => {
                $root.removeClass('hidden');
            }, 500)
        });
};
