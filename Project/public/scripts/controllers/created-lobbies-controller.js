import * as data from 'data';
import loadTemplate from 'templates';

const $root = $('#root');
const uid = localStorage['authkey'];
let cachedCreatedLobbies = [];

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        data.getAllLobies(`/users/${uid}/createdLobbies`)
            .then((lobbies) => {
                if (lobbies === null) {
                    resolve(loadTemplate('created-lobbies')
                        .then(template => {
                            $root.html(template);
                        }));
                }
                else {
                    lobbies = Object.values(lobbies);

                    const lobbiesObj = {
                        lobbies: lobbies
                    };

                    cachedCreatedLobbies = lobbies.slice();

                    return lobbiesObj;
                };
            })
            .then((lobbies) => {
                resolve(loadTemplate('created-lobbies', lobbies)
                    .then(template => {
                        $root.html(template);
                    }));
            });
    });
};

export {
    cachedCreatedLobbies
};