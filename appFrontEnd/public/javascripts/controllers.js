/**
 * Created by MehdiBeldjilali on 12/05/2014.
 */

var baseURL = "http://localhost:8080/";

function IndexTypeCtrl($scope, $http) {
    $http.get(baseURL + 'gallery').success(function(indexTypes) {
        $scope.galleries = indexTypes.galleries;
        //console.log("COUCOU"+ indexTypes.galleries);
    })

    $scope.orderProp = 'id';
};

function NewGalleryCtrl($scope, $http) {

    $scope.createGallery = function(){

        var formData = new FormData();
        formData.append('file', $scope.file);

        var data = { gallery_name: $scope.gallery_name, gallery_host: $scope.gallery_host,
            gallery_description: $scope.gallery_description};
        $http.post(baseURL+ 'gallery/create', data,
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': 'multipart/data-form'}
        }).success(function(data,status, headers) {
            $http.get(baseURL + 'gallery').success(function(indexTypes) {
                $scope.galleries = indexTypes.galleries;
            })
        });
    };

};

function DisplayImagesByGallery($scope,$http,$routeParams) {

    var id = $routeParams.bar;
    $http.get(baseURL + 'gallery/' + id).success(function(displayImages) {
        $scope.images = displayImages.images;
    })

    $scope.orderProp = 'id';

    $http.get(baseURL + '/gallery/show/' + id).success(function(showGallery) {
        $scope.gallery = showGallery.gallery;
    })

};
