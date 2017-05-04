import validator from 'validator';

export function getUserInputData() {
    const firstname = $('#input-firstname').val(),
        lastname = $('#input-lastname').val(),
        username = $('#input-username').val(),
        password = $('#input-password').val(),
        confirmPassword = $('#input-confirm-password').val(),
        email = $('#input-email').val();

    const data = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email
    };

    validator.validateRegistrationForm(data);

    return data;
};

export function getLobbyInputData() {
    const lobbyname = $('#input-lobbyname').val(),
        sport = $('#sport-select').find(":selected").text(),
        location = $('#input-location').val(),
        datetime = $('#input-datetime').val(),
        mode = $('input[name="options"]:checked').val();

    return {
        lobbyname: lobbyname,
        sport: sport,
        location: location,
        datetime: datetime,
        mode: mode
    };
};