'use strict';

// Service used for articles REST endpoint
angular.module('mean.textChats').factory('TextChats', ['$resource',
  function($resource) {
    return $resource('api/textChat/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
