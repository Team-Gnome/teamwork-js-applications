import loadTemplate from 'templates';
import * as data from 'data';

const $root = $('#root');

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        data.getForbidenLobbies()
            .then((forbiddenLobbies) => {
                data.getData('/lobbies')
                    .then((lobbies) => {
                        if (lobbies === null) {
                            resolve(loadTemplate('list-lobbies')
                                .then(template => {
                                    $root.html(template);
                                }));
                        }
                        else {
                            lobbies = Object.values(lobbies);

                            function removeDuplicates(forbiddenLobbies, lobbies) {
                                for (let i = 0, len = forbiddenLobbies.length; i < len; i += 1) {
                                    for (let j = 0, len2 = lobbies.length; j < len2; j += 1) {
                                        if (forbiddenLobbies[i]._lobbyname === lobbies[j]._lobbyname
                                            && forbiddenLobbies[i]._author === lobbies[j]._author) {
                                            lobbies.splice(j, 1);
                                            len2 = lobbies.length;
                                        }
                                    }
                                }
                            };

                            removeDuplicates(forbiddenLobbies, lobbies);

                            const lobbiesObj = {
                                lobbies: lobbies
                            };

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
    });
};
