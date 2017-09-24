describe("movieService", function () {

    beforeEach(module("movieApp"));

    describe("movie service", function () {

        var service, $httpBackend;

        beforeEach(inject(function($injector) {
            service = $injector.get('movieService');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', "https://api.themoviedb.org/3/movie/popular?api_key=cd011ce4747999c8ae715a61176561e6&language=en-US").respond(["Minions", "Honda", "Tesla"]);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('getPopularMovies - should return popular movies', function () {
            service.getPopularMovies().then(function(response) {
                expect(response.data.length).toEqual(3); //the response is null
            });
            $httpBackend.flush();
        });


    });

});