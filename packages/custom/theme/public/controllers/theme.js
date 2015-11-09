'use strict';

angular.module('mean.theme')
    .controller('ThemeController', ['$scope', 'Global', '$rootScope',
        function ($scope, Global, $rootScope) {
// Original scaffolded code.
            $scope.global = Global;
            $scope.package = {
                name: 'theme'
            };

            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    $scope.loading = true;
                });

            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $scope.loading = false;
                });

        }
    ]);
