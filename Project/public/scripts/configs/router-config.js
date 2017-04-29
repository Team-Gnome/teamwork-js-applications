import 'jquery';
import Navigo from 'navigo';

import {
    get as setHomePageContent
} from 'homeController';

import {
    get as setSignInPageContent
} from 'signInUserController';

import {
    signIn
} from 'signInUserController';

import {
    get as setRegisterPageContent
} from 'registerUserController';

import {
    registerUser
} from 'registerUserController';

import {
    get as setNotFoundPageContent
} from 'notFoundController';


const router = (() => {
    const navigo = (() => {
        const root = null;
        const useHash = false;
        const hash = '#!';

        return new Navigo(root, useHash, hash);
    })();

    function initRoutes() {
        navigo
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
                    .then(() => {
                        $('#send-sign-in-btn').click(() => {
                            console.log(1);
                            signIn();
                        });
                    });
            })
            .on('/register', () => {
                $.when(setRegisterPageContent())
                    .then(() => {
                        $('#btn-register').click(() => {
                            registerUser();
                        });
                    });
            })
            .resolve();

        navigo.notFound(function () {
                setNotFoundPageContent();
            })
            .resolve();
    }

    // User.initAuthStatusChange();

    // $('#sign-in-btn').click(() => {
    //     if ($('#sign-in-btn').text() === 'Sign out') {
    //         User.signOut();
    //     } else {
    //         router.navigate('/signin');
    //     }
    // });

    return {
        initRoutes: initRoutes
    }
})();

export {
    router
};