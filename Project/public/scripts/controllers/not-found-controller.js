import loadTemplate from 'templates';

const $root = $('#root');

export function loadHandlebars(params) {
    loadTemplate('not-found')
        .then(template => {
            $root.html(template);
        });
};
