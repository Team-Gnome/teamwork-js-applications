import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function get(params) {
    loadTemplate('test')
        .then(template => {
            $appContainer.html(template());
        });
}   