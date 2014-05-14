/**
 * Created by MehdiBeldjilali on 12/05/2014.
 */

var app = angular.module("Contestnco", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'./appFrontEnd/views/html/index.html',
            controller:IndexTypeCtrl
        })
});
