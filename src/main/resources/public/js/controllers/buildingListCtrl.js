savet7App.controller('buildingListCtrl', function($scope, $http, userService, $log) {

	// spinnerService.show('s7Spinner');

	// $log.debug("buildingListCtrl start");

	$scope.loadBuildings = function() {
		if (userService.isLoggedIn() === true) {
			// waitService.showWait();
			$http.get('/api/buildings').then(function successCallback(response) {
				$scope.buildings = response.data._embedded.buildings;
				// waitService.hideWait();
			}, function errorCallback(response) {
				if (response.status === 401) {
					// we are not logged in
					// TODO ...
				}
				// waitService.hideWait();
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
	/*
	 * $scope.$watch('loggedIn', function(loggedIn) { $scope.loadBuildings() });
	 */

	$scope.addBuilding = function() {
		$location.path("/addBuilding/");
	}

	// $log.debug("buildingListCtrl end");

	// spinnerService.hide('s7Spinner');
});

savet7App.controller('buildingDetailCtrl', function($scope, $http, $routeParams, $location) {

	$http.get('/api/buildings/' + $routeParams.buildingId + '?projection=inlineAddress').success(function(data) {
		$scope.building = data;
	});

	$scope.edit = function() {
		$location.path("/editBuilding/" + $scope.building.id);
	};

	$scope.editAddress = function() {
		if ($scope.building.address !== null) {
			$location.path("/editAddress/" + $scope.building.address.id + "/" + $scope.building.id);
		} else {
			$location.path("/editAddress//" + $scope.building.id);
		}
	}

});

savet7App.controller('editBuildingCtrl', function($scope, $http, $routeParams, $location, $log) {

	// $log.debug("editBuildingCtrl start");

	$scope.showFormError = false;

	if ($routeParams.buildingId === undefined) {
		$scope.adding = true;
		$scope.building = {};
	} else {
		$scope.adding = false;
	}

	if (!$scope.adding) {
		$http.get('/api/buildings/' + $routeParams.buildingId).success(function(data) {
			$scope.building = data;
		});
	}

	$scope.submit = function() {

		$scope.submitted = true;

		if ($scope.buildingForm.$valid) {
			$scope.showFormError = false;
			if ($scope.adding) {
				$http.post('/api/buildings/', $scope.building).then(function successCallback(response) {
					$location.path("/buildings/" + response.data.id);
				}, function errorCallback(response) {
					alert('Creation failed!?');
				});
			} else {
				$http.patch('/api/buildings/' + $scope.building.id, $scope.building).then(function successCallback(response) {
					$location.path("/buildings/" + $scope.building.id);
				}, function errorCallback(response) {
					alert('Update failed!?');
				});
			}
		} else {
			// alert("form invalid!");
			$scope.showFormError = true;

		}
	};

	$scope.cancel = function() {
		if ($scope.adding) {
			$location.path("/buildings");
		} else {
			$location.path("/buildings/" + $scope.building.id);
		}
	};

	$scope.showError = function(fieldName) {
		return ($scope.buildingForm[fieldName].$invalid && $scope.buildingForm[fieldName].$touched)
				|| ($scope.buildingForm[fieldName].$invalid && $scope.submitted);
	};

	// $log.debug("editBuildingCtrl end");

});