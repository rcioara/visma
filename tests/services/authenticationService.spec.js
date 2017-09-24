describe("Authentication Service", function () {

    beforeEach(module("movieApp"));

    var service, $httpBackend;

    beforeEach(inject(function ($injector) {
        service = $injector.get('movieService');
        $httpBackend = $injector.get('$httpBackend');
    }));


    it('should return the token', function () {
        $httpBackend.flush();
    });

    it('should throw error when retrieving the token', function () {
        $httpBackend.flush();
    });

    it('should authenticate the user', function () {
        $httpBackend.flush();
    });

    it('should not authenticate the user', function () {
        $httpBackend.flush();
    });

    it('should return the session id', function () {

        $httpBackend.flush();
    });

    it('should throw error when retrieving the session id', function () {

        $httpBackend.flush();
    });


});