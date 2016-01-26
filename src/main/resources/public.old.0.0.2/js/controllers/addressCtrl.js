savet7App.controller('editAddressCtrl', function($scope, $http, $routeParams, $location, addressService,
    formHelperService) {

  $scope.showFormError = false;
  $scope.buildingId = $routeParams.buildingId;

  $scope.address = {};
  $scope.adding = ($routeParams.addressId === undefined);

  if (!$scope.adding) {
    addressService.loadAddress($routeParams.addressId).then(function() {
      $scope.address = addressService.getAddress();
    }, null);
  }

  $scope.submit = function() {
    $scope.submitted = true;
    $scope.showFormError = (!$scope.addressForm.$valid);
    if ($scope.addressForm.$valid) {
      if ($scope.adding) {
        addressService.addAddress($scope.address, $scope.buildingId).then(function() {
          $scope.cancel();
        });
      } else {
        addressService.updateAddress($scope.address).then(function() {
          $scope.cancel();
        });
      }
    }
  };

  $scope.cancel = function() {
    // this is probably something for buildingService
    $location.path("/buildings/" + $scope.buildingId);
  };

  $scope.showError = function(fieldName) {
    return formHelperService.showError(fieldName, "addressForm", $scope);
  };

});