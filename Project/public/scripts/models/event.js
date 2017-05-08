export default class Event {
    constructor(name, sport, location, datetime, duration, mode, description, prize) {
        this.name = name;
        this.sport = sport;
        this.location = location;
        this.datetime = datetime;
        this.duration = duration;
        this.mode = mode;
        this.description = description;
        this.prize = prize;
    };

    set name(value) {
        this._name = value;
    };
    get name() {
        return this._name;
    };

    set sport(value) {
        this._sport = value;
    };
    get sport() {
        return this._sport;
    };

    set location(value) {
        this._location = value;
    };
    get location() {
        return this._location;
    };

    set datetime(value) {
        this._datetime = value;
    };
    get datetime() {
        return this._datetime;
    };

    set duration(value) {
        this._duration = value;
    };
    get duration() {
        return this._duration;
    };

    set mode(value) {
        this._mode = value;
    };
    get mode() {
        return this._mode;
    };

    set description(value) {
        this._description = value;
    };
    get description() {
        return this._description;
    };

    set prize(value) {
        this._prize = value;
    };
    get prize() {
        return this._prize;
    };
};