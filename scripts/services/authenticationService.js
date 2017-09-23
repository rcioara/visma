movieApp.service('authService', function ($http) {

    var self = this;
    this.token = null;
    this.isAuthenticated = false;
    this.sessionId = null;

    this.setToken = function (tkn) {
        this.token = tkn;
    };

    this.getToken = function () {
        return this.token;
    };

    this.setIsAuthenticated = function (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    };

    this.getIsAuthenticated = function () {
        return this.isAuthenticated;
    };

    this.setSessionId = function (id) {
        this.sessionId = id;
    };

    this.retrieveSessionId = function () {
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
        }, function (error) {
            console.error('Could not retrieve the token ', error);
        });
    };
    this.authenticate = function (token) {
        var req = {
            method: 'GET',
            url: 'https://www.themoviedb.org/authenticate/' + token
            // params: {redirect_to: "#!"}
        };
        return $http(req).then(function (response) {
            self.setIsAuthenticated(true);
            return self.isAuthenticated;
        }, function (error) {
            console.error('Could not retrieve the token ', error);
        })
    };

    this.retrieveSessionId = function (token) {
        var req = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/authentication/session/new',
            params: {api_key: "cd011ce4747999c8ae715a61176561e6", request_token: token}
        };

        return $http(req).then(function (response) {
            self.setSessionId(response.data.session_id);
            return response.data.session_id;
        }, function (error) {
            console.error('Could not retrieve the token ', error);
        });
    }

});