SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        // SystemJS files
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // Application files
        'main': 'scripts/main.js',
        'homeController': 'scripts/controllers/homeController.js',
        'registerUserController': 'scripts/controllers/registerUserController.js',
        'signInUserController': 'scripts/controllers/signInUserController.js',
        'userController': 'scripts/controllers/userController.js',
        'lobbyCreationController': 'scripts/controllers/create-lobby-controller.js',
        'joinLobbyController': 'scripts/controllers/join-lobby-controller.js',
        'notFoundController': 'scripts/controllers/notFoundController.js',
        'templates': 'scripts/templates.js',
        'firebaseConfig': 'scripts/configs/firebase-config.js',
        'data': 'scripts/firebase/data.js',
        'userAuthentificatior': 'scripts/firebase/userAuthentificatior.js',
        'router': 'scripts/configs/router-config.js',
        'user': 'scripts/models/user.js',
        'lobby': 'scripts/models/lobby.js',

        // Library files
        'jquery': 'node_modules/jquery/dist/jquery.min.js',
        'handlebars': 'node_modules/handlebars/dist/handlebars.min.js',
        'navigo': 'node_modules/navigo/lib/navigo.min.js',
        'firebase-admin': 'node_modules/firebase-admin/lib/index.js',
        'firebase': 'node_modules/firebase/firebase.js'
    },
    packages: {
        "/": {
            defaultExtension: "js"
        }
    }
});

System.import('main');