savet7App.controller('userCtrl', function($scope, $http, $uibModal, $log, $location, userService, $translate) {

	toastr.options.closeButton = true;
	toastr.options.positionClass = "toast-top-center";
	
	$scope.loggedIn = false;
	
	$scope.loadUser = function() {
		$http.get('/userService/get').then(function successCallback(response) {
			var user = response.data;
			if(user.username === null) {
				userService.setLoggedIn(false);
			} else {
				userService.setLoggedIn(true);
				userService.setUser(user);
			}
		}, function errorCallback(response) {
			if (response.status === 401) {
				// we are not logged in
				// TODO ...
				userService.setLoggedIn(false);
				userService.setUser(null);
			}
		});
	}
	
	$scope.login = function() {
		
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'partials/login-form.html',
			controller : 'loginInstanceCtrl'
		// size: size,
		/*
		 * resolve: { items: function () { return $scope.items; } }
		 */
		});

		modalInstance.result.then(function(modalResult) {
			// Login was performed ///
			// TODO: what now? reload user, or simply re-load page?
			$scope.loadUser();
			$translate('APP_LOGIN_SUCCESS').then(function(text) {toastr.success(text);});
		}, function() {
			$log.info('Login dismissed at: ' + new Date());
		});
	};

	$scope.logout = function() {
		$http.get('/logout').then(function successCallback(response) {
			userService.setUser(null);
			userService.setLoggedIn(false);
			$translate('APP_LOGOUT_SUCCESS').then(function(text) {toastr.warning(text);});
			$location.path( "/" );
		});
	}
	
	$scope.loadUser();
	
	// Common part to make all controller user-aware
    $scope.loggedIn = userService.isLoggedIn();
	$scope.user = userService.getUser();
	$scope.$watch( userService.isLoggedIn, function ( loggedIn ) {
	    $scope.loggedIn = loggedIn;
	    $scope.user = userService.getUser();
	  }, true);
	// END Common part to make all controller user-aware
	
});

savet7App.controller('loginInstanceCtrl', function($scope, $http,
		$uibModalInstance, $translate) {
	$scope.login = function() {
// $uibModalInstance.close($scope.selected.item);
		// alert($scope.username);
		// alert($scope.password);
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
			$translate('APP_LOGIN_BAD').then(function(text) {toastr.error(text);});
			//alert("Bad login!");
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
