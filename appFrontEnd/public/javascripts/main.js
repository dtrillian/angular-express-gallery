/**
 * Created by MehdiBeldjilali on 12/05/2014.
 */

var app = angular.module("Contestnco", []);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'./appFrontEnd/views/index.jade',
            controller:IndexTypeCtrl
        })
});

