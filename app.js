var movieApp = angular.module('movieApp', ['ngRoute']);

movieApp.config(function ($routeProvider, $httpProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: 'scripts/views/home.html',
            controller: 'mainController'
        })

        // route for the details page
        .when('/movie/:id', {
            templateUrl: 'scripts/views/details.html',
            controller: 'detailsController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'scripts/views/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'scripts/views/contact.html',
            controller: 'contactController'
        })

        .when('/search', {
            templateUrl: 'scripts/views/home.html',
            controller: 'searchController'
        });

    $httpProvider.defaults.useXDomain = true;
});

