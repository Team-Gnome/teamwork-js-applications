import 'jquery';
import Navigo from 'navigo';

import * as homeController from 'homeController';
import * as signInUserController from 'signInUserController';
import * as registerUserController from 'registerUserController';
import * as userController from 'userController';
import * as notFoundController from 'notFoundController';

import User from 'userAuthentication';

User.initAuthStatusChange();

$('#sign-in-btn').click(() => {
    if ($('#sign-in-btn').text() === 'Sign out') {
        User.signOut();
    };
})

export const navigo = (() => {
    const router = (() => {
        const root = null;
        const useHash = false;
        const hash = '#!';

        return new Navigo(root, useHash, hash);
    })();

    function initRoutes() {
        router
            .on('/', () => {
                $.when(homeController.loadHandlebars())
                    .then(() => {

                    });
            })
            .on('/home', () => {
                $.when(homeController.loadHandlebars())
                    .then(() => {

                    });
            })
            .on('/signin', () => {
                $.when(signInUserController.loadHandlebars())
                    .then(() => {

                    });
            })
            .on('/user/:id', () => {
                $.when(userController.loadHandlebars())
                    .then();
            })
            .on('/register', () => {
                $.when(registerUserController.loadHandlebars())
                    .then(() => {

                    });
            })
            .resolve();

        router.notFound(function () {
            notFoundController.loadHandlebars();
        })
            .resolve();
    }

    return {
        initRoutes: initRoutes,
        router: router
    }
})();

