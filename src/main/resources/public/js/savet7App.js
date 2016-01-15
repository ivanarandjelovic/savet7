var savet7App = angular.module('savet7App',
        [ 'ngRoute', 'ui.bootstrap', 'angularSpinners',
                'pascalprecht.translate', 'ngSanitize', 'ngCookies' ]);

// Routes:

savet7App.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/buildings', {
        templateUrl : 'partials/building-list.html',
        controller : 'buildingListCtrl'
    }).when('/buildings/:buildingId', {
        templateUrl : 'partials/building-detail.html',
        controller : 'buildingDetailCtrl'
    }).when('/editBuilding/:buildingId', {
        templateUrl : 'partials/edit-building.html',
        controller : 'editBuildingCtrl'
    }).when('/addBuilding', {
        templateUrl : 'partials/edit-building.html',
        controller : 'editBuildingCtrl'
    }).when('/editAddress/:addressId?/:buildingId', {
        templateUrl : 'partials/edit-address.html',
        controller : 'editAddressCtrl'
    }).otherwise({
        redirectTo : '/buildings'
    });
} ]).run(function($rootScope, $location, waitService) {
    $rootScope.$on("$routeChangeStart", function() {
        waitService.showWait();
    });
    $rootScope.$on("$routeChangeSuccess", function() {
        waitService.hideWait();
    });
    $rootScope.$on("$routeChangeError", function() {
        waitService.hideWait();
    });
});
;

// Translations:
savet7App.config([ '$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix : '/translations/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useLocalStorage();
    $translateProvider.fallbackLanguage('en');
} ]);
