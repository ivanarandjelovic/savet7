savet7App.controller('userCtrl', function($scope, $http, $uibModal, $location, $route, userService,
    $translate) {

  toastr.options.closeButton = true;
  toastr.options.positionClass = "toast-top-center";

  $scope.loggedIn = false;

  $scope.loadUser = function() {
    $http.get('/userService/get').then(function (response) {
      var user = response.data;
      userService.setUser(user);

      // Maybe it's good to refresh current view
      $route.reload();
    }, function (response) {
      if (response.status === 401) {
        // we are not logged in
        userService.setUser(null);
      }
      // Maybe it's good to refresh current view
      $route.reload();
    });
  };

  $scope.login = function() {

    var modalInstance = $uibModal.open({
      animation : true,
      templateUrl : 'partials/login-form.html',
      controller : 'loginInstanceCtrl'
    });

    modalInstance.result.then(function() {
      // Login was performed
      $scope.loadUser();
      $translate('APP_LOGIN_SUCCESS').then(function(text) {
        toastr.success(text);
      });
      $location.path("/");

    });
  };

  $scope.logout = function() {
    $http.get('/logout').then(function() {
      userService.setUser(null);
      $translate('APP_LOGOUT_SUCCESS').then(function(text) {
        toastr.warning(text);
      });
      $location.path("/");
    });
  };

  $scope.loadUser();

  // Common part to make all controller user-aware
  $scope.loggedIn = userService.isLoggedIn();
  $scope.user = userService.getUser();
  $scope.$watch(userService.isLoggedIn, function(loggedIn) {
    $scope.loggedIn = loggedIn;
    $scope.user = userService.getUser();
  }, true);
  // END Common part to make all controller user-aware

});

savet7App.controller('loginInstanceCtrl', function($scope, $http, $uibModalInstance, $translate) {
  $scope.login = function() {
    var config = {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    };

    var data = $.param({
      username : $scope.username,
      password : $scope.password
    });

    $http.post('/login', data, config).then(function() {
      // Yup, we are logged in
      $uibModalInstance.close(1);
    }, function() {
      // Login error, show message:
      $translate('APP_LOGIN_BAD').then(function(text) {
        toastr.error(text);
      });
    });
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
