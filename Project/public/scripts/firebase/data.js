import Lobby from 'lobby';
import { firebaseDb as db } from 'firebaseConfig';
import * as inputDataHandler from 'inputDataHandler';
import { getLobbyInputData } from 'createLobbyController';

const defaultRef = db.ref();

export function addNewUserInDatabase(uid, user) {

    const userObj = {};
    const usersRef = defaultRef.child('users/' + uid);

    return new Promise((resolve, reject) => {
        usersRef.set(user);
    });
};

export function addNewLobbyInDatabase(username) {

    const lobbyInputData = inputDataHandler.getLobbyInputData();
    const lobby = new Lobby(username, lobbyInputData.lobbyname, lobbyInputData.sport, lobbyInputData.location, lobbyInputData.datetime, lobbyInputData.mode);

    const lobbiesRef = defaultRef.child('lobbies');

    return new Promise((resolve, reject) => {
        resolve(lobbiesRef.push(lobby));
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
};