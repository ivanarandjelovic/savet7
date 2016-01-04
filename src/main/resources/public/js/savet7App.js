var savet7App = angular.module('savet7App', [ 'ngRoute', 'ui.bootstrap',
		'angularSpinners', 'pascalprecht.translate', 'ngSanitize' ]);

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
	}).otherwise({
		redirectTo : '/buildings'
	});
} ]);

/*
	 * .run(function($rootScope, $location, spinnerService, $log) {
	 * $rootScope.$on("$routeChangeStart", function(event, next, current) {
	 * spinnerService.show('s7Spinner'); $log.debug("Route change start"); });
	 * $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
	 * spinnerService.hide('s7Spinner'); $log.debug("Route change success"); });
	 * $rootScope.$on("$routeChangeError", function(event, next, current) {
	 * spinnerService.hide('s7Spinner'); $log.debug("Route change error"); }); })
	 */

// Translations:

savet7App.config(['$translateProvider', function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
	    prefix: '/translations/',
	    suffix: '.json'
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('escape');
}]);

