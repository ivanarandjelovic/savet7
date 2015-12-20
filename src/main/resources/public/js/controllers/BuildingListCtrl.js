var savet7App = angular.module('savet7App', []);

savet7App.controller('BuildingListCtrl', function($scope, $http) {

	$http.get('/api/buildings').success(function(data) {
		$scope.buildings = data._embedded.buildings;
	});

});