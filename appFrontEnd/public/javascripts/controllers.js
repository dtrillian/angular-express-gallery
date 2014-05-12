/**
 * Created by MehdiBeldjilali on 12/05/2014.
 */
function IndexTypeCtrl($scope, $http) {
    $http.get('/gallery').success(function(indexTypes) {
        $scope.galleries = indexTypes.data;
        console.log("COUCOU"+ data);
    })

    $scope.orderProp = 'id';
};