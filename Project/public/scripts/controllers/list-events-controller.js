import Event from 'event';
import * as data from 'data';
import loadTemplate from 'templates';

const $root = $('#root');

function initializeDbWithEvents() {
    const firstEvent = new Event(
        'Event_One',
        'Tennis',
        'Somewhere',
        'Now',
        '2 hours',
        'Single',
        'Clutch or kick',
        'No money, no prize');

    const secondEvent = new Event('Event_Two',
        'Volleyball',
        'Pernik',
        'Tomorrow',
        'All day',
        'Team',
        'Escape from gypsies',
        'You can go home');

    data.addEventInDatabase(firstEvent);
    data.addEventInDatabase(secondEvent);

};

export function loadHandlebars(params) {
    return new Promise((resolve, reject) => {
        data.getAlreadyJoinedEvents()
            .then((alreadyJoinedEvents) => {
                data.getData(`/events`)
                    .then((events) => {
                        if (events === null) {
                            //initializeDbWithEvents();
                        }
                        else {
                            events = Object.values(events);

                            function removeDuplicates(alreadyJoinedEvents, events) {
                                for (let i = 0, len = alreadyJoinedEvents.length; i < len; i += 1) {
                                    for (let j = 0, len2 = events.length; j < len2; j += 1) {
                                        if (alreadyJoinedEvents[i]._name === events[j]._name) {
                                            events.splice(j, 1);
                                            len2 = events.length;
                                        }
                                    }
                                }
                            };

                            removeDuplicates(alreadyJoinedEvents, events);

                            const eventsObj = {
                                events: events
                            };

                            return eventsObj;
                        };
                    })
                    .then((events) => {
                        resolve(loadTemplate('list-events', events)
                            .then(template => {
                                $root.html(template);
                            }));
                    });
            })
    });
};
