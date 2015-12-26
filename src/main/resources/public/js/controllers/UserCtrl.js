savet7App.controller('UserCtrl', function($scope, $http, $uibModal, $log, $location) {

	$scope.loggedIn = false;
	
	$scope.getUser = function() {
		$http.get('/userService/get').then(function successCallback(response) {
			$scope.user = response.data;
			$scope.loggedIn = true;
			toastr.success('Are you logged in');
			
		}, function errorCallback(response) {
			if (response.status === 401) {
				// we are not logged in
				// TODO ...
				$scope.user = null;
				$scope.loggedIn = false;
			}
		});
	}
	
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
			$scope.getUser();
		}, function() {
			$log.info('Login dismissed at: ' + new Date());
		});
	};

	$scope.logout = function() {
		$http.get('/logout').then(function successCallback(response) {
			$scope.user = null;
			$scope.loggedIn = false;
			toastr.warning('Are you logged out');
		});
		$location.path( "/" );
	}
	
	$scope.getUser();
	
});

savet7App.controller('LoginInstanceCtrl', function($scope, $http,
		$uibModalInstance) {
	$scope.login = function() {
//		$uibModalInstance.close($scope.selected.item);
		//alert($scope.username);
		//alert($scope.password);
        var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
        
        var data = $.param({
        	username: $scope.username,
        	password: $scope.password
        });
        
		$http.post('/login',data, config).then(function successCallback(response) {
			// Yup, we are logged in
			$uibModalInstance.close(1);
		}, function errorCallback(response) {
			// Login error, show message:
			alert("Bad login!");
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
