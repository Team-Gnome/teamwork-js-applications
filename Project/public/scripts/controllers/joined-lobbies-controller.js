import loadTemplate from 'templates';
import * as data from 'data';

const $root = $('#root');

export function loadHandlebars(params) {
    const uid = localStorage['authkey'];
    return new Promise((resolve, reject) => {
        data.getData(`/users/${uid}/joinedLobbies`)
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

                    return lobbiesObj;
                };
            })
            .then((lobbies) => {
                resolve(loadTemplate('joined-lobbies', lobbies)
                    .then(template => {
                        $root.html(template);
                    }));
            });
    });
};
