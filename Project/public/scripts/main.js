import 'jquery';
import Navigo from 'navigo';

import { get as setHomePageContent } from 'homeController';
import { get as setSignInPageContent } from 'signInController';
import { get as setRegisterPageContent } from 'registerController';
import { get as setNotFoundPageContent } from 'notFoundController';


var root = null;
var useHash = false;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

router
    .on(() => {
        setHomePageContent();
    })
    .resolve();

router.on('/home', setHomePageContent);
router.on('/signIn', setSignInPageContent);
router.on('/register', setRegisterPageContent);

router.notFound(function () {
    setNotFoundPageContent();
});

