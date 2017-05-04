import loadTemplate from 'templates';
import userAuthentificator from 'userAuthentificator';
import * as data from 'data';

const $root = $('#root');

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        data.getAllLobies()
            .then((lobbies) => {
                lobbies = Object.values(lobbies);

                const lobbiesObj = {
                    lobbies: lobbies
                };

                return lobbiesObj;
            })
            .then((lobbies) => {
                resolve(loadTemplate('join-lobby', lobbies)
                    .then(template => {
                        $root.html(template);
                    }));
            });
    });
};
