movieApp.controller('detailsController', function ($scope, $routeParams, movieService) {
    console.log($routeParams.id);
    movieService.getDetails($routeParams.id).then(function (response) {
        console.log(response);
        $scope.movie = response;
    });
    console.log($scope.movie);
});