SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        // SystemJS files
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // Application files
        'main': 'scripts/main.js',
        'router': 'scripts/router.js',
        'requester': 'scripts/requester.js',
        'homeController': 'scripts/controllers/homeController.js',
        'registerController': 'scripts/controllers/registerController.js',
        'signInController': 'scripts/controllers/signInController.js',
        'notFoundController': 'scripts/controllers/notFoundController.js',
        'templates': 'scripts/templates.js',

        // Library files
        'jquery': 'node_modules/jquery/dist/jquery.min.js',
        'handlebars': 'node_modules/handlebars/dist/handlebars.min.js',
        'navigo': 'node_modules/navigo/lib/navigo.min.js'
    },
    packages: {
        "/": {
            defaultExtension: "js"
        }
    }
});

System.import('main');