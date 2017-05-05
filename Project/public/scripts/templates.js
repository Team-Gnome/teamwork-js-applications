import Handlebars from 'handlebars';

const cacheObj = {};

export default function loadTemplate(templateName, data) {
    return $.get(`templates/${templateName}.handlebars`)
        .then(function (src) {
            const compiledTemplate = Handlebars.compile(src)(data);
            return Promise.resolve(compiledTemplate);
        });
};