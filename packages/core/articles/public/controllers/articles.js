'use strict';

// TODO: rewrite model name
/***
 * Define model name
 * @type {{single: string, plural: string}}
 */
var modelName = {
    single: 'Article',
    plural: 'Articles'
};

angular.module('mean.' + modelName.plural.toLocaleLowerCase()).controller(modelName.plural + 'Controller', [
    '$scope',
    '$stateParams',
    '$location',
    'Global',
    modelName.plural,
    'MeanUser',
    'Circles',
    '$state',
    function ($scope,
              $stateParams,
              $location,
              Global,
              Model,
              MeanUser,
              Circles,
              $state) {

        $scope.global = Global;
        $scope.modelName = modelName;
        $scope.selectedItems = {};
        $scope.searchText = '';

        $scope.item = {};
        $scope.items = Model.query(
            function (items) {
                $scope.items = items;
            });

        /// end rewrite

        /***
         * Create new item
         * @param isValid
         */
        $scope.create = function (isValid) {
            if (isValid) {
                // $scope.article.permissions.push('test test');
                var item = new Model($scope.item);

                item.$save(function (response) {
                    $location.path('/' +$scope.modelName.plural.toLowerCase() + '/' + response._id);
                });

                $scope.item = {};

            } else {
                $scope.submitted = true;
            }
        };

        /***
         * Remove item by id
         * @param itemId
         */
        $scope.remove = function (itemId) {
            if (confirm('Are you sure you want to delete this ' + $scope.modelName.single.toLowerCase() + '?')) {
                if (itemId) {

                    Model.get({
                        id: itemId
                    }, function (item) {
                        item.$remove(function (response) {

                            for (var i in $scope.items) {
                                if ($scope.items[i] === article) {
                                    $scope.items.splice(i, 1);
                                }
                            }
                            $location.path('/' +$scope.modelName.plural.toLowerCase());
                        });
                    });

                } else {
                    $scope.item.$remove(function (response) {
                        $location.path('/' +$scope.modelName.plural.toLowerCase());
                    });
                }
            }
        };

        /***
         * Update current model
         * @param isValid
         */
        $scope.update = function (isValid) {
            if (isValid) {
                var item = $scope.item;
                if (!item.updated) {
                    item.updated = [];
                }
                item.updated.push(new Date().getTime());

                item.$update(function () {
                    $location.path('/' +$scope.modelName.plural.toLowerCase()+'/' + item._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        /***
         * Get all model items
         */
        $scope.find = function () {
            Model.query(function (items) {
                $scope.items = items;
            });
        };

        /***
         * Get model by id
         */
        $scope.findOne = function () {
            Model.get({
                id: $stateParams.id
            }, function (model) {
                $scope.item = model;
            });
        };

        // TODO: define list columns in columnDefs prop. (notice than not all columns always required)
        /***
         * Define table options
         * @type {{data: *, enableFiltering: boolean, useExternalFiltering: boolean, enableHorizontalScrollbar: number, columnDefs: *[]}}
         */
        $scope.gridOptions = {
            data: $scope.items,
            enableFiltering: false,
            useExternalFiltering: true,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {
                    field: 'title',
                    name: 'Title'
                },
                {
                    field: 'content',
                    name: 'Content',
                    enableFiltering: false
                },
                {
                    field: 'created',
                    name: 'Created',
                    cellTemplate: '' +
                    '<div class="ui-grid-cell-contents">{{ row.entity.created | date : "d/M/yyyy mm:H:ss"}}</div>'
                },
                {
                    name: ' ',
                    enableFiltering: false,
                    cellTemplate: '' +
                    '<div class="ui-grid-cell-contents">' +
                    '   <a class="btn" ui-sref="view ' + $scope.modelName.single.toLowerCase() + '({id : row.entity._id})" uib-tooltip="View item">' +
                    '       <i class="glyphicon glyphicon-list"></i>' +
                    '   </a>' +
                    '   <a class="btn" ui-sref="edit ' + $scope.modelName.single.toLowerCase() + '({id : row.entity._id})" uib-tooltip="Edit item">' +
                    '       <i class="glyphicon glyphicon-edit"></i>' +
                    '   </a>' +
                    '   <a class="btn" data-ng-click="remove(row.entity._id);" uib-tooltip="Delete item">' +
                    '       <i class="glyphicon glyphicon-trash"></i>' +
                    '   </a>' +
                    '</div>'
                }
            ]
        };

        /***
         * Filter list by search input
         * @param search
         */
        $scope.refreshData = function (search) {
            $scope.gridOptions.data = $scope.items;
            while (search) {
                var oSearchArray = search.split(' ');
                $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, oSearchArray[0], undefined);
                oSearchArray.shift();
                search = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
            }
        };

        /***
         * Get title state by current state
         * @returns {string}
         */
        $scope.getModelTitle = function () {

            var stateName = $state.current.name.split(' ');

            if (stateName[1] === $scope.modelName.single) {
                switch (stateName[0]) {
                    case 'create':
                        return 'Create ' + $scope.modelName.single;
                    case 'edit':
                        return 'Edit ' + $scope.modelName.single;
                    case 'view':
                        return 'View ' + $scope.modelName.single;
                }
            }
        };

        $scope.openList = function(){
            $location.path('/' +$scope.modelName.plural.toLowerCase());
        }
    }

]);