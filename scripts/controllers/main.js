movieApp.controller('mainController', function ($scope, $location, movieService) {

    movieService.getPopularMovies().then(function(result) {
        $scope.movies = result;
    });

});
