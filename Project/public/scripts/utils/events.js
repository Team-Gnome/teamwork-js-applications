import { navigo } from 'router';

import * as data from 'data';
import { firebaseDb as db } from 'firebaseConfig';
import userAuthentificator from 'userAuthentificator';
import * as loadingScreenHandler from 'loadingScreenHandler';

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
            const userId = userAuthentificator.currentUserData().uid;

            return db.ref('/users/' + userId)
                .once('value')
                .then(function (snapshot) {
                    const user = snapshot.val();

                    data.addNewLobbyInDatabase(user._username)
                })
                .then(() => {
                    navigo.router.navigate('#/joinLobby');
                })
                .then(() => {
                    location.reload();
                });
        });
    },
    joinLobby: () => {
        $('#join-lobby-btn').click(() => {
            console.log(1);
        });
    }
};

export default events;