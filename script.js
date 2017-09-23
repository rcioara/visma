var movieApp = angular.module('scotchApp', ['ngRoute']);

movieApp.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })

    // route for the about page
    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    })

    // route for the details page
    .when('/details', {
        templateUrl: 'pages/details.html',
        controller: 'detailsController'
    })

    // route for the favorite movies page
    .when('/favorites', {
        templateUrl: 'pages/favorites.html',
        controller: 'favoritesController'
    });
});

movieApp.service('movieService', function ($http) {

    var self = this;
    this.movies = [];
    this.selectedMovie = null;

    this.getPopularMovies = function () {
        self.movies.length = 0;
        return $http.get('https://api.themoviedb.org/3/movie/popular?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US')
            .then(function (result) {
                self.setMovies(result.data.results);
                return self.movies;
            })
    };

    this.search = function (searchText) {
        self.movies.length = 0;
        var searchApiPath = 'https://api.themoviedb.org/3/search/movie?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US&query=' + searchText + '&page=1&include_adult=false';
        return $http.get(searchApiPath)
            .then(function (result) {
                self.setMovies(result.data.results);
                return self.movies;
            })
    };

    this.setMovies = function (movies) {
        for (var i = 0; i < movies.length; i += 3) {
            self.movies.push(movies.slice(i, i + 3));
        }
    };

    this.getMovies = function () {
        return this.movies;
    };

    this.getDetails = function (id) {
        var movieDetailsApiPath = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US';
        return $http.get(movieDetailsApiPath).then(function (result) {

        });
    };

    this.setSelectedMovie = function (movie) {
        console.log(movie);
        this.selectedMovie = movie;
    };

    this.getSelectedMovie = function () {
        return this.selectedMovie;
    };

});

movieApp.service('authService', function ($http) {

    var self = this;
    this.movies = [];
    this.selectedMovie = null;
    this.token = null;

    this.getToken = function () {
        self.movies.length = 0;
        var req = {
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/movie/popular',
                    params: {api_key: "cd011ce4747999c8ae715a61176561e6",language:"en-US"}
                 };
        $http(req).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            self.token = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };


});

movieApp.controller('mainController', function ($scope, movieService) {

    movieService.getPopularMovies().then(function(result) {
       $scope.movies = result;
    });

    $scope.search = function() {
        return movieService.search($scope.searchText).then(function(result) {});
    };

    $scope.setSelectedMovie = function(movie) {
        console.log(movie);
        movieService.setSelectedMovie(movie);
    };
});

movieApp.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});


movieApp.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

movieApp.controller('favoritesController', function ($scope, authService) {
    authService.getToken();
    $scope.message = 'Favorites';
});

movieApp.controller('detailsController', function ($scope, movieService) {
    $scope.movie = movieService.getSelectedMovie();
});

