savet7App.controller('buildingListCtrl', function($scope, $http, $location, userService) {

  $scope.currentPage = 1;
  $scope.totalPages = 0;
  $scope.totalItems = 0;
  $scope.itemsPerPage = 0;

  $scope.loadBuildings = function() {
    if (userService.isLoggedIn() === true) {
      var paging = "";
      paging = "?page=" + ($scope.currentPage - 1);
      $http.get('/api/buildings' + paging).then(function(response) {
        $scope.buildings = response.data._embedded.buildings;
        $scope.currentPage = response.data.page.number + 1;
        $scope.totalPages = response.data.page.totalPages;
        $scope.totalItems = response.data.page.totalElements;
        $scope.itemsPerPage = response.data.page.size;
      }, function() {
          // we are probably not logged in or server error happend
      });
    }
  };

  $scope.loadBuildings();

  // Common part to make all controller user-aware
  $scope.loggedIn = userService.isLoggedIn();
  $scope.user = userService.getUser();
  $scope.$watch(userService.isLoggedIn, function(loggedIn) {
    $scope.loggedIn = loggedIn;
    $scope.user = userService.getUser();
  }, true);
  // END Common part to make all controller user-aware

  $scope.addBuilding = function() {
    $location.path("/addBuilding/");
  };

  $scope.pageChanged = function() {
    $scope.loadBuildings();
  };
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
  };

});

savet7App.controller('editBuildingCtrl', function($scope, $http, $routeParams, $location) {

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
        $http.post('/api/buildings/', $scope.building).then(function(response) {
          $location.path("/buildings/" + response.data.id);
        }, function() {
          toastr.warning('Creation failed!?');
        });
      } else {
        $http.patch('/api/buildings/' + $scope.building.id, $scope.building).then(function() {
          $location.path("/buildings/" + $scope.building.id);
        }, function() {
          toastr.warning('Update failed!?');
        });
      }
    } else {
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

});