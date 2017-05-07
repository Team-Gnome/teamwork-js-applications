import * as data from 'data';
import loadTemplate from 'templates';

const $root = $('#root');

export function loadHandlebars(params) {
    const uid = localStorage['authkey'];
    return new Promise((resolve, reject) => {
        data.getData(`/users/${uid}/createdLobbies`)
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
