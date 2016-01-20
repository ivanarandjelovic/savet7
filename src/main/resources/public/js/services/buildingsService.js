// Performs operations on address data
savet7App.service('buildingsService', function($http, $location) {

  var _building = null;
  var _buildings = [];
  var _pageInfo = {};

  this.getBuilding = function() {
    return _building;
  };

  this.getBuildings = function() {
    return _buildings;
  };

  this.getPageInfo = function() {
    return _pageInfo;
  };

  this.loadBuilding = function(buildingId) {
    return $http.get('/api/buildings/' + buildingId).success(function(data) {
      _building = data;
    });
  };

  this.loadBuildingWithAddress = function(buildingId) {
    return $http.get('/api/buildings/' + buildingId + '?projection=inlineAddress').success(function(data) {
      _building = data;
    });
  };

  this.addBuilding = function(building) {
    return $http.post('/api/buildings/', building).then(function(response) {
      _building = response.data;
      $location.path("/buildings/" + _building.id);
    }, function() {
      toastr.warning('Creation failed!?');
    });
  };

  this.updateBuilding = function(building) {
    return $http.patch('/api/buildings/' + building.id, building).then(function(data) {
      $location.path("/buildings/" + building.id);
      _building = data;
    }, function() {
      toastr.warning('Update failed!?');
    });
  };

  this.loadBuildings = function(page) {
    var paging = "";
    paging = "?page=" + page;
    return $http.get('/api/buildings' + paging).then(function(response) {
      _buildings = response.data._embedded.buildings;
      _pageInfo = response.data.page;
    }, function() {
      // we are probably not logged in or server error happend
    });
  };

});