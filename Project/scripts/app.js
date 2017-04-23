import 'jquery';
import { Router } from 'router';
import * as testController from 'testController';

const router = new Router();

router
    .on('/test', testController.get);

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());