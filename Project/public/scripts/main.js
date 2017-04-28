import 'jquery';
import Navigo from 'navigo';

import { get as setHomePageContent } from 'homeController';
import { get as setSignInPageContent } from 'signInUserController';
import { get as setRegisterPageContent } from 'registerUserController';
import { registerUser } from 'registerUserController';
import { get as setNotFoundPageContent } from 'notFoundController';

var root = null;
var useHash = false;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

router
    .on('/', () => {
        $.when(setHomePageContent())
            .then();
    })
    .on('/home', () => {
        $.when(setHomePageContent())
            .then()
    })
    .on('/signin', () => {
        $.when(setSignInPageContent())
            .then()
    })
    .on('/register', () => {
        $.when(setRegisterPageContent())
            .then(() => {
                $('#btn-register').click(() => {
                    registerUser();
                })
            });
    }).resolve();

router.notFound(function () {
    setNotFoundPageContent();
});
