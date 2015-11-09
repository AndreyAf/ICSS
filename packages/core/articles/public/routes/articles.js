'use strict';

//Setting up route
angular.module('mean.articles').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('articles', {
        url: '/articles',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('articles.list', {
        url: '/',
        templateUrl: '/articles/views/list.html'
      })
      .state('articles.create', {
        url: '/create',
        templateUrl: '/articles/views/create.html'
      })
      .state('articles.edit', {
        url: '/edit/:articleId',
        templateUrl: '/articles/views/edit.html'
      })
      .state('articles.view', {
        url: '/view/:articleId',
        templateUrl: '/articles/views/view.html'
      });
  }
]);
