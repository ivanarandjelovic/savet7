savet7App.controller('BuildingListCtrl', function($scope, $http) {

	$http.get('/api/buildings').success(function(data) {
		$scope.buildings = data._embedded.buildings;
	});

});

savet7App.controller('BuildingDetailCtrl', function($scope, $http, $routeParams) {

	$http.get('/api/buildings/'+$routeParams.buildingId).success(function(data) {
		$scope.building = data;
	});

});