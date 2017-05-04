import loadTemplate from 'templates';
import userAuthentificator from 'userAuthentificator';

const $root = $('#root');

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('register')
            .then(template => {
                $root.html(template)
            })
        );
    });
};
