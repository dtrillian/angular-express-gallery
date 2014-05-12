/**
 * Created by MehdiBeldjilali on 12/05/2014.
 */

var baseURL = "http://localhost:8080/";

function IndexTypeCtrl($scope, $http) {
    $http.get(baseURL + 'gallery').success(function(indexTypes) {
        $scope.galleries = indexTypes.galleries;
        console.log("COUCOU"+ indexTypes.galleries);
    })

    $scope.orderProp = 'id';
};
