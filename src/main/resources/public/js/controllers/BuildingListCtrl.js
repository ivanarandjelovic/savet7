savet7App.controller('BuildingListCtrl', function($scope, $http) {

	$http.get('/api/buildings').then(function successCallback(response) {
		$scope.buildings = response.data._embedded.buildings;
	}, function errorCallback(response) {
		if(response.status === 401) {
			// we are not logged in
			// TODO ...
		}
	});

});

savet7App.controller('BuildingDetailCtrl', function($scope, $http, $routeParams) {

	$http.get('/api/buildings/'+$routeParams.buildingId).success(function(data) {
		$scope.building = data;
	});

});