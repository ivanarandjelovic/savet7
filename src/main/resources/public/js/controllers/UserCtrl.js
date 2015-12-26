savet7App.controller('UserCtrl', function($scope, $http, $uibModal, $log) {

	$http.get('/userService/get').then(function successCallback(response) {
		$scope.user = response.data;
		$scope.loggedIn = true;
	}, function errorCallback(response) {
		if (response.status === 401) {
			// we are not logged in
			// TODO ...
			$scope.user = null;
			$scope.loggedIn = false;
		}
	});

	$scope.login = function() {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'partials/login-form.html',
			controller : 'LoginInstanceCtrl'
		// size: size,
		/*
		 * resolve: { items: function () { return $scope.items; } }
		 */
		});

		modalInstance.result.then(function(modalResult) {
			// Login was performed ///
			// TODO: what now? reload user, or simply re-load page?
		}, function() {
			$log.info('Login dismissed at: ' + new Date());
		});
	};

});

savet7App.controller('LoginInstanceCtrl', function($scope, $http,
		$uibModalInstance) {
	$scope.login = function() {
//		$uibModalInstance.close($scope.selected.item);
		$uibModalInstance.close(1);
		// TODO: do login here
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
