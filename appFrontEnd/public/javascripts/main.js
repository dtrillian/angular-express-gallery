/**
 * Created by MehdiBeldjilali on 12/05/2014.
 */

var app = angular.module("Contestnco", ['ngRoute', 'ngCookies']);

// Enable CORS Angular
/*app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);*/

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/html/index.html',
            controller: IndexTypeCtrl
        })
        .when('/gallery/:id', {
            templateUrl: '/views/html/gallery.html',
            controller: DisplayImagesByGallery
        });
});

app.run(function($http, $cookies) {
    $http.defaults.headers.post['x-csrf-token'] = $cookies._csrf;
});

app.directive('fileInput', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileInput),
                    modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        }

    }
]);