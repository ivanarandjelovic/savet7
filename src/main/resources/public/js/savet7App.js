var savet7App = angular.module('savet7App', [ 'ngRoute',
		'ui.bootstrap' ]);

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