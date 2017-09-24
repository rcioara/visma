movieApp.controller('detailsController', function ($scope, $routeParams, movieService) {

    movieService.getDetails($routeParams.id).then(function (response) {
        console.log(response);
        $scope.movie = response;
    }, function (error) {
        console.error('Could not retrive details for movie id ' + $routeParams.id);
    });

    $scope.addToFavorites = function (movie) {
        movieService.addToFavorites().then(function (response) {
            console.log(response);
        }, function (error) {
            console.error("Could not add to favorites", error);
        });
    };
});