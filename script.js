	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute','ui.bootstrap']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

			.when('/favorites', {
            				templateUrl : 'pages/favorites.html',
            				controller  : 'favoritesController'
            			});
	});

    scotchApp.service('movieService', function($http) {
        var self = this;
        this.movies = [];

        this.get = function() {
          return $http.get('https://api.themoviedb.org/3/movie/popular?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US')
            .then(function(result) {
              self.setMovies(result.data.results);
              return self.movies;
            })
        };

        this.search = function(searchText) {
           self.movies.length = 0;
           var searchApiPath = 'https://api.themoviedb.org/3/search/movie?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US&query='+searchText+'&page=1&include_adult=false';
           return $http.get(searchApiPath)
                    .then(function(result) {
                      self.setMovies(result.data.results);
                      return self.movies;
                    })
        }

        this.setMovies = function(movies) {
            for (var i=0; i<movies.length; i+=3){
                            self.movies.push(movies.slice(i,i+3));
                          }
        }

         this.getMovies = function() {
               return this.movies;
         }
    });

	scotchApp.controller('mainController', function($scope, movieService) {

		movieService.get().then( result => {
		    $scope.movies = result;
		});

		$scope.search = () => {
		    console.info('search text ' + $scope.searchText)
		    return movieService.search($scope.searchText).then( result => {
            });
		}
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});


	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('favoritesController', function($scope) {
    		$scope.message = 'Favorites';
    });

