import { firebaseDb as db } from 'firebaseConfig';

const defaultRef = db.ref('server/saving-data/gnome-base');
const usersRef = defaultRef.child('users');

export function addNewUserInDatabase(uid, user) {

    const userObj = {};
    const userData = JSON.stringify(user);

    userObj[uid] = {
        userData
    }

    return new Promise((resolve, reject) => {
        usersRef.set(userObj);
    });
}
