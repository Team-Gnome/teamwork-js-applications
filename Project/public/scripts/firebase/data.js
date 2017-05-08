import { firebaseDb as db } from 'firebaseConfig';

const defaultRef = db.ref();

export function addNewUserInDatabase(user) {
    const uid = localStorage['authkey'];
    const userObj = {};
    const usersRef = defaultRef.child('users/' + uid);

    return new Promise((resolve, reject) => {
        resolve(usersRef.set(user));
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

export function deleteCreatedLobbyFromUserDatabase(lobby) {
    return new Promise((resolve, reject) => {
        const uid = localStorage['authkey'];
        const lobbiesRef = defaultRef.child(`users/${uid}/createdLobbies`)
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

export function getData(ref) {
    return new Promise((resolve, reject) => {
        db.ref(ref)
            .once('value')
            .then(function (snapshot) {
                const lobbies = snapshot.val();
                resolve(lobbies);
            });
    });
};

export function getForbidenLobbies() {
    return new Promise((resolve, reject) => {
        const uid = localStorage['authkey'];

        const p1 = getData(`/users/${uid}/createdLobbies`)
            .then((lobbies) => {
                return lobbies
            })
        const p2 = getData(`/users/${uid}/joinedLobbies`)
            .then((lobbies) => {
                return lobbies
            });

        const arr = [];

        Promise.all([p1, p2]).then(values => {
            values.forEach((value) => {
                if (value !== null) {
                    const lobbies = Object.values(value);

                    lobbies.forEach((lobby) => {
                        arr.push(lobby);
                    });
                }
            });

            resolve(arr);
        });
    });
};

