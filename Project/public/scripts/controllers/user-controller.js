import * as data from 'data';
import loadTemplate from 'templates';

const $root = $('#root');

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        const uid = localStorage['authkey'];
        data.getData(`/users/${uid}`)
            .then((user) => {
                resolve(loadTemplate('user', user)
                    .then(template => {
                        $root.html(template);
                    }));
            })
    });
};
