SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        // SystemJS files
        'plugin-babel': './../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // Library files
        'jquery': './../node_modules/jquery/dist/jquery.min.js',
        'handlebars': './../node_modules/handlebars/dist/handlebars.min.js',
        'navigo': './../node_modules/navigo/lib/navigo.min.js',
        'firebase-admin': './../node_modules/firebase-admin/lib/index.js',
        'firebase': './../node_modules/firebase/firebase.js',
        'toastrConfig': './../configs/toastr-config.js',

        // Application files
        'main': 'scripts/main.js',
        'tests': '../tests/tests.js',
        'templates': './../scripts/templates.js',

        // Configs
        'firebaseConfig': './../configs/firebase-config.js',
        'router': './../configs/router-config.js',

        // Firebase data
        'data': './../scripts/firebase/data.js',
        'userAuthentificator': './../scripts/firebase/user-authentificator.js',

        // Models
        'user': '../scripts/models/user.js',
        'lobby': '../scripts/models/lobby.js',
        'event': '../scripts/models/event.js',

        // Controllers
        'homeController': './../scripts/controllers/home-controller.js',
        'registerUserController': './../scripts/controllers/register-user-controller.js',
        'signInUserController': './../scripts/controllers/sign-in-user-controller.js',
        'userController': './../scripts/controllers/user-controller.js',
        'createLobbyController': './../scripts/controllers/create-lobby-controller.js',
        'listLobbiesController': './../scripts/controllers/list-lobbies-controller.js',
        'joinedLobbiesController': './../scripts/controllers/joined-lobbies-controller.js',
        'createdLobbiesController': './../scripts/controllers/created-lobbies-controller.js',
        'listEventsController': './../scripts/controllers/list-events-controller.js',
        'joinedEventsController': './../scripts/controllers/joined-events-controller.js',
        'notFoundController': './../scripts/controllers/not-found-controller.js',

        // Utils
        'events': './../scripts/utils/events.js',
        'inputDataHandler': './../scripts/utils/input-data-handler.js',
        'loadingScreenHandler': './../scripts/utils/loading-screen-handler.js',
        'validator': './../scripts/utils/validator.js',
    },
    packages: {
        "/": {
            defaultExtension: "js"
        }
    }
});

