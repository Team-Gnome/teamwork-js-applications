import loadTemplate from 'templates';

const $root = $('#root');

export function loadHandlebars(params) {
    loadTemplate('notFound')
        .then(template => {
            $root.html(template);
        });
}
