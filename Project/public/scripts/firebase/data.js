import { firebaseDb as db } from 'firebaseConfig';

const defaultRef = db.ref();

export function addNewUserInDatabase(user) {
    const uid = localStorage['authkey'];
    const userObj = {};
    const usersRef = defaultRef.child('users/' + uid);

    return new Promise((resolve, reject) => {
        usersRef.set(user);
    });
};

export function addNewLobbyInDatabase(lobby) {
    const lobbiesRef = defaultRef.child('lobbies');
    return new Promise((resolve, reject) => {
        resolve(lobbiesRef.push(lobby));
    });
};

export function deleteLobbyFromDatabase(lobby) {
    return new Promise((resolve, reject) => {
        const lobbiesRef = defaultRef.child(`lobbies`)
            .once('value', function (snapshot) {
                snapshot.forEach(function (snap) {
                    if (lobby._lobbyname === snap.val()._lobbyname
                        && lobby._author === snap.val()._author) {
                        resolve(() => {
                            snap.ref.remove();
                        });
                    };
                });
            });
    });
};

export function addCreatedLobbyInUserDatabase(lobby) {
    const uid = localStorage['authkey'];
    const lobbiesRef = defaultRef.child(`users/${uid}/createdLobbies`);

    lobbiesRef.push(lobby);
};

export function addJoinedLobbyInUserDatabase(lobby) {
    const uid = localStorage['authkey'];
    const lobbiesRef = defaultRef.child(`users/${uid}/joinedLobbies`);

    lobbiesRef.push(lobby);
};

export function deleteJoinedLobbyFromUserDatabase(lobby) {
    return new Promise((resolve, reject) => {
        const uid = localStorage['authkey'];
        const lobbiesRef = defaultRef.child(`users/${uid}/joinedLobbies`)
            .once('value', function (snapshot) {
                snapshot.forEach(function (snap) {
                    if (lobby._lobbyname === snap.val()._lobbyname) {
                        resolve(() => {
                            snap.ref.remove();
                        });
                    };
                });
            });
    });
};

export function deleteCreatedLobbyFromUserDatabase(lobby) {
    return new Promise((resolve, reject) => {
        const uid = localStorage['authkey'];
        const lobbiesRef = defaultRef.child(`users/${uid}/createdLobbies`)
            .once('value', function (snapshot) {
                snapshot.forEach(function (snap) {
                    if (lobby._lobbyname === snap.val()._lobbyname) {
                        resolve(() => {
                            snap.ref.remove();
                        });
                    };
                });
            });
    });
};

export function getAllLobies(ref) {
    return new Promise((resolve, reject) => {
        db.ref(ref)
            .once('value')
            .then(function (snapshot) {
                const lobbies = snapshot.val();
                resolve(lobbies);
            });
    });
};

export function listenForChanges(path) {
    return db.ref(path).once('value');
};