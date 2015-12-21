var savet7App = angular.module('savet7App', ['ngRoute']);

// Routes:

savet7App.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/buildings', {
		templateUrl : 'partials/building-list.html',
		controller : 'BuildingListCtrl'
	}).when('/buildings/:buildingId', {
		templateUrl : 'partials/building-detail.html',
		controller : 'BuildingDetailCtrl'
	}).otherwise({
		redirectTo : '/buildings'
	});
} ]);