'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Articles = new Module('articles');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Articles.register(function (app, auth, database, circles, swagger) {

    //We enable routing. By default the Package Object is passed to the routes
    Articles.routes(app, auth, database);

    Articles.aggregateAsset('css', 'articles.css');

    Articles.aggregateAsset('js', '../lib/angular-animate/angular-animate.min.js', {
        global: true
    });

    Articles.aggregateAsset('js', '../lib/angular-touch/angular-touch.min.js', {
        global: true
    });

    Articles.aggregateAsset('js', '../lib/CSV-JS/csv.js', {
        global: true
    });

    Articles.aggregateAsset('js', '../lib/pdfmake/build/pdfmake.min.js', {
        global: true
    });

    Articles.aggregateAsset('js', '../lib/pdfmake/build/vfs_fonts.js', {
        global: true
    });

    Articles.aggregateAsset('css', '../lib/angular-ui-grid/ui-grid.min.css', {
        global: true
    });

    Articles.aggregateAsset('js', '../lib/angular-ui-grid/ui-grid.min.js', {
        global: true
    });

    Articles.angularDependencies(["ngTouch", "ngAnimate", "ui.grid", "ui.grid.selection", "ui.grid.exporter"]);

    //We are adding a link to the main menu for all authenticated users
    Articles.menus.add({
        'roles': ['authenticated'],
        'title': 'Articles',
        'link': 'all articles'
    });
    Articles.menus.add({
        'roles': ['authenticated'],
        'title': 'Create New Article',
        'link': 'create article'
    });

    Articles.events.defaultData({
        type: 'post',
        subtype: 'article'
    });

    swagger.add(__dirname);

    return Articles;
});
