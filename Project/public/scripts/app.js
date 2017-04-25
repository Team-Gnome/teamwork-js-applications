import 'jquery';
import Navigo from 'navigo';
import * as testController from 'testController';
import * as homeController from 'homeController';

var root = null;
var useHash = false;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

router.on('/home', homeController.get);
router.on('/test', testController.get);

$(window).on('load', () => window.location.hash = '');