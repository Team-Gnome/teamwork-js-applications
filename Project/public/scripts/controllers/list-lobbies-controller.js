import loadTemplate from 'templates';
import userAuthentificator from 'userAuthentificator';
import * as data from 'data';

const $root = $('#root');

let cachedLobbies = [];

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        data.getAllLobies('/lobbies')
            .then((lobbies) => {
                if (lobbies === null) {
                    resolve(loadTemplate('joined-lobbies')
                        .then(template => {
                            $root.html(template);
                        }));
                }
                else {
                    lobbies = Object.values(lobbies);

                    const lobbiesObj = {
                        lobbies: lobbies
                    };
                    cachedLobbies = lobbies.slice();

                    return lobbiesObj;
                };
            })
            .then((lobbies) => {
                resolve(loadTemplate('list-lobbies', lobbies)
                    .then(template => {
                        $root.html(template);
                    }));
            });
    });
};

export {
    cachedLobbies
};
