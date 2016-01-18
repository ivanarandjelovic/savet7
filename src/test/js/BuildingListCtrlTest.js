describe("BuidlingListCtrl test", function() {

  var en_json = {
    "TEXT" : "english"
  };
  var rs_json = {
    "TEXT" : "serbian"
  };

  var address_json = {
    id : 2,
    street : "test_street",
    number : "test_number",
    _links : {
      self : {
        href : "test_href"
      }
    }
  };

  var user = {
    username : "test"
  };

  var oneBuildingJSON = buildingsJSON._embedded.buildings[0];

  beforeEach(function() {
    module('savet7App');
  });

  beforeEach(function() {
    module('/partials/building-list.html');
  });

  var scope, controller, $controller, $timeout, $httpBackend, $translate, $rootScope, $location, userServiceObj;

  var getServiceHandler, postServiceHandler, putServiceHandler, patchServiceHandler;

  beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_, _$translate_, _$rootScope_, _$location_,
      userService) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    userServiceObj = userService;

    $httpBackend.when('GET', '/translations/en.json').respond(function() {
      return [ 200, en_json, {} ];
    });
    $httpBackend.when('GET', '/translations/rs.json').respond(function() {
      return [ 200, rs_json, {} ];
    });

    getServiceHandler = $httpBackend.when('GET', '/api/buildings?page=0').respond(function() {
      return [ 200, buildingsJSON, {} ];
    });

    $httpBackend.when('GET', '/api/buildings?page=1').respond(function() {
      return [ 200, buildingsJSON, {} ];
    });

    get1ServiceHandler = $httpBackend.when('GET', '/api/buildings/1?projection=inlineAddress').respond(function() {
      return [ 200, oneBuildingJSON, {} ];
    });

    get1ServiceHandler = $httpBackend.when('GET', '/api/buildings/1').respond(function() {
      return [ 200, oneBuildingJSON, {} ];
    });

    postServiceHandler = $httpBackend.when('POST', '/api/addresses/').respond(function() {
      return [ 200, address_json, {} ];
    });
    patchServiceHandler = $httpBackend.when('PATCH', '/api/addresses/2').respond(function() {
      return [ 200, address_json, {} ];
    });
    putServiceHandler = $httpBackend.when('PUT', '/api/buildings/1/address').respond(function() {
      return [ 200, {}, {} ];
    });

    spyOn(toastr, 'warning');

  }));

  describe('List buildings', function() {
    beforeEach(function() {
      scope = $rootScope.$new();

      controller = $controller('buildingListCtrl', {
        $scope : scope
      });
      $httpBackend.flush();
    });

    it('initial state', function() {
      expect(scope.loggedIn).toBeFalsy();
      expect(scope.buildings).toBeUndefined();
    });

    it('logged in load buildings', function() {
      userServiceObj.setUser(user);
      scope.$apply();
      expect(scope.loggedIn).toBeTruthy();
      scope.loadBuildings();
      $httpBackend.flush();
      expect(scope.buildings).toEqual(buildingsJSON._embedded.buildings);
    });

    it('logged in load buildings but error response', function() {
      userServiceObj.setUser(user);
      getServiceHandler.respond(401);
      scope.$apply();
      expect(scope.loggedIn).toBeTruthy();
      scope.loadBuildings();
      $httpBackend.flush();
      expect(scope.buildings).toBeUndefined();
    });

    it('go to adding new building', function() {
      scope.addBuilding();
      expect($location.path()).toStartWith("/addBuilding/");
    });

    it('should change page and load new buildings', function() {
      userServiceObj.setUser(user);
      scope.$apply();
      expect(scope.loggedIn).toBeTruthy();

      scope.currentPage = 2;
      $httpBackend.expectGET('/api/buildings?page=1').respond(function() {
        return [ 200, buildingsJSON, {} ];
      });
      scope.pageChanged();
      $httpBackend.flush();
      expect(scope.buildings).toEqual(buildingsJSON._embedded.buildings);
    });

  });

  describe('Details of a building', function() {
    beforeEach(function() {
      scope = $rootScope.$new();

      controller = $controller('buildingDetailCtrl', {
        $scope : scope,
        $routeParams : {
          buildingId : 1
        }
      });
      $httpBackend.flush();
    });

    it('should test initial state', function() {
      expect(scope.building).toEqual(oneBuildingJSON);
    });

    it('should change page to edit building', function() {
      scope.edit();
      expect($location.path()).toBe("/editBuilding/" + oneBuildingJSON.id);
    });

    it('should go to edit existing address', function() {
      scope.editAddress();
      expect($location.path()).toBe("/editAddress/" + scope.building.address.id + "/" + scope.building.id);
    });

    it('should go to add new address when building has no addressId', function() {
      scope.building.address = null;
      scope.editAddress();
      expect($location.path()).toBe("/editAddress//" + scope.building.id);
    });

  });

  describe('Adding new building', function() {
    beforeEach(function() {
      scope = $rootScope.$new();
      scope.buildingForm = {
        testField : {}
      };
      controller = $controller('editBuildingCtrl', {
        $scope : scope
      });
    });

    it('should test initial state', function() {
      expect(scope.building).toBeEmptyObject();
      expect(scope.adding).toBeTruthy();
    });

    it('should change page to building when canceled', function() {
      scope.cancel();
      expect($location.path()).toStartWith("/buildings");
    });

    it("should show error", function() {
      scope.buildingForm.testField.$invalid = true;
      scope.buildingForm.testField.$touched = true;
      scope.submitted = false;
      expect(scope.showError('testField')).toBeTruthy();

      scope.buildingForm.testField.$invalid = true;
      scope.buildingForm.testField.$touched = false;
      scope.submitted = false;
      expect(scope.showError('testField')).toBeFalsy();

      scope.buildingForm.testField.$invalid = false;
      scope.buildingForm.testField.$touched = false;
      scope.submitted = false;
      expect(scope.showError('testField')).toBeFalsy();

      scope.buildingForm.testField.$invalid = true;
      scope.buildingForm.testField.$touched = false;
      scope.submitted = true;
      expect(scope.showError('testField')).toBeTruthy();

      scope.buildingForm.testField.$invalid = false;
      scope.buildingForm.testField.$touched = true;
      scope.submitted = true;
      expect(scope.showError('testField')).toBeFalsy();

      scope.buildingForm.testField.$invalid = false;
      scope.buildingForm.testField.$touched = false;
      scope.submitted = true;
      expect(scope.showError('testField')).toBeFalsy();
    });

    it('should try to save the building but show error', function() {
      scope.submit();
      expect(scope.submitted).toBeTruthy();
      expect(scope.showFormError).toBeTruthy();
    });

    it('should try to save the building', function() {
      scope.buildingForm.$valid = true;
      scope.building = {
        id : 1
      };
      $httpBackend.expectPOST('/api/buildings/', scope.building).respond(200, {
        id : 2
      });
      scope.submit();
      $httpBackend.flush();
      expect(scope.submitted).toBeTruthy();
      expect(scope.showFormError).toBeFalsy();
      expect($location.path()).toBe("/buildings/2");
    });

    it('should try to save the building but with server error', function() {
      scope.buildingForm.$valid = true;
      scope.building = {
        id : 1
      };
      $httpBackend.expectPOST('/api/buildings/', scope.building).respond(401);
      scope.submit();
      $httpBackend.flush();
      expect(scope.submitted).toBeTruthy();
      expect(scope.showFormError).toBeFalsy();
      expect($location.path()).not.toBe("/buildings/2");
      expect(toastr.warning).toHaveBeenCalledWith('Creation failed!?');
    });

  });

  describe('Editing existing building', function() {
    beforeEach(function() {
      scope = $rootScope.$new();
      scope.buildingForm = {
        testField : {}
      };
      controller = $controller('editBuildingCtrl', {
        $scope : scope,
        $routeParams : {buildingId:1}
      });
      $httpBackend.flush();
    });

    it('should test initial state', function() {
      expect(scope.adding).toBeFalsy();
      expect(scope.building).toEqual(oneBuildingJSON);
    });

    it('should change page to building when canceled', function() {
      scope.cancel();
      expect($location.path()).toBe("/buildings/" + oneBuildingJSON.id);
    });

    it('should try to save the building', function() {
      scope.buildingForm.$valid = true;
      $httpBackend.expectPATCH('/api/buildings/'+ scope.building.id, scope.building).respond(200, oneBuildingJSON);
      scope.submit();
      $httpBackend.flush();
      expect(scope.submitted).toBeTruthy();
      expect(scope.showFormError).toBeFalsy();
      expect($location.path()).toBe("/buildings/1");
    });

    it('should try to save the building but with server error', function() {
      scope.buildingForm.$valid = true;
      $httpBackend.expectPATCH('/api/buildings/'+ scope.building.id, scope.building).respond(401);
      scope.submit();
      $httpBackend.flush();
      expect(scope.submitted).toBeTruthy();
      expect(scope.showFormError).toBeFalsy();
      expect($location.path()).not.toBe("/buildings/1");
      expect(toastr.warning).toHaveBeenCalledWith('Update failed!?');
    });

  });
});
