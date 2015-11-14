'use strict';

// TODO : rewrite names
//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('Articles', ['$resource',
  function($resource) {
    return $resource('api/articles/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
