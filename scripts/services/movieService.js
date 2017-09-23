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

    this.getDetails = function (id) {
        var movieDetails = null;
        var movieDetailsApiPath = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US';
        return $http.get(movieDetailsApiPath).then(function (result) {
            self.getMovieTrailer(id).then(function (trailer) {
                if (trailer.results !== undefined && trailer.results.length > 0) {
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
            url: 'https://api.themoviedb.org/3/movie/' + movieId + '/videos',
            params: {api_key: "cd011ce4747999c8ae715a61176561e6", language: "en-US"}
        };
        return $http(req).then(function (result) {
            return result.data;
        });
    };


    this.addToFavorites = function () {
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
    };

    this.setSelectedMovie = function (movie) {
        console.log(movie);
        this.selectedMovie = movie;
    };

    this.getSelectedMovie = function () {
        return this.selectedMovie;
    };

    this.setMovies = function (movies) {
        for (var i = 0; i < movies.length; i += 3) {
            self.movies.push(movies.slice(i, i + 3));
        }
    };

    this.getMovies = function () {
        return this.movies;
    };

});