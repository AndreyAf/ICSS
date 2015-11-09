'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state',
  function($scope, $rootScope, Menus, MeanUser, $state) {
    
    var vm = this;

    vm.menu = [
      {
        title: 'Home',
        link:'#'
      },{
        title: 'Team',
        link:'#team'
      },{
        title: 'Contact us',
        link:'#contact_us'
      },{
        title: 'About us',
        link:'#about_us'
      }
    ];

    vm.hdrvars = {
      authenticated: MeanUser.loggedin,
      user: MeanUser.user, 
      isAdmin: MeanUser.isAdmin
    };


    $scope.isCollapsed = true;

    vm.collapse = function(){
      $scope.isCollapsed = true;
    };

    $rootScope.$on('loggedin', function() {

      vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
      };
    });

    vm.logout = function(){
      MeanUser.logout();
    };

    $rootScope.$on('logout', function() {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false
      };
      $state.go('home');
    });

  }
]);
