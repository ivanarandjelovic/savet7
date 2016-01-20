savet7App.controller('buildingListCtrl', function($scope, $location, userService, buildingsService) {

  $scope.currentPage = 1;
  $scope.totalPages = 0;
  $scope.totalItems = 0;
  $scope.itemsPerPage = 0;

  $scope.loadBuildings = function() {
    if (userService.isLoggedIn() === true) {
      buildingsService.loadBuildings($scope.currentPage - 1).then(function() {
        $scope.buildings = buildingsService.getBuildings();
        $scope.currentPage = buildingsService.getPageInfo().number + 1;
        $scope.totalPages = buildingsService.getPageInfo().totalPages;
        $scope.totalItems = buildingsService.getPageInfo().totalElements;
        $scope.itemsPerPage = buildingsService.getPageInfo().size;
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

savet7App.controller('buildingDetailCtrl', function($scope, $routeParams, $location, buildingsService) {

  buildingsService.loadBuildingWithAddress($routeParams.buildingId).then(function() {
    $scope.building = buildingsService.getBuilding();
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

savet7App.controller('editBuildingCtrl', function($scope, $routeParams, $location, buildingsService,
    formHelperService) {

  $scope.showFormError = false;

  $scope.adding = ($routeParams.buildingId === undefined);
  $scope.building = {};

  if (!$scope.adding) {
    buildingsService.loadBuilding($routeParams.buildingId).then(function() {
      $scope.building = buildingsService.getBuilding();
    });
  }

  $scope.submit = function() {

    $scope.submitted = true;

    if ($scope.buildingForm.$valid) {
      $scope.showFormError = false;
      if ($scope.adding) {
        buildingsService.addBuilding($scope.building);
      } else {
        buildingsService.updateBuilding($scope.building);
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
    return formHelperService.showError(fieldName, "buildingForm", $scope);
  };

});