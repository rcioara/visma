movieApp.controller('searchController', function ($scope, $location, movieService) {
    $scope.search = function () {
        movieService.search($scope.searchText).then(function (result) {
            $scope.searchText = "";

        });
    };
});