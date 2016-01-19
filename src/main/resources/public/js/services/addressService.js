// Performs operations on address data
savet7App.service('addressService', function($http, $q) {

  var _address = null;

  this.getAddress = function() {
    return _address;
  };

  this.loadAddress = function(addressId) {
    return $http.get('/api/addresses/' + addressId).success(function(data) {
      _address = data;
    });
  };

  this.addAddress = function(newAddr, buildingId) {

    var deferred = $q.defer();

    $http.post('/api/addresses/', newAddr).success(function(data) {
      _address = data;
      $http.put('/api/buildings/' + buildingId + "/address", _address._links.self.href, {
        headers : {
          'Content-type' : 'text/uri-list'
        }
      }).success(function() {
        // All well, no action here?
        deferred.resolve();
      }).error(function() {
        toastr.warning('Building updated failed!?');
        deferred.reject();
      });
    }).error(function() {
      toastr.warning('Address creation failed!?');
      deferred.reject();
    });

    return deferred.promise;
  },

  this.updateAddress = function(updAddress) {
    return $http.patch('/api/addresses/' + updAddress.id, updAddress).success(function(data) {
      _address = data;
    }).error(function() {
      toastr.warning('Update failed!?');
    });
  };

});