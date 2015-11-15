'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var TextChat = new Module('text-chat');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
TextChat.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  TextChat.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  TextChat.menus.add({
    title: 'textChat example page',
    link: 'textChat example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  TextChat.aggregateAsset('css', 'textChat.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    TextChat.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    TextChat.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    TextChat.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return TextChat;
});
