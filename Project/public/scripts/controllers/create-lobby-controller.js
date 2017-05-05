import loadTemplate from 'templates';

const $root = $('#root');

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('lobby-creation')
            .then(template => {
                $root.html(template);
            }));
    });
};
