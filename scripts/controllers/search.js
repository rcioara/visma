movieApp.controller('searchController', function ($scope, $location, movieService) {

    $scope.movies = movieService.getMovies();

    $scope.search = function () {
        movieService.search($scope.searchText).then(function (result) {
            $scope.searchText = "";
            $location.path("/search");
        })
   };

});