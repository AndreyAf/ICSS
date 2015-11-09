'use strict';

angular.module('mean.system').controller('IndexController', [ '$scope',
    function ($scope) {

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        var slides = $scope.slides = [];
        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        $scope.technologies = [
            {
                title: "MongoDB",
                logoImg: "/system/assets/img/logos/logo_mongodb.png"
            },{
                title: "ExpressJS",
                logoImg: "/system/assets/img/logos/logo_expressjs.png"
            },{
                title: "AngularJS",
                logoImg: "/system/assets/img/logos/logo_angularjs.png"
            },{
                title: "NodeJS",
                logoImg: "/system/assets/img/logos/logo_nodejs.png"
            },{
                title: "HTML5",
                logoImg: "/system/assets/img/logos/logo_html5.png"
            },{
                title: "CSS3",
                logoImg: "/system/assets/img/logos/logo_css3.png"
            },{
                title: "WebRTC",
                logoImg: "/system/assets/img/logos/logo_webrtc.png"
            }
        ];
    }
]);
