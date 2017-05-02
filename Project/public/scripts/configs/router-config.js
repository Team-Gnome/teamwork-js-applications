import 'jquery';
import Navigo from 'navigo';

import * as homeController from 'homeController';
import * as signInUserController from 'signInUserController';
import * as registerUserController from 'registerUserController';
import * as userController from 'userController';
import * as lobbyCreationController from 'lobbyCreationController';
import * as notFoundController from 'notFoundController';

import UserAuthentificatior from 'userAuthentificatior';

export const navigo = (() => {
    const router = (() => {
        const root = null;
        const useHash = false;
        const hash = '#!';

        return new Navigo(root, useHash, hash);
    })();

    function initRoutes() {

        //UserAuthentificatior.initAuthStatusChange();
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
            .on('/register', () => {
                $.when(registerUserController.loadHandlebars())
                    .then(() => {

                    });
            })
            .on('/signin', () => {
                $.when(signInUserController.loadHandlebars())
                    .then(() => {

                    });
            })
            .on('/user', () => {
                $.when(userController.loadHandlebars())
                    .then();
            })
            .on('/createLobby', () => {
                $.when(lobbyCreationController.loadHandlebars())
                    .then();
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

