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
Articles.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Articles.routes(app, auth, database);

  Articles.aggregateAsset('css', 'articles.css');

  
  //We are adding a link to the main menu for all authenticated users
  Articles.menus.add({
    'roles': ['authenticated'],
    'title': 'Articles',
    'link': 'articles'
  });
  Articles.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Article',
    'link': 'article.create'
  });

  Articles.events.defaultData({
    type: 'post',
    subtype: 'article'
  });

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);
	
  return Articles;
});
