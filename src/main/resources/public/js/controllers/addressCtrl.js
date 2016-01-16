savet7App.controller('editAddressCtrl', function($scope, $http, $routeParams, $location) {

  $scope.showFormError = false;
  $scope.buildingId = $routeParams.buildingId;

  if ($routeParams.addressId === undefined) {
    $scope.adding = true;
    $scope.address = {};
  } else {
    $scope.adding = false;
  }

  if (!$scope.adding) {
    $http.get('/api/addresses/' + $routeParams.addressId).success(function(data) {
      $scope.address = data;
    });
  }

  $scope.submit = function() {

    $scope.submitted = true;

    if ($scope.addressForm.$valid) {
      $scope.showFormError = false;
      if ($scope.adding) {
        $http.post('/api/addresses/', $scope.address).then(function (response) {
          $http.put('/api/buildings/' + $scope.buildingId + "/address", response.data._links.self.href, {
            headers : {
              'Content-type' : 'text/uri-list'
            }
          }).then(function () {
            // Go to the building now
            $scope.cancel();
          }, function () {
            toastr.warning('building updated failed!?');
          });

        }, function () {
          toastr.warning('Creation failed!?');
        });
      } else {
        $http.patch('/api/addresses/' + $scope.address.id, $scope.address).then(function () {
          $scope.cancel();
        }, function () {
          toastr.warning('Update failed!?');
        });
      }
    } else {
      $scope.showFormError = true;

    }
  };

  $scope.cancel = function() {
    $location.path("/buildings/" + $scope.buildingId);
  };

  $scope.showError = function(fieldName) {
    return ($scope.addressForm[fieldName].$invalid && $scope.addressForm[fieldName].$touched)
        || ($scope.addressForm[fieldName].$invalid && $scope.submitted);
  };

});