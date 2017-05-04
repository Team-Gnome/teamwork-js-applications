import loadTemplate from 'templates';
import UserAuthentificatior from 'userAuthentificatior';
import * as data from 'data';

const $root = $('#root');

export function loadHandlebars(params) {

    data.getAllLobies()
        .then((lobbies) => {
            lobbies = Object.values(lobbies)

            const lobbiesObj = {
                lobbies: lobbies
            };

            console.log(lobbies);
            console.log(lobbiesObj);

            loadTemplate('join-lobby', lobbiesObj)
                .then(template => {
                    $root.html(template);
                });

            UserAuthentificatior.initAuthStatusChange();

            $('#sign-in-btn').click(() => {
                if ($('#sign-in-btn').text() === 'Sign out') {
                    UserAuthentificatior.signOut();
                }
            });

            setTimeout(() => {
                $root.removeClass('hidden');
            }, 500)
        });
};
