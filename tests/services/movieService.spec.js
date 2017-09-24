describe("Movie Service", function () {

    beforeEach(module("movieApp"));

    var service, $httpBackend;

    beforeEach(inject(function ($injector) {
        service = $injector.get('movieService');
        $httpBackend = $injector.get('$httpBackend');
    }));


    it('should return a list of movies', function () {
        $httpBackend.when('GET', "https://api.themoviedb.org/3/movie/popular?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US").respond(["Minions", "Titanic"]);
        service.getPopularMovies().then(function (response) {
            expect(response.data.length).toEqual(2);
        });
        $httpBackend.flush();
    });

    it('should return empty list of movies', function () {
        $httpBackend.when('GET', "https://api.themoviedb.org/3/movie/popular?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US").respond([]);
        service.getPopularMovies().then(function (response) {
            expect(response.data.length).toEqual(0);
        });
        $httpBackend.flush();
    });

    it('should return the searched movie', function () {

        $httpBackend.flush();
    });


    it('should not found the movie', function () {

        $httpBackend.flush();
    });

    it('should return movie details', function () {

        $httpBackend.flush();
    });

    it('should return no movie details', function () {

        $httpBackend.flush();
    });

});