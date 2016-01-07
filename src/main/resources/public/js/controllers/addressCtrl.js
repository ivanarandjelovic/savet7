savet7App
		.controller(
				'editAddressCtrl',
				function($scope, $http, $routeParams, $location, $log) {

					// $log.debug("editBuildingCtrl start");

					$scope.showFormError = false;
					$scope.buildingId = $routeParams.buildingId;

					if ($routeParams.addressId === undefined) {
						$scope.adding = true;
						$scope.address = {};
					} else {
						$scope.adding = false;
					}

					if (!$scope.adding) {
						$http.get('/api/addresses/' + $routeParams.addressId)
								.success(function(data) {
									$scope.address = data;
								});
					}

					$scope.submit = function() {

						$scope.submitted = true;

						if ($scope.addressForm.$valid) {
							$scope.showFormError = false;
							if ($scope.adding) {
								$http
										.post('/api/addresses/', $scope.address)
										.then(
												function successCallback(
														response) {
													// Address is created,
													// update building also
													$http
															.get(
																	'/api/buildings/'
																			+ $routeParams.buildingId
																			+ '?projection=inlineAddress')
															.success(
																	function(
																			data) {
																		$scope.building = data;
																		$scope.building.address = response.data;
																		$http
																				.patch(
																						'/api/buildings/'
																								+ $scope.building.id,
																						$scope.building)
																				.then(
																						function successCallback(
																								response) {
																							alert("building updated");
																						},
																						function errorCallback(
																								response) {
																							alert('building updated failed!?');
																						});
																	});
													// Go to the building now
													$location
															.path("/buildings/"
																	+ $scope.buildingId);
												},
												function errorCallback(response) {
													alert('Creation failed!?');
												});
							} else {
								$http.patch(
										'/api/addresses/' + $scope.address.id,
										$scope.address).then(
										function successCallback(response) {
											$location.path("/buildings/"
													+ $scope.buildingId);
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
							$location.path("/buildings/" + $scope.buildingId);
						} else {
							$location.path("/buildings/" + $scope.buildingId);
						}
					};

					$scope.showError = function(fieldName) {
						return ($scope.addressForm[fieldName].$invalid && $scope.addressForm[fieldName].$touched)
								|| ($scope.addressForm[fieldName].$invalid && $scope.submitted);
					};

					// $log.debug("editBuildingCtrl end");

				});