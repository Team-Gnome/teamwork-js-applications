import loadTemplate from 'templates';
import UserAuthentificatior from 'userAuthentificatior';
import { firebaseDb as db } from 'firebaseConfig';
import * as data from 'data';

const $root = $('#root');

export function getLobbyInputData() {
    const lobbyname = $('#input-lobbyname').val();
    const sport = $('#sport-select').find(":selected").text();
    const location = $('#input-location').val();
    const datetime = $('#input-datetime').val();
    const mode = $('input[name="options"]:checked').val();

    return {
        lobbyname: lobbyname,
        sport: sport,
        location: location,
        datetime: datetime,
        mode: mode
    };
};

export function loadHandlebars(params) {
    loadTemplate('lobby-creation')
        .then(template => {
            $root.html(template);

            UserAuthentificatior.initAuthStatusChange();

            $('#sign-in-btn').click(() => {
                if ($('#sign-in-btn').text() === 'Sign out') {
                    UserAuthentificatior.signOut();
                };
            });

            $('#create-lobby-btn').click(() => {
                const userId = UserAuthentificatior.currentUserData().uid;

                return db.ref('/users/' + userId)
                    .once('value')
                    .then(function (snapshot) {
                        const userDataJson = snapshot.val().userData;
                        const userDataObj = JSON.parse(userDataJson);

                        data.addNewLobbyInDatabase(userDataObj.username);
                    });
            });
        })
        .then(() => {
            setTimeout(() => {
                $root.removeClass('hidden');
            }, 500)
        });
};
