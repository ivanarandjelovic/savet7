savet7App.controller('buildingListCtrl', function($scope, $http, userService) {

	$scope.loadBuildings = function() {
		if (userService.isLoggedIn() === true) {
			$http.get('/api/buildings').then(
					function successCallback(response) {
						$scope.buildings = response.data._embedded.buildings;
					}, function errorCallback(response) {
						if (response.status === 401) {
							// we are not logged in
							// TODO ...
						}
					});
		}
	};

	$scope.loadBuildings();

	// Common part to make all controller user-aware
	$scope.loggedIn = userService.isLoggedIn();
	$scope.user = userService.getUser();
	$scope.$watch(userService.isLoggedIn, function(loggedIn) {
		// if( $scope.loggedIn !== loggedIn) {
		$scope.loggedIn = loggedIn;
		$scope.user = userService.getUser();
		// }
	}, true);
	// END Common part to make all controller user-aware

	// re-load buildings when we login
	$scope.$watch('loggedIn', function(loggedIn) {
		$scope.loadBuildings()
	}, true);

});

savet7App.controller('buildingDetailCtrl', function($scope, $http,
		$routeParams, $location) {

	$http.get(
			'/api/buildings/' + $routeParams.buildingId
					+ '?projection=inlineAddress').success(function(data) {
		$scope.building = data;
	});

	$scope.edit = function() {
		$location.path("/editBuilding/" + $scope.building.id);
	};

});

savet7App.controller('editBuildingCtrl', function($scope, $http, $routeParams,
		$location) {

	$http.get('/api/buildings/' + $routeParams.buildingId).success(
			function(data) {
				$scope.building = data;
			});

	$scope.submit = function() {
		if ($scope.buildingForm.$valid) {
			$http.patch('/api/buildings/'+$scope.building.id,$scope.building).then(
					function successCallback(response) {
						$location.path("/buildings/" + $scope.building.id);
					}, function errorCallback(response) {
						alert('Update failed!?');
					});
		} else {
			alert("form invalid!");
		}
	};

	$scope.cancel = function() {
		$location.path("/buildings/" + $scope.building.id);
	};

});