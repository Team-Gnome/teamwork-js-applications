import { firebaseDb as db } from 'firebaseConfig';
import { getLobbyInputData } from 'lobbyCreationController';
import Lobby from 'lobby';

const defaultRef = db.ref();

export function addNewUserInDatabase(uid, user) {

    const userObj = {};
    const usersRef = defaultRef.child('users');

    userObj[uid] = {
        user
    };

    return new Promise((resolve, reject) => {
        usersRef.set(userObj);
    });
};

export function addNewLobbyInDatabase(username) {

    const lobbyInputData = getLobbyInputData();
    const lobby = new Lobby(username, lobbyInputData.lobbyname, lobbyInputData.sport, lobbyInputData.location, lobbyInputData.datetime, lobbyInputData.mode);

    const lobbiesRef = defaultRef.child('lobbies');

    return new Promise((resolve, reject) => {
        lobbiesRef.push(lobby);
    });
};

export function getAllLobies() {
    return new Promise((resolve, reject) => {
        db.ref('/lobbies')
            .once('value')
            .then(function (snapshot) {
                const lobbies = snapshot.val();

                resolve(lobbies);
            });
    });
}