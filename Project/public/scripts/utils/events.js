import { navigo } from 'router';

import Lobby from 'lobby';
import * as data from 'data';
import { firebaseDb as db } from 'firebaseConfig';
import userAuthentificator from 'userAuthentificator';
import * as loadingScreenHandler from 'loadingScreenHandler';
import * as inputDataHandler from 'inputDataHandler';

import * as listLobbiesController from 'listLobbiesController';
import * as joinedLobbiesController from 'joinedLobbiesController';
import * as createdLobbiesController from 'createdLobbiesController';

const events = {
    register: () => {
        $('#send-btn-register').click(() => {
            userAuthentificator.registerUser();
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
                            });
                    });
            });
    },
    signout: () => {
        $('#sign-in-btn').click(() => {
            if ($('#sign-in-btn').text() === 'Sign out') {
                userAuthentificator.signOut();
            };
        });
    },
    createLobby: () => {
        $('#create-lobby-btn').click(() => {
            const lobbyInputData = inputDataHandler.getLobbyInputData();
            const uid = localStorage['authkey'];

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
                })
        });
    },
    joinLobby: () => {
        $('.join-lobby-btn').click((ev) => {
            const $target = $(ev.target);
            const lobbyName = $target
                .parent()
                .children('.d-flex')
                .children('.mb-1')
                .text();

            function findByName(lobby) {
                return lobby._lobbyname === lobbyName;
            };

            const lobby = listLobbiesController.cachedLobbies.find(findByName);

            data.addJoinedLobbyInUserDatabase(lobby);

            $target.addClass('disabled');
            $target.addClass('btn-success');
            $target.text('Joined');
            $target.removeClass('btn-primary');
        });
    },
    leaveLobby: () => {
        $('.leave-lobby-btn').click((ev) => {
            const $target = $(ev.target);
            const lobbyName = $target
                .parent()
                .children('.d-flex')
                .children('.mb-1')
                .text();

            function findByName(lobby) {
                return lobby._lobbyname === lobbyName;
            };

            const lobby = joinedLobbiesController.cachedJoinedLobbies.find(findByName);

            data.deleteJoinedLobbyFromUserDatabase(lobby)
                .then((callback) => {
                    callback();
                })
                .then(() => {
                    navigo.router.navigate('#/joinedLobbies');
                })
        });
    },
    deleteLobby: () => {
        $('.delete-lobby-btn').click((ev) => {
            const $target = $(ev.target);
            const lobbyName = $target
                .parent()
                .children('.d-flex')
                .children('.mb-1')
                .text();

            function findByName(lobby) {
                return lobby._lobbyname === lobbyName;
            };

            const lobby = createdLobbiesController.cachedCreatedLobbies.find(findByName);

            data.deleteLobbyFromDatabase(lobby)
                .then((callback) => {
                    callback();
                });

            data.deleteCreatedLobbyFromUserDatabase(lobby)
                .then((callback) => {
                    callback();
                })
                .then(() => {
                    navigo.router.navigate('/createdLobbies');
                });
        });
    }
};

export default events;