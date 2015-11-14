'use strict';

// TODO: rewrite model name
var modelName = {
    single: 'Acticle',
    plural: 'Articles'
};

// Setting up route module routes
angular.module('mean.' + modelName.plural.toLocaleLowerCase()).config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('all ' + modelName.plural.toLocaleLowerCase(), {
                url: '/' + modelName.plural.toLocaleLowerCase(),
                templateUrl: '/' + modelName.plural.toLocaleLowerCase() + '/views/list.html',
                resolve: {
                    loggedin: function (MeanUser) {
                        return MeanUser.checkLoggedin();
                    }
                }
            })
            .state('create ' + modelName.single.toLocaleLowerCase(), {
                url: '/' + modelName.plural.toLocaleLowerCase() + '/create',
                templateUrl: '/' + modelName.plural.toLocaleLowerCase() + '/views/model.html',
                resolve: {
                    loggedin: function (MeanUser) {
                        return MeanUser.checkLoggedin();
                    }
                }
            })
            .state('edit ' + modelName.single.toLocaleLowerCase(), {
                url: '/' + modelName.plural.toLocaleLowerCase() + '/:id/edit',
                templateUrl: '/' + modelName.plural.toLocaleLowerCase() + '/views/model.html',
                resolve: {
                    loggedin: function (MeanUser) {
                        return MeanUser.checkLoggedin();
                    }
                }
            })
            .state('view ' + modelName.single.toLocaleLowerCase(), {
                url: '/' + modelName.plural.toLocaleLowerCase() + '/:id',
                templateUrl: '/' + modelName.plural.toLocaleLowerCase() + '/views/model.html',
                resolve: {
                    loggedin: function (MeanUser) {
                        return MeanUser.checkLoggedin();
                    }
                }
            });
    }
]);
