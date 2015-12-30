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
	$scope.$watch( userService.isLoggedIn, function ( loggedIn ) {
//		if( $scope.loggedIn !== loggedIn) {
		    $scope.loggedIn = loggedIn;
		    $scope.user = userService.getUser();
//		}
	  }, true);
	// END Common part to make all controller user-aware

	// re-load buildings when we login
	$scope.$watch('loggedIn', function( loggedIn ) {
		$scope.loadBuildings()
	}, true);

});

savet7App.controller('buildingDetailCtrl',
		function($scope, $http, $routeParams) {

			$http.get('/api/buildings/' + $routeParams.buildingId).success(
					function(data) {
						$scope.building = data;
					});

		});