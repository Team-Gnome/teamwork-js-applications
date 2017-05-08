import * as data from 'data';
import loadTemplate from 'templates';

const $root = $('#root');

export function loadHandlebars(params) {
    const uid = localStorage['authkey'];
    return new Promise((resolve, reject) => {
        data.getData(`/users/${uid}/joinedEvents`)
            .then((events) => {
                if (events === null) {
                    resolve(loadTemplate('joined-events')
                        .then(template => {
                            $root.html(template);
                        }));
                }
                else {
                    events = Object.values(events);

                    const eventsObj = {
                        events: events
                    };

                    return eventsObj;
                };
            })
            .then((events) => {
                resolve(loadTemplate('joined-events', events)
                    .then(template => {
                        $root.html(template);
                    }));
            });
    });
};
