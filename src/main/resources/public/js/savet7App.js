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
	}).otherwise({
		redirectTo : '/buildings'
	});
} ]);