export default class User {
    constructor(username, firstname, lastname, email) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    };

    set username(value) {
        this._username = value
    };
    get username() {
        return this._username;
    };
    set firstname(value) {
        this._firstname = value
    };
    get firstname() {
        return this._firstname;
    };
    set lastname(value) {
        this._lastname = value
    };
    get lastname() {
        return this._lastname;
    };
    set email(value) {
        this._email = value
    };
    get email() {
        return this._email;
    };
};