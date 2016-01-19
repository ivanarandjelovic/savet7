savet7App.controller('userCtrl', function($scope, $http, $uibModal, $location, $route, userService, $translate) {

  toastr.options.closeButton = true;
  toastr.options.positionClass = "toast-top-center";

  $scope.loggedIn = false;

  $scope.login = function() {

    var modalInstance = $uibModal.open({
      animation : true,
      templateUrl : 'partials/login-form.html',
      controller : 'loginInstanceCtrl'
    });

    modalInstance.result.then(function() {
      // Login was performed
      userService.reloadUser();
      $translate('APP_LOGIN_SUCCESS').then(function(text) {
        toastr.success(text);
      });
      $location.path("/");

    });
  };

  $scope.logout = function() {
    userService.logout();
  };

  // Common part to make all controller user-aware
  $scope.loggedIn = userService.isLoggedIn();
  $scope.user = userService.getUser();
  $scope.$watch(userService.isLoggedIn, function(loggedIn) {
    $scope.loggedIn = loggedIn;
    $scope.user = userService.getUser();
  }, true);
  // END Common part to make all controller user-aware

});

savet7App.controller('loginInstanceCtrl', function($scope, $http, $uibModalInstance, $translate, userService) {
  $scope.login = function() {
    userService.login($scope.username, $scope.password).then(function() {
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
