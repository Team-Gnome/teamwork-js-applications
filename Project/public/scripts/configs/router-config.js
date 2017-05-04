import 'jquery';
import Navigo from 'navigo';

import * as homeController from 'homeController';
import * as signInUserController from 'signInUserController';
import * as registerUserController from 'registerUserController';
import * as userController from 'userController';
import * as lobbyCreationController from 'createLobbyController';
import * as joinLobbyController from 'joinLobbyController';
import * as notFoundController from 'notFoundController';

import events from 'events';
import * as loadingScreenHandler from 'loadingScreenHandler';

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
                homeController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.signout(); })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .on('/home', () => {
                homeController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.signout(); })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .on('/register', () => {
                registerUserController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.register(); })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .on('/signin', () => {
                signInUserController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.signin(); })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .on('/user', () => {
                userController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.signout(); })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .on('/createLobby', () => {
                lobbyCreationController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.signout(); })
                    .then(() => { events.createLobby() })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .on('/joinLobby', () => {
                joinLobbyController.loadHandlebars()
                    .then(() => { loadingScreenHandler.initContentChange(); })
                    .then(() => { events.signout(); })
                    .then(() => { events.joinLobby(); })
                    .then(() => { loadingScreenHandler.showContent(); })
            })
            .resolve();

        router.notFound(function () {
            notFoundController.loadHandlebars();
        })
            .resolve();
    };

    return {
        initRoutes: initRoutes,
        router: router
    }
})();

