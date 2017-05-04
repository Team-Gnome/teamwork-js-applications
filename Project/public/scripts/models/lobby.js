export default class Lobby {
    constructor(author, lobbyname, sport, location, datetime, mode) {
        this.author = author;
        this.lobbyname = lobbyname;
        this.sport = sport;
        this.location = location;
        this.datetime = datetime;
        this.mode = mode;
    }

    set author(value) {
        this._author = value;
    }
    get author() {
        return this._author;
    }

    set lobbyname(value) {
        this._lobbyname = value;
    }
    get lobbyname() {
        return this._lobbyname;
    }

    set sport(value) {
        this._sport = value;
    }
    get sport() {
        return this._sport;
    }

    set location(value) {
        this._location = value;
    }
    get location() {
        return this._location;
    }

    set datetime(value) {
        this._datetime = value;
    }
    get datetime() {
        return this._datetime;
    }

    set mode(value) {
        this._mode = value;
    }
    get mode() {
        return this._mode;
    }
};