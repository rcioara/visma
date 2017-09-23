var movieApp = angular.module('movieApp', ['ngRoute']);

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
    .when('/movie/:id', {
        templateUrl: 'pages/details.html',
        controller: 'detailsController'
    })

    .when('/search', {
        templateUrl: 'pages/home.html',
        controller: 'searchController'
    })

    // route for the favorite movies page
    .when('/favorites', {
        templateUrl: 'pages/favorites.html',
        controller: 'favoritesController'
    });
});

movieApp.service('movieService', function ($http, authService, $sce) {

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
        var movieDetails = null;
        var movieDetailsApiPath = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US';
        return $http.get(movieDetailsApiPath).then(function (result) {
            self.getMovieTrailer(id).then(function(trailer) {
                 if(trailer.results !== undefined && trailer.results.length > 0){
                   result.data.trailer = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + trailer.results[0].key);
                 }
            });
            console.log('details ' + result.data);
            return result.data;
        });
    };

    this.getMovieTrailer = function (movieId) {
        var req = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + movieId +'/videos',
            params: {api_key: "cd011ce4747999c8ae715a61176561e6", language : "en-US"}
        };
        return $http(req).then(function (result) {
            return result.data;
        });
    };
    this.setSelectedMovie = function (movie) {
        console.log(movie);
        this.selectedMovie = movie;
    };

    this.getSelectedMovie = function () {
        return this.selectedMovie;
    };

    this.addToFavorites = function() {
        // get the session id
        authService.retrieveToken().then(function (response) {
            var token = response;
            authService.authenticate(token).then(function (response) {
                console.log(response);
                authService.retrieveSessionId(token).then(function (response) {
                    var sessionId = response;
                }, function (error) {
                    console.error('Could not retrieve session id ', error)
                });
            }, function (error) {
                console.error('Could not authenticate ', error);
            });
        }, function (error) {
            console.error('Could not retrieve token ', error);
        });
        //add the selected movie to favorites
    }

});

movieApp.service('authService', function ($http) {

    var self = this;
    this.token = null;
    this.isAuthenticated = false;
    this.sessionId = null;

    this.setToken = function (tkn) {
        this.token = tkn;
    };

    this.getToken = function() {
        return this.token;
    };

    this.setIsAuthenticated = function (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    };

    this.getIsAuthenticated = function () {
        return this.isAuthenticated;
    };

    this.setSessionId = function(id) {
        this.sessionId = id;
    };

    this.retrieveSessionId = function() {
        return this.sessionId;
    };

    this.retrieveToken = function () {
        var req = {
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/authentication/token/new',
                    params: {api_key: "cd011ce4747999c8ae715a61176561e6"}
        };

        return $http(req).then(function (response) {
           self.setToken(response.data.request_token);
           return response.data.request_token;
        }, function(error) {
            console.error('Could not retrieve the token ', error);
        });
    };
       // ?redirect_to=http://localhost:63342/visma/visma-spa/index.html
    this.authenticate = function (token) {
        var req = {
            method: 'GET',
            url: 'https://www.themoviedb.org/authenticate/' + token
            // params: {redirect_to: "#!"}
        };
        return $http(req).then(function (response) {
            self.setIsAuthenticated(true);
            return self.isAuthenticated;
        }, function(error) {
            console.error('Could not retrieve the token ', error);
        })
    };

    this.retrieveSessionId = function (token) {
            var req = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/authentication/session/new',
                params: {api_key: "cd011ce4747999c8ae715a61176561e6", request_token : token}
            };

        return $http(req).then(function (response) {
            self.setSessionId(response.data.session_id);
            return response.data.session_id;
        }, function(error) {
            console.error('Could not retrieve the token ', error);
        });
    }


});

movieApp.controller('mainController', function ($scope, $location, movieService) {

    movieService.getPopularMovies().then(function(result) {
        $scope.movies = result;
    });

});

movieApp.controller('searchController', function ($scope, $location, movieService, $rootScope) {
    $scope.search = function() {
        movieService.search($scope.searchText).then(function(result) {
            $rootScope.movies = result;
            $scope.searchText = "";
        });
    };
});

movieApp.controller('aboutController', function ($scope) {
});

movieApp.controller('contactController', function ($scope) {
});

movieApp.controller('favoritesController', function ($scope, authService) {
    authService.retrieveToken().then(function(result) {
        $scope.token = result;
    });
    $scope.message = 'Favorites';
});

movieApp.controller('detailsController', function ($scope, $routeParams, movieService) {
    console.log($routeParams.id);
    movieService.getDetails($routeParams.id).then(function (response) {
        console.log(response);
        $scope.movie = response;
    });
    console.log($scope.movie);

});

