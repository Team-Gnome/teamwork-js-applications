import $ from 'jquery';
import 'toastrConfig';
import Lobby from 'lobby';
import * as data from 'data';
import { navigo } from 'router';
import { firebaseDb as db } from 'firebaseConfig';
import userAuthentificator from 'userAuthentificator';
import * as loadingScreenHandler from 'loadingScreenHandler';
import * as inputDataHandler from 'inputDataHandler';

const events = {
    register: () => {
        $('#send-btn-register').click(() => {
            userAuthentificator.registerUser()
                .then(() => {
                    navigo.router.navigate('#/user');
                    toastr.success('Your registration is successful.')
                });
        });
    },
    signin: () => {
        $('#send-sign-in-btn')
            .click(() => {
                const password = $('#inputPassword').val();
                const email = $('#inputEmail').val();

                userAuthentificator.signIn(email, password)
                    .then(() => {
                        loadingScreenHandler.initContentChange()
                            .then((uid) => {
                                navigo.router.navigate('#/user');
                                toastr.success('You have successfully logged in.')
                            });
                    });
            });
    },
    signout: () => {
        $('#sign-in-btn').click(() => {
            if ($('#sign-in-btn').text() === 'Sign out') {
                userAuthentificator.signOut()
                toastr.info('Logged out.')
            };
        });
    },
    createLobby: () => {
        $('#create-lobby-btn').click(() => {
            const uid = localStorage['authkey'];
            const lobbyInputData = inputDataHandler.getLobbyInputData();

            return db.ref('/users/' + uid)
                .once('value', function (snapshot) {
                    const user = snapshot.val();

                    const lobby = new Lobby(
                        user._username,
                        lobbyInputData.lobbyname,
                        lobbyInputData.sport,
                        lobbyInputData.location,
                        lobbyInputData.datetime,
                        lobbyInputData.mode);

                    data.addNewLobbyInDatabase(lobby);
                    data.addCreatedLobbyInUserDatabase(lobby);
                })
                .then(() => {
                    navigo.router.navigate('#/joinLobby');
                    toastr.success('You have successfully created your lobby.')
                })
        });
    },
    joinLobby: () => {
        $('.join-lobby-btn').click((ev) => {
            const $target = $(ev.target);
            const lobbyName = $target
                .parent()
                .find('#lobbyname')
                .text();

            const authorName = $target
                .parent()
                .find('#authorname')
                .text();

            data.getData(`lobbies`)
                .then((lobbies) => {
                    lobbies = Object.values(lobbies);

                    function findByNameAndAuthor(lobby) {
                        return lobby._lobbyname === lobbyName
                            && lobby._author === authorName;
                    };

                    const lobby = lobbies.find(findByNameAndAuthor);

                    return lobby;
                })
                .then((lobby) => {
                    data.addJoinedLobbyInUserDatabase(lobby);
                })
                .then(() => {
                    toastr.success('The lobby is added in your lobbies.')
                    $target.addClass('disabled');
                    $target.addClass('btn-success');
                    $target.text('Joined');
                    $target.removeClass('btn-primary');
                });
        });
    },
    leaveLobby: () => {
        $('.leave-lobby-btn').click((ev) => {
            const uid = localStorage['authkey'];
            const $target = $(ev.target);

            const parentNode = $target
                .parent()

            const lobbyName = parentNode
                .find('#lobbyname')
                .text();

            const authorName = parentNode
                .find('#authorname')
                .text();

            data.getData(`users/${uid}/joinedLobbies`)
                .then((lobbies) => {
                    lobbies = Object.values(lobbies);

                    function findByNameAndAuthor(lobby) {
                        return lobby._lobbyname === lobbyName
                            && lobby._author === authorName;
                    };

                    const lobby = lobbies.find(findByNameAndAuthor);

                    return lobby;
                })
                .then((lobby) => {
                    data.deleteJoinedLobbyFromUserDatabase(lobby)
                        .then((callback) => {
                            callback();
                        })
                        .then(() => {
                            toastr.success('The lobby is removed from your lobbies.')
                            parentNode.remove();
                        })
                })
        });
    },
    deleteLobby: () => {
        $('.delete-lobby-btn').click((ev) => {
            const uid = localStorage['authkey'];
            const $target = $(ev.target);

            const parentNode = $target
                .parent()

            const lobbyName = parentNode
                .find('#lobbyname')
                .text();

            const authorName = parentNode
                .find('#authorname')
                .text();

            data.getData(`users/${uid}/createdLobbies`)
                .then((lobbies) => {
                    lobbies = Object.values(lobbies);

                    function findByNameAndAuthor(lobby) {
                        return lobby._lobbyname === lobbyName
                            && lobby._author === authorName;
                    };

                    const lobby = lobbies.find(findByNameAndAuthor);

                    return lobby;
                })
                .then((lobby) => {
                    data.deleteLobbyFromDatabase(lobby)
                        .then((callback) => {
                            callback();
                        });
                    data.deleteCreatedLobbyFromUserDatabase(lobby)
                        .then((callback) => {
                            callback();
                        })
                        .then(() => {
                            toastr.success('The lobby is deleted.');
                            parentNode.remove();
                        });
                });
        });
    },
    joinEvent: () => {
        $('.join-event-btn').click((ev) => {
            const $target = $(ev.target);

            const parentNode = $target
                .parent()

            const eventName = parentNode
                .find('#eventname')
                .text();

            data.getData(`events`)
                .then((events) => {
                    events = Object.values(events);

                    function findByName(event) {
                        return event._name === eventName;
                    };

                    const event = events.find(findByName);
                    return event;
                })
                .then((event) => {
                    data.addJoinedEventInUserDatabase(event);
                })
                .then(() => {
                    toastr.success('The event is successfully added.')
                    $target.addClass('disabled');
                    $target.addClass('btn-success');
                    $target.text('Joined');
                    $target.removeClass('btn-primary');
                });
        });
    },
    leaveEvent: () => {
        $('.leave-event-btn').click((ev) => {
            const uid = localStorage['authkey'];
            const $target = $(ev.target);

            const parentNode = $target
                .parent()

            const eventName = parentNode
                .find('#eventname')
                .text();

            data.getData(`users/${uid}/joinedEvents`)
                .then((events) => {
                    events = Object.values(events);

                    function findByName(event) {
                        return event._name === eventName
                    };

                    const event = events.find(findByName);

                    return event;
                })
                .then((event) => {
                    data.deleteJoinedEventFromUserDatabase(event)
                        .then((callback) => {
                            callback();
                        })
                        .then(() => {
                            toastr.success('The event is successfully removed.')
                            parentNode.remove();
                        })
                });
        });
    }
};

export default events;