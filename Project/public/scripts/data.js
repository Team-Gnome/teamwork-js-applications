import { firebaseDb as db } from 'firebaseConfig';

const defaultRef = db.ref('server/saving-data/gnome-base');
const usersRef = defaultRef.child('users');

function addNewUserInDatabase(username, firstName, lastName, hashedPassword, email) {

    const user = {
        username: {
            firstName,
            lastName,
            hashedPassword,
            email
        }
    };

    return new Promise((resolve, reject) => {
        usersRef.push(user);
    });
}

export {
    addNewUserInDatabase
}